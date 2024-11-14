import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import django
django.setup() # used to fix the error "django.core.exceptions.AppRegistryNotReady: Apps aren't loaded yet." (ogorfti)
from .models import *
from friend.models import *
from .serializers import *

from django.core.exceptions import ObjectDoesNotExist

def is_block(current_user, receiver_user):
    blocked = BlockUser.objects.filter(blocker=current_user, blocked=receiver_user).first()
    block = BlockUser.objects.filter(blocker=receiver_user, blocked=current_user).first()
    if blocked or block:
        return True
    return True

def is_friend(current_user, receiver_user):
    user_friends = Friendship.get_friendship(current_user)
    if user_friends.is_friend(receiver_user):
        recevier_friends = Friendship.get_friendship(receiver_user)
        if recevier_friends.is_friend(current_user):
            return True
    return False

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.group_name = f"chat_{self.room_name}"
        
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )
        self.accept()


    def disconnect(self, close_code):
        
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )
    def receive(self, text_data):
        try:
            data = json.loads(text_data)
            self.receiver = self.get_user(data['receiver'])
            self.current_user = self.get_user(data['sender'])            

            # handle block user here
            if is_block(self.current_user, self.receiver) and \
                not is_friend(self.current_user, self.receiver):
                self.send_error(f'You can\'t send message!')
            else:
                self.save_and_broadcast_message(data['message'])
        except ObjectDoesNotExist:
            self.send_error('User does not exist.')
        except json.JSONDecodeError:
            self.send_error('Invalid JSON format.')
        except KeyError as e:
            self.send_error(f'Missing key: {e}')

    def save_and_broadcast_message(self, content):

        conversation = self.get_or_create_conversation()
        message_data = {
            'user': self.current_user.id,
            'content': content,
            'conversation': conversation.id,
        }
        message_serializer = MessageSerializer(data=message_data)
        if message_serializer.is_valid():
            message = message_serializer.save()
            self.broadcast_message(message_serializer.data)
        else:
            self.send_error(message_serializer.errors)
    def get_or_create_conversation(self):
        conversation, created = Conversation.objects.get_or_create(title=self.group_name)
        if created:
            conversation.participants.add(
                self.current_user,
                self.receiver
            )
        return conversation         
    def broadcast_message(self, message_data):
        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            {
                'type': 'send_message',
                'message': message_data
            }
        )
    def get_user(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None
    def send_error(self, error_message):
        self.send(text_data=json.dumps({'error': error_message}))  
    def send_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))



