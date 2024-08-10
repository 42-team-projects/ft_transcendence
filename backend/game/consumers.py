import time
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
        start = time.time()
        data = json.loads(text_data)
        status = data.get('status', None)
        if status == 'searching':
            user_id = data.get('userId', None)
            await self.add_to_queue(user_id)
            if(len(queue) >= 2):
                await self.add_to_room()
        elif status == 'startGame':
            room_name = data.get('room_name', None)
            room = self.get_room_by_name(room_name)
            room.set_canvas_width(data.get('canvas_width', None))
            room.set_canvas_height(data.get('canvas_height', None))
            room.set_racquet_size(data.get('racquet_size', None),)
            if(room._active == False):
                asyncio.create_task(room.game_loops())
                room._active = True
        elif status == 'move':
            room_name = data.get('room_name', None)
            room = self.get_room_by_name(room_name)
            y = data.get('position', None)
            if room:
                await room.set_player_y(self, y)
                message = {
                    'status': 'move',
                    'opponent_y': y
                }
                await room.sendData(message, self)

    async def disconnect(self, close_code):
        global queue
        global rooms
        queue = [client for client in queue if client.ws != self]
        current_room = self.get_room_by_client(self)
        if current_room:
            await current_room.handle_disconnect()
        rooms = [room for room in rooms if room != current_room]

    async def add_to_queue(self, user_id):
        client = Client(ws=self, id=user_id)
        queue.append(client)

    async def add_to_room(self):
        client2 = queue.pop()
        client1 = queue.pop()
        room = GameRoom(client1, client2)
        rooms.append(room)
        await room.get_opponent()

    def get_room_by_name(self, room_name):
        for room in rooms:
            if room.get_room_name() == room_name:
                return room
        return None
    def get_room_by_client(self, ws):
        for room in rooms:
            if room.get_client1_ws() == ws or room.get_client2_ws() == ws:
                return room
        return None
