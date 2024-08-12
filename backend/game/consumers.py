import time
import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from . clients import GameLoop
queue = []




class GameConsumer(AsyncWebsocketConsumer) :
    async def connect(self):
        self.id = self.scope['url_route']['kwargs']['id']
        await self.add_to_queue()
        if len(queue) >= 2:
            self.game_loop = GameLoop(self)
            client1 = queue.pop(0)
            queue.pop(0)
            await self.add_to_room(client1)
        await self.accept()
    async def receive(self, text_data=None, bytes_data=None):
        pass
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )
    
    async def join_room(self, client, room_name):
        await self.channel_layer.group_add(
            room_name,
            client.channel_name
        )
        
    async def add_to_room(self, client1):
        room_group_name = f'game_{client1.id}-{self.id}'
        await self.join_room(client1, room_group_name)
        await self.join_room(self, room_group_name)

    async def game_message(self, event):
        message = event['message']
        self.send(json.dumps(message))
    async def add_to_queue(self):
        queue.append(self)
