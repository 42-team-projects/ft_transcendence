import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *
from .serializers import NotificationSerializer


class UserNotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.group_name = f"notification_{self.room_name}"

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
        print(data)
        self.broadcast_notification(data)



    def broadcast_notification(self, data):
        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
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
        