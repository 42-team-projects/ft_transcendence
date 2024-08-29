import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *
from .serializers import NotificationSerializer


class UserNotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.current_user = self.scope['user']
        if self.current_user.is_authenticated:
            # self.room_name = self.scope['url_route']['kwargs']['room_name']
            self.group_name = f'notification_{self.current_user.id}'

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
        data = json.loads(text_data)
        print(data)
        # self.receiver_id = data['receiver']
        # user = User.objects.filter(id=receiver_id).first()
        # Notification.objects.create(user=user, content=data['message'], is_read=0)
        self.broadcast_notification(data)

    def broadcast_notification(self, data):
        async_to_sync(self.channel_layer.group_send)(
            f'notification_{data["receiver"]}',
            {
                'type': 'send_message',
                'data': data
            }
        )
    def send_error(self, error_message):
        self.send(text_data=json.dumps({'Error': error_message}))
    def send_message(self, event):
        message = event['data']
        self.send(text_data=json.dumps(message))