import time
import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from . clients import GameLoop
from asgiref.sync import sync_to_async
game_queue = {}

async def join_room(client):
    await client.channel_layer.group_add(
        client.room_group_name,
        client.channel_name
    )

async def add_to_room(opponent, controler):
	await join_room(opponent)
	await join_room(controler)

def add_to_game_queue(client, queue):
    if client.room_group_name not in queue:
        queue[client.room_group_name] = []
    queue[client.room_group_name].append(client)
	# add client to queue depending on the room_group_name

async def remove_from_channel_layer(player):
    await player.channel_layer.group_discard(
        player.room_group_name,
        player.channel_name
    )


async def timer(client, seconds):
    for i in range(seconds):
        message = { 'time' : seconds - (i + 1) }
        await client.send_message(message, 'timer_message')

class GameConsumer(AsyncWebsocketConsumer):
    rooms = {}
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = self.room_name
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        add_to_game_queue(self, game_queue)
        print(len(game_queue[self.room_group_name]))
        if len(game_queue[self.room_group_name]) >= 2:
            player_1 = game_queue[self.room_group_name].pop(0)
            player_2 = game_queue[self.room_group_name].pop(0)
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
        if self in game_queue[self.room_group_name]:
            game_queue[self.room_group_name].remove(self)
        if game_queue[self.room_group_name] == []:
            del game_queue[self.room_group_name]
        if(self.room_group_name in GameConsumer.rooms):
            GameConsumer.rooms[self.room_group_name].closed += 1
            if(GameConsumer.rooms[self.room_group_name].closed == 2):
                await GameConsumer.rooms[self.room_group_name].game_over()
                del GameConsumer.rooms[self.room_group_name]
            else:
                await GameConsumer.rooms[self.room_group_name].close_socket(self)

        await remove_from_channel_layer(
            self
        )
            #     del GameConsumer.rooms[self.room_group_name]
            # else:
        print(game_queue)
        print(GameConsumer.rooms)
    
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
def add_to_torunament_queue(client, queue):
    queue.append(client)
	# add client to queue depending on the room_group_name

class MatchMaikingConsumer(AsyncWebsocketConsumer):
    rooms = {}
    async def connect(self):
        self.id = self.scope['url_route']['kwargs']['id']
        self.room_group_name = 0
        # if(self.id in torunament_queue):
        #     await self.close()
        add_to_torunament_queue(self, torunament_queue)
        await self.wait_for_opponent()
        await self.accept()
        # except asyncio.TimeoutError:
        #     await self.close()
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        if data['message'] == 'start':
            MatchMaikingConsumer.rooms[self.room_group_name] += 1
            if MatchMaikingConsumer.rooms[self.room_group_name] == 2:
                await timer(self, 4)
            

    async def disconnect(self, close_code):
        if self in torunament_queue:
            torunament_queue.remove(self)
        if self.room_group_name and self.room_group_name in MatchMaikingConsumer.rooms:
            MatchMaikingConsumer.rooms[self.room_group_name] -= 1
            if MatchMaikingConsumer.rooms[self.room_group_name] == 0:
                del MatchMaikingConsumer.rooms[self.room_group_name]
            await remove_from_channel_layer(
                self
            )
        print(torunament_queue)

    async def wait_for_opponent(self):
        # while len(torunament_queue) < 2 and self in torunament_queue:
        #     await asyncio.sleep(0.1)

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
