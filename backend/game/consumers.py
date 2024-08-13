import time
import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from . clients import GameLoop
queue = []

async def join_room(client):
	await client.channel_layer.group_add(
		client.room_group_name,
		client.channel_name
	)
	
async def add_to_room(opponent, controler):
	await join_room(opponent)
	await join_room(controler)

async def add_to_queue(client):
	queue.append(client)

async def remove_from_queue(client):
	if client in queue:
		queue.remove(client)

#always the second client will be the controler
#always the first client will be the opponent
class GameConsumer(AsyncWebsocketConsumer) :
	async def connect(self):
		self.id = self.scope['url_route']['kwargs']['id']
		await add_to_queue(self)
		await self.accept()

		try:
			await asyncio.wait_for(self.wait_for_opponent(), timeout=30.0)
		except asyncio.TimeoutError:
			print('Timeout')
			await self.close()

		# await controler.game_loop.get_opponent()

	async def wait_for_opponent(self):
		# await self.send(text_data=json.dumps({
		# 	'message': 'Waiting for opponent'
		# }))
		while len(queue) < 2 and self in queue:
			await asyncio.sleep(0.1)  # Small sleep to avoid busy-waiting
		if len(queue) >= 2:
			controler = queue.pop()
			opponent = queue.pop()

			opponent.room_group_name = f'game_{opponent.id}-{controler.id}'
			controler.room_group_name = f'game_{opponent.id}-{controler.id}'

			# Add to room logic here
			await add_to_room(opponent, controler)

			await self.channel_layer.group_send(
				controler.room_group_name,
				{
					'type': 'game_message',
					'message': {
						'user_id_1': controler.id,
						'user_id_2': opponent.id
					}
				}
			)
			await for i in range(3):
				await asyncio.sleep(1)
				await self.channel_layer.group_send(
					controler.room_group_name,
					{
						'type': 'game_message',
						'message': {
							'countdown': i
						}
					}
				)
		await self.send(text_data=json.dumps({
			'message': 'Opponent found, game starting'
		}))
	

	async def receive(self, text_data=None, bytes_data=None):
		pass

	async def disconnect(self, close_code):
		print('disconnected')
		if hasattr(self, 'room_group_name'):
			await self.channel_layer.group_discard(
				self.room_group_name,
				self.channel_name
			)
		await remove_from_queue(self)

	async def game_message(self, event):
		message = event['message']
		await self.send(text_data=json.dumps({
			'message': message
		}))