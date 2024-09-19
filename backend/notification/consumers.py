import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *
from .serializers import NotificationSerializer, UserSerializer


class UserNotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.id = self.scope['url_route']['kwargs']['id']
        self.group_name = f'notification_{self.id}'
        
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
        data = json.loads(text_data)
        self.is_signal = data["is_signal"]
        try:
            receiver = self.get_user(data['receiver'])
            sender   = self.get_user(self.id)
            if not self.is_signal and data['type'] != 'friend':
                new_notification = Notification.objects.create(sender=sender, receiver=receiver, content=data['message'], type=data['type'], data=data['data'])
                if new_notification:
                    self.broadcast_notification(NotificationSerializer(new_notification).data)
                else:
                    self.send_error('Notification data not valid!')
            else :
                notification = {
                    'sender': sender.id,
                    'receiver': UserSerializer(receiver).data,
                    'content': data['message'],
                    'type': data['type'],
                    'data': data['data']
                }
                self.broadcast_notification(notification)
        except User.DoesNotExist:
            self.send_error('Receiver user not exists!')

    def broadcast_notification(self, message_data):
        message_data['sender'] = self.get_user(self.id).username
        message_data['is_signal'] = self.is_signal
        async_to_sync(self.channel_layer.group_send)(
            f'notification_{message_data["receiver"]["id"]}',
            {
                'type': 'send_message',
                'data': message_data
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
        message = event['data']
        self.send(text_data=json.dumps(message))
