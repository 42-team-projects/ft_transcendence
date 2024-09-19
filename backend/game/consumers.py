import time
import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from . clients import GameLoop
from asgiref.sync import sync_to_async
game_queue = {}
import logging

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
        await client.send_message(message, function='timer_message')

# async def is_already_in_queue(client, queue):

class GameConsumer(AsyncWebsocketConsumer):
    rooms = {}
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = self.room_name
        self.close_code = 0
        self.task = None
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        add_to_game_queue(self, game_queue)

        await self.accept()
        if len(game_queue[self.room_group_name]) == 1:
            self.task = asyncio.create_task(self.waiting())
            
            # add variable of the task the game queue of this room
            

    async def waiting(self):
        try:
            await asyncio.wait_for(self.start(), timeout=10)
        except asyncio.TimeoutError:
            await self.close()
        except asyncio.CancelledError:
            await self.close()

    async def start (self):
        while len(game_queue[self.room_group_name]) < 2:
            await asyncio.sleep(0.1)
        if len(game_queue[self.room_group_name]) >= 2:
            player_1 = game_queue[self.room_group_name].pop(0)
            player_2 = game_queue[self.room_group_name].pop(0)
            GameConsumer.rooms[self.room_group_name] = GameLoop(player_1, player_2)
            await self.send_message({'status': 'game_start'}, function='game_message')

        await self.accept()

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        if text_data_json['message'] == 'firstdata':
            await GameConsumer.rooms[self.room_group_name].assign_data(text_data_json, self)
        if text_data_json['message'] == 'move':
            await GameConsumer.rooms[self.room_group_name].assign_racquet(text_data_json, self)
        if text_data_json['message'] == 'pause':
            await GameConsumer.rooms[self.room_group_name].pause_game()
        if text_data_json['message'] == 'resume':
            await GameConsumer.rooms[self.room_group_name].resume_game()
    
    async def disconnect(self, close_code):
        self.close_code = close_code
        await remove_from_channel_layer(self)
        if self.task:
            self.task.cancel()
        if self.room_group_name in game_queue :
            if self in game_queue[self.room_group_name]:
                game_queue[self.room_group_name].remove(self)
            if game_queue[self.room_group_name] == []:
                del game_queue[self.room_group_name]
        if(self.room_group_name in GameConsumer.rooms):
            GameConsumer.rooms[self.room_group_name].closed += 1
            if(GameConsumer.rooms[self.room_group_name]._game_over == False):
                await GameConsumer.rooms[self.room_group_name].cancel_game(self)
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'terminate_game',
                    }
                )
            if GameConsumer.rooms[self.room_group_name].closed == 2 :
                del GameConsumer.rooms[self.room_group_name]
        
            
    async def terminate_game(self, event):
        await self.close()

    async def send_message(self, message, function='game_message'):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': function,
                'message': message
            }
        )
    
    async def game_message(self, event):
        # try:
            message = event['message']
            # print(message)
            await self.send(text_data=json.dumps({
                'message': message
            }))
        # except Exception as e:
        #     print("Error", e)

match_making_queue = []
def add_to_match_making_queue(client, queue):
    queue.append(client)
	# add client to queue depending on the room_group_name

class MatchMaikingConsumer(AsyncWebsocketConsumer):
    rooms = {}
    async def connect(self):
        self.id = self.scope['url_route']['kwargs']['id']
        self.close_code = 0
        self.room_group_name = 0
        self.task = None
        if not await self.is_already_in_queue(match_making_queue):
            add_to_match_making_queue(self, match_making_queue)
            await self.accept()
            if len(match_making_queue) == 1:
                self.task = asyncio.create_task(self.waiting())
        else:
            self.close_code = 4001
            await self.close()
    async def is_already_in_queue(self, queue):
        for client in queue:
            if client.id == self.id:
                return True
        return False

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data['message'] == 'start':
            MatchMaikingConsumer.rooms[self.room_group_name] += 1
            if MatchMaikingConsumer.rooms[self.room_group_name] == 2:
                await timer(self, 4)
    
    async def waiting(self):
        try:
            await asyncio.wait_for(self.wait_for_opponent(), timeout=30)
        except asyncio.TimeoutError:
            await self.close()

    async def disconnect(self, close_code):
        if self.close_code == 0:
            self.close_code = close_code
            if self.task:
                self.task.cancel()
            if self in match_making_queue:
                match_making_queue.remove(self)
            if self.room_group_name and self.room_group_name in MatchMaikingConsumer.rooms:
                await remove_from_channel_layer(self)
                MatchMaikingConsumer.rooms[self.room_group_name] -= 1
                if MatchMaikingConsumer.rooms[self.room_group_name] == 0:
                    del MatchMaikingConsumer.rooms[self.room_group_name]
                # await self.channel_layer.group_send(
                #     self.room_group_name,
                #     {
                #         'type': 'terminate_game',
                #     }
                # )
  

    async def terminate_game(self, event):
        await self.close()

    async def wait_for_opponent(self):
        while len(match_making_queue) < 2 and not self.close_code:
            await asyncio.sleep(0.1)
    
        if len(match_making_queue) >= 2:
            player_1 = match_making_queue.pop(0)
            player_2 = match_making_queue.pop(0)
            player_1.room_group_name = f"{player_2.id}-{player_1.id}"
            player_2.room_group_name = f"{player_2.id}-{player_1.id}"
            await add_to_room(player_1, player_2)
            message = {
                'text': 'Opponent found',
                'room_group_name': "game_" + player_1.room_group_name,
                'user_1': player_1.id,
                'user_2': player_2.id,
            }
            await self.send_message(message=message , function='match_maiking_message')
            MatchMaikingConsumer.rooms[self.room_group_name] = 0

    async def send_message(self, message, function='match_maiking_message'):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': function,
                'message': message
            }
        )
    
    async def match_maiking_message(self, event):
        message = event['message']
        if self.close_code:
            raise Exception('disconnected: ', self.close_code, message)
            return
        try:
            await self.send(text_data=json.dumps({
                'message': message
            }))
        except Exception as e:
            await self.close()

    async def timer_message(self, event):
        await self.match_maiking_message(event)
        await asyncio.sleep(1)