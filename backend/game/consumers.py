
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
        # print("status : ", status)
        if status == 'searching':
            user_id = data.get('userId', None)
            self.add_to_queue(user_id)
            if(len(queue) >= 2):
                self.add_to_room()
        elif status == 'startGame':
            # print("start game")
            room_name = data.get('room_name', None)
            room = self.find_room(room_name)
            # room.set_player_y(self, data.get('y', None))
            if(room._active == False):
                room.game_loop()
                room._active = True
            # print("game loop")
        elif status == 'move':
            # print("move")
            room_name = data.get('room_name', None)
            room = self.find_room(room_name)
            if room:
                room.set_player_y(self, data.get('y', None))
                room.sendData(data, self)

    def disconnect(self, close_code):
        global queue
        global rooms
        queue = [client for client in queue if client.ws != self]
        rooms = [room for room in rooms if room.get_client1_ws() != self and room.get_client2_ws() != self]
        # print("Client disconnected", queue)
        # print("Client disconnected", rooms)

    def add_to_queue(self, user_id):
        client = Client(ws=self, id=user_id)
        queue.append(client)

    def add_to_room(self):
        client1 = queue.pop()
        client2 = queue.pop() 
        room = GameRoom(client1, client2)
        rooms.append(room)
        room.find_opponent()

    def find_room(self, room_name):
        for room in rooms:
            # print(room.get_room_name(), room_name)
            if room.get_room_name() == room_name:
                return room
        return None
