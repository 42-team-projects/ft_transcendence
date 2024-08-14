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
        message = f"Time left: {seconds - i}"
        client.send_message(message)
#always the second client will be the controler
#always the first client will be the opponent
from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.id = self.scope['url_route']['kwargs']['id']
        self.room_group_name = 'hiii'

        add_to_queue(self)
        await self.accept()
        try:
            await asyncio.wait_for(self.wait_for_opponent(), timeout=30.0)
        except asyncio.TimeoutError:
            print('Timeout')
            await self.close()
        await asyncio.sleep(6)
        timer(self, 3)

    async def send_message(self, message):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_message',
                'message': message
            }
        )

    async def wait_for_opponent(self):
        
        while len(queue) < 2 and self in queue:
            await asyncio.sleep(0.1)
        if len(queue) >= 2:
            opponent = queue.pop(0)
            controler = queue.pop(0)
            await add_to_room(opponent, controler)
            message = {
                'user_id_1': opponent.id,
                'user_id_2': controler.id,
            }
            await self.send_message(message=message)

    async def timer_message(self, event):
        self.send_message(event)
        await asyncio.sleep(1)
    
    async def game_message(self, event):
        message = event['message']
        print(f"Handling game message: {message}")
        await self.send(text_data=json.dumps({
            'message': message
        }))

