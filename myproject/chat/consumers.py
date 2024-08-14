import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *
from .serializers import *


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        sender = self.get_user(text_data_json['sender'])
        receiver = self.get_user(text_data_json['receiver'])

        if sender and receiver:
            message = self.save_message(sender, receiver, text_data_json['message'])
        else:
            self.send(text_data=json.dumps({'Error': 'One or both users do not exist in the database.'}))

        

    def get_user(self, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None
    
    def save_message(self, sender, receiver, content):
        conversation = Conversation.objects.filter(conversation_name=self.room_group_name).first()
        if not conversation:
            conversation = self.create_conversation(sender, receiver)                
        message = {
            'sender': sender.id,
            'content': content,
            'conversation': conversation.id
        }
        message_serializer = MessageSerializer(data=message)
        if message_serializer.is_valid():
            message_serializer.save()  # Save the new message to the database
            print("Message saved successfully.")

            # Broadcast message to room group
            self.broadcast_message(message_serializer)
        else:
            self.send(text_data=json.dumps({'Error': message_serializer.errors}))
    
    def create_conversation(self, sender, receiver):
        # Prepare the data for the new conversation
        conversation_data = {
            'conversation_name': self.room_group_name,
        }
        # Use the ConversationSerializer to create a new conversation
        conversation_serializer = ConversationSerializer(data=conversation_data)
        if conversation_serializer.is_valid():
            conversation = conversation_serializer.save()  # Save the conversation
            # Add users to the conversation
            conversation.users.add(sender, receiver)
            conversation.save()
            print("Conversation created and users added successfully.")
            return conversation
        else:
            self.send(text_data=json.dumps({'Error': conversation_serializer.errors}))                
            return None

    def broadcast_message(self, message_serializer):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message_serializer.data
            }
        )

    
    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))
        