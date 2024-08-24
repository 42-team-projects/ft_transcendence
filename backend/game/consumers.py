import time
import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from . clients import GameLoop
from asgiref.sync import sync_to_async
game_queue = []

async def join_room(client):
    await client.channel_layer.group_add(
        client.room_group_name,
        client.channel_name
    )

async def add_to_room(opponent, controler):
	await join_room(opponent)
	await join_room(controler)

def add_to_queue(client, queue):
	queue.append(client)

async def remove_from_queue(players):
    await players[0].channel_layer.group_discard(
        players[0].room_group_name,
        players[0].channel_name
    )
    await players[1].channel_layer.group_discard(
        players[1].room_group_name,
        players[1].channel_name
    )


async def timer(client, seconds):
    for i in range(seconds):
        message = { 'time' : seconds - (i + 1) }
        await client.send_message(message, 'timer_message')

#always the second client will be the controler
#always the first client will be the opponent

class GameConsumer(AsyncWebsocketConsumer):
    rooms = {}
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = self.room_name
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        add_to_queue(self, game_queue)
        if len(game_queue) >= 2:
            player_1 = game_queue.pop(0)
            player_2 = game_queue.pop(0)
            GameConsumer.rooms[self.room_group_name] = GameLoop(player_1, player_2)
            await self.send_message({'status': 'game_start'})

        await self.accept()

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        if text_data_json['message'] == 'firstdata':
            await GameConsumer.rooms[self.room_group_name].assign_data(text_data_json, self)
        if text_data_json['message'] == 'move':
            await GameConsumer.rooms[self.room_group_name].assign_racquet(text_data_json, self)
    
    async def disconnect(self, close_code):
        await remove_from_queue(
            GameConsumer.rooms[self.room_group_name].get_players()
        )
        GameConsumer.rooms.pop(self.room_group_name)
        
    
    async def send_message(self, message, function='game_message'):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': function,
                'message': message
            }
        )
    
    async def game_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

torunament_queue = []

class MatchMaikingConsumer(AsyncWebsocketConsumer):
    rooms = {}
    async def connect(self):
        self.id = self.scope['url_route']['kwargs']['id']
        add_to_queue(self, torunament_queue)
        await self.accept()
        try:
            await asyncio.wait_for(self.wait_for_opponent(), timeout=30.0)
        except asyncio.TimeoutError:
            await self.close()
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        if data['message'] == 'start':
            MatchMaikingConsumer.rooms[self.room_group_name] += 1
            if MatchMaikingConsumer.rooms[self.room_group_name] == 2:
                await timer(self, 4)
            

    async def disconnect(self, close_code):
        pass

    async def wait_for_opponent(self):
        while len(torunament_queue) < 2 and self in torunament_queue:
            await asyncio.sleep(0.1)

        if len(torunament_queue) >= 2:
            player_1 = torunament_queue.pop(0)
            player_2 = torunament_queue.pop(0)
            player_1.room_group_name = f"game_{player_2.id}-{player_1.id}"
            player_2.room_group_name = f"game_{player_2.id}-{player_1.id}"
            await add_to_room(player_1, player_2)
            message = {
                'text': 'Opponent found',
                'room_group_name': player_1.room_group_name,
                'user_1': player_1.id,
                'user_2': player_2.id,
            }
            await self.send_message(message=message)
            MatchMaikingConsumer.rooms[self.room_group_name] = 0

    async def send_message(self, message, function='tournament_messages'):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': function,
                'message': message
            }
        )
    
    async def tournament_messages(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def timer_message(self, event):
        await self.tournament_messages(event)
        await asyncio.sleep(1)