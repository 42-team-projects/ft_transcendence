import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *
from .serializers import NotificationSerializer

class UserNotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.current_user = self.scope['user']
        if self.current_user.is_authenticated:
            self.group_name = f'notification_{self.current_user.id}'

            async_to_sync(self.channel_layer.group_add)(
                self.group_name,
                self.channel_name
            )
            self.accept()
        else:
            self.close()  
    def disconnect(self, close_code):
        if self.current_user.is_authenticated:
            async_to_sync(self.channel_layer.group_discard)(
                self.group_name,
                self.channel_name
            )
    def receive(self, text_data):
        data = json.loads(text_data)
        try:
            receiver = self.get_user(data['receiver'])
            notification_data = {
                'user' : receiver.id,
                'content' : data['message']
            }
            notification_serializer = NotificationSerializer(data=notification_data)
            if notification_serializer.is_valid():
                notification_serializer.save()
                self.broadcast_notification(notification_serializer.data)
            else:    
                self.send_error('Notification data not valid!')
        except User.DoesNotExist:
            self.send_error('Receiver user not exists!')

    def broadcast_notification(self, data):
        async_to_sync(self.channel_layer.group_send)(
            f'notification_{data["user"]}',
            {
                'type': 'send_message',
                'data': data
            }
        )       
    def get_user(self, user_id):
        return (User.objects.get(id=user_id))           
    def send_error(self, error_message):
        self.send(text_data=json.dumps({'error': error_message}))  
    def send_message(self, event):
        message = event['data']
        self.send(text_data=json.dumps(message))
