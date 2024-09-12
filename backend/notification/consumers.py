import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *
from .serializers import NotificationSerializer

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
        self.type = data["type"]
        self.infos = data["infos"]
        try:
            receiver = self.get_user(data['receiver'])
            sender   = self.get_user(self.id)

            # notification_data = {
            #     'sender' : self.id,
            #     'receiver' : receiver.id,
            #     'content' : data['message']
            # }
            # notification_serializer = NotificationSerializer(data=notification_data, context=self.scope)
            # if notification_serializer.is_valid():
            #     notification_serializer.save()
                # self.broadcast_notification(notification_serializer.data)
            # else:    
            #     self.send_error('Notification data not valid!')
            new_notification = Notification.objects.create(sender=sender, receiver=receiver, content=data['message'])
            if new_notification:
                self.broadcast_notification(NotificationSerializer(new_notification).data)
            else:
                self.send_error('Notification data not valid!')

        except User.DoesNotExist:
            self.send_error('Receiver user not exists!')

    def broadcast_notification(self, message_data):
        message_data['sender'] = self.get_user(self.id).username
        message_data['type'] = self.type
        message_data['infos'] = self.infos
        async_to_sync(self.channel_layer.group_send)(
            f'notification_{message_data["receiver"]["id"]}',
            {
                'type': 'send_message',
                'data': message_data
            }
        )       
    def get_user(self, user_id):
        try:
            # return await User.objects.async_get(id=user_id)
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None          
    def send_error(self, error_message):
        self.send(text_data=json.dumps({'error': error_message}))  
    def send_message(self, event):
        message = event['data']
        self.send(text_data=json.dumps(message))

class GroupNotificationConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.group_name = f'notification_{self.room_name}'
        
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
        message = data['message']
        self.broadcast_notification({
            'message' : message,
        })

    def broadcast_notification(self, data):
        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            {
                'type': 'send_message',
                'data': data
            }
        )
    def send_message(self, event):
        message = event['data']
        self.send(text_data=json.dumps(message))
