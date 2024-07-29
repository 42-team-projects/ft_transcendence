
import json
from channels.generic.websocket import WebsocketConsumer
from . clients import Client , GameRoom
queue = []
rooms = []
class GameConsumer(WebsocketConsumer) :
    def connect(self):
        self.accept()
    def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        status = data.get('status', None)
        print("status : ", status)
        if status == 'searching':
            user_id = data.get('userId', None)
            client = Client(ws=self, id=user_id)
            queue.append(client)
            if(len(queue) >= 2):
                player1 = queue.pop()
                player2 = queue.pop() 
                room = GameRoom(player1, player2)
                room.find_opponent()
                rooms.append(room)
        elif status == 'startGame':
            room_name = data.get('room_name', None)
            room = [room for room in rooms if room.room_name == room_name]
            room[0].sendData(data, self)
    def disconnect(self, close_code):
        global queue
        queue = [client for client in queue if client.ws != self]
        print("Client disconnected", queue)