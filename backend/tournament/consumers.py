import json
from channels.generic.websocket import AsyncWebsocketConsumer

class TournamentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.tournament_id = self.scope['url_route']['kwargs']['tournament_id']
        self.room_group_name = f'tournament_{self.tournament_id}'

        # Add the user to the tournament group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Remove the user from the tournament group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send the message to the tournament group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'tournament_message',
                'message': message
            }
        )

    async def tournament_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))



class TournamentDataSyncConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.tournament_name = self.scope['url_route']['kwargs']['tournament_name']
        self.room_group_name = f'tournament_{self.tournament_name}'

        # Add the user to the tournament group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Remove the user from the tournament group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        pass
    
    async def tournament_message(self, event):
        # Extract the message from the event
        message = event['message']
        testData = event['dataTest']
        join = event['join']
        # Send the message to the WebSocket client
        await self.send(text_data=json.dumps({
            'message': message,
            'dataTest': testData,
            'join': join
        }))