
import json
from channels.generic.websocket import WebsocketConsumer
from . clients import client 
class GameConsumer(WebsocketConsumer) :
    queue = []
    def connect(self):
        self.accept()
    def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        user_id = data.get('userId', None)
        if user_id:
            clientO = client(ws=self, id=user_id)
            print(user_id)
            self.queue.append(clientO)
            if(len(self.queue) >= 2):
                player1 = self.queue.pop()
                player2 = self.queue.pop() 
                print(f"Player 1: {player1.id}, Player 2: {player2.id}")
                player1.ws.send(json.dumps({'id' : player2.id}))
                player2.ws.send(json.dumps({'id' : player1.id}))
        else:
            print("No userId provided")
            self.send(json.dumps({'message': 'No userId provided'}))
    def disconnect(self, close_code):
        print("Client disconnected")
