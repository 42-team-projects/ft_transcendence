import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *
from .serializers import *

from django.core.exceptions import ObjectDoesNotExist



class ChatConversationConsumer(WebsocketConsumer):
    def connect(self):
        self.current_user = self.scope['user']
        if self.current_user.is_authenticated:
            self.room_name = self.scope['url_route']['kwargs']['room_name']
            self.group_name = f"chat_{self.room_name}"
            
            # Join room group
            async_to_sync(self.channel_layer.group_add)(
                self.group_name,
                self.channel_name
            )
            self.accept()
        else:
            self.close()
    def disconnect(self, close_code):
        if self.current_user.is_authenticated:
            # Leave room group
            async_to_sync(self.channel_layer.group_discard)(
                self.group_name,
                self.channel_name
            )
    def receive(self, text_data):
        if self.current_user.is_authenticated:
            try:
                data = json.loads(text_data)
                self.receiver = self.get_user(data['receiver'])
                if (self.current_user.id == self.receiver.id):
                    self.send_error('sender and receiver is same user!')
                else:
                    self.save_and_broadcast_message(data['message'])
            except ObjectDoesNotExist:
                self.send_error('User does not exist.')
            except json.JSONDecodeError:
                self.send_error('Invalid JSON format.')
            except KeyError as e:
                self.send_error(f'Missing key: {e}')
        else:
            self.send_error('User not authenticated!')

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
            conversation.add_participant(self.current_user)
            conversation.add_participant(self.receiver)
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
        return User.objects.get(id=user_id)
    def send_error(self, error_message):
        self.send(text_data=json.dumps({'error': error_message}))  
    def send_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))

