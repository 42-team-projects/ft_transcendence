from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync



class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = self.scope['url_route']['kwargs']['room_name']
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
            )
        self.accept()

        
    def disconnect(self, event):
        # async_to_sync(self.channel_layer.group_discard)(
        #     self.room_group_name,
        #     self.channel_name
        # )
        pass
        
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        # print(text_data_json)
        message = text_data_json['message']
        
        # print('message: ', message)
        # self.send(text_data=json.dumps({
        #     'type' : 'chat',
        #     'message' : message
        # }))
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type' : 'chat_message',
                'message' : message
            })
        
    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps({'type' : 'chat', 'message' : message}))
