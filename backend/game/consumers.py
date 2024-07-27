
import json
from channels.generic.websocket import WebsocketConsumer

class GameConsumer(WebsocketConsumer) :
    def connect(self):
        self.accept()
        self.send(json.dumps({'message': 'hello world'}))
