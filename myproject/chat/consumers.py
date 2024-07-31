from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync

# map user => channels' names 
connectedUsers = {}


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = '555'

        print(self.scope)

        async_to_sync(self.channel_layer.group_add)(self.room_group_name, self.channel_name)
        # self.close()
        self.accept()
        #
        
    def disconnect(self, event):
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
        async_to_sync(self.channel_layer.group_send)(self.room_group_name,{'type' : 'chat_message','message' : message})
        
    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps({'type' : 'chat', 'message' : message}))
