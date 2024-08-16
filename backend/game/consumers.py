import time
import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from . clients import GameLoop
from asgiref.sync import sync_to_async
queue = []

async def join_room(client):
    await client.channel_layer.group_add(
        client.room_group_name,
        client.channel_name
    )

async def add_to_room(opponent, controler):
	await join_room(opponent)
	await join_room(controler)

def add_to_queue(client):
	queue.append(client)

async def remove_from_queue(client):
	if client in queue:
		queue.remove(client)


async def timer(client, seconds):
    for i in range(seconds):
        message = { 'time': seconds - (i + 1) }
        await client.send_message(message, 'timer_message')
#always the second client will be the controler
#always the first client will be the opponent

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        GameConsumer.rooms = {}
        self.id = self.scope['url_route']['kwargs']['id']

        add_to_queue(self)
        await self.accept()
        try:
            await asyncio.wait_for(self.wait_for_opponent(), timeout=30.0)
        except asyncio.TimeoutError:
            await self.close()

    async def receive(self, text_data):
        # print(f"Received data: {text_data}")
        text_data_json = json.loads(text_data)
        if text_data_json['message'] == 'start':
            GameConsumer.rooms[self.room_group_name].ready += 1
            if GameConsumer.rooms[self.room_group_name].ready == 2:
                await timer(self, 4)
                GameConsumer.rooms[self.room_group_name].ready = 0
        if text_data_json['message'] == 'firstdata':
            # print(f"Assigning data: {text_data_json}")
            await GameConsumer.rooms[self.room_group_name].assign_data(text_data_json)
        if text_data_json['message'] == 'move':
            # print(f"Moving: {text_data_json}")
            GameConsumer.rooms[self.room_group_name].assing_racquet(text_data_json, self)
    
    async def disconnect(self, close_code):
        await remove_from_queue(self)
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def send_message(self, message, function='game_message'):
        # print(f"Sending message: {message}, function: {function}")
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': function,
                'message': message
            }
        )

    async def wait_for_opponent(self):
        
        while len(queue) < 2 and self in queue:
            await asyncio.sleep(0.1)

        if len(queue) >= 2:
            opponent = queue.pop(0)
            controler = queue.pop(0)
            controler.room_group_name = f"game_{controler.id}-{opponent.id}"
            opponent.room_group_name = f"game_{controler.id}-{opponent.id}"
            await add_to_room(opponent, controler)
            message = {
                'text': 'Opponent found',
                'user_id_1': opponent.id,
                'user_id_2': controler.id,
            }
            await self.send_message(message=message)
            GameConsumer.rooms[self.room_group_name] = GameLoop(controler, opponent)
            GameConsumer.rooms[self.room_group_name].ready = 0

    async def timer_message(self, event):
        await self.game_message(event)
        await asyncio.sleep(1)
    
    async def game_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

