import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from . clients import Client , GameRoom
queue = []
rooms = []
class GameConsumer(AsyncWebsocketConsumer) :
    async def connect(self):
        await self.accept()
    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        status = data.get('status', None)
        if status == 'searching':
            user_id = data.get('userId', None)
            await self.add_to_queue(user_id)
            # print("Client connected", data)
            if(len(queue) >= 2):
                # print("Client connected", queue)
                await self.add_to_room()
        elif status == 'startGame':
            room_name = data.get('room_name', None)
            room = self.find_room(room_name)
            room.set_canvas_width(data.get('canvas_width', None))
            room.set_canvas_height(data.get('canvas_height', None))
            if(room._active == False):
                asyncio.create_task(room.game_loops())
                room._active = True
            # print("game loop")
        elif status == 'move':
            # print("move")
            room_name = data.get('room_name', None)
            room = self.find_room(room_name)
            if room:
                room.set_player_y(self, data.get('y', None))
                await room.sendData(data, self)

    async def disconnect(self, close_code):
        global queue
        global rooms
        queue = [client for client in queue if client.ws != self]
        rooms = [room for room in rooms if room.get_client1_ws() != self and room.get_client2_ws() != self]
        # print("Client disconnected", queue)
        # print("Client disconnected", rooms)

    async def add_to_queue(self, user_id):
        # print("add to queue", user_id)
        client = Client(ws=self, id=user_id)
        # print(client)
        queue.append(client)

    async def add_to_room(self):
        client1 = queue.pop()
        client2 = queue.pop() 
        room = GameRoom(client1, client2)
        rooms.append(room)
        await room.find_opponent()

    def find_room(self, room_name):
        for room in rooms:
            # print(room.get_room_name(), room_name)
            if room.get_room_name() == room_name:
                return room
        return None
