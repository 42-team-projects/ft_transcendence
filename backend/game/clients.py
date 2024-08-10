import json
import asyncio
class GameRoom :
    def __init__(self, client1, client2):
        self._client1 = client1
        self._client2 = client2
        self._room_name = f"{client1.id}-{client2.id}_room"
        self._client1.y = 0
        self._client2.y = 0
        self._client1.score = 0
        self._client2.score = 0
        self._active = False
        self._canvas_width = 300
        self._canvas_height = 150
        self._game_loop = True
        self.racquet = {
            'height': 50,
            'width': 10
        }
    async def get_opponent(self):
        message = {
            'room_name': self ._room_name,
            'opponent_id': self._client2.id
        }
        await self._client1.ws.send(json.dumps(message))
        message['opponent_id'] = self._client1.id
        await self._client2.ws.send(json.dumps(message))

    async def game_loop(self):
        #canvas
        canvas_width = self._canvas_width
        canvas_height = self._canvas_height

        #ball data
        ball_x = canvas_width / 2
        ball_y = canvas_height / 2
        ball_radius = 10
        ball_dx = 8
        ball_dy = 5

        #racquet data
        racquet_width = self._racquet['width']
        racquet_height = self._racquet['height']

        #game loop
        while self._game_loop:
            ball_x += ball_dx
            ball_y += ball_dy

            #calculate ball movement
            if ball_y + ball_radius >= canvas_height or ball_y - ball_radius <= 0:
                ball_dy = -ball_dy
            if ball_x - ball_radius <= 0 and ball_y >= self._client1.y and ball_y <= self._client1.y + racquet_height:
                ball_dx = -ball_dx
            elif ball_x + ball_radius >= canvas_width and ball_y >= self._client2.y and ball_y <= self._client2.y + racquet_height:
                ball_dx = -ball_dx
            elif ball_x + ball_radius >= canvas_width:
                self._client2.score += 1
                raise Exception("Round Over")
            elif ball_x - ball_radius <= 0:
                self._client1.score += 1
                raise Exception("Round Over")

            #store data
            self._data1 = {
                'ball': {
                    'x': ball_x,
                    'y': ball_y,
                    'radius': ball_radius,
                    'dx': ball_dx,
                    'dy': ball_dy,
                },
            }
            self._data2 = {
                'ball': {
                    'x': canvas_width - ball_x,
                    'y': ball_y,
                    'radius': ball_radius,
                    'dx': -ball_dx,
                    'dy': ball_dy,
                },
            }
            await asyncio.sleep(0.016)
    async def sending(self):
        while self._game_loop:
            await self._client1.ws.send(json.dumps(self._data1))
            await self._client2.ws.send(json.dumps(self._data2))      
            await asyncio.sleep(0.05)

    async def game_loops(self):
        #rounds
        self._rounds = 5
        for i in range(1, self._rounds + 1):
            message = {
                'status': 'RoundStart',
                'round': i
            }
            await self._client1.ws.send(json.dumps(message))
            await self._client2.ws.send(json.dumps(message))
            await self.reset_players()
            self._game_loop = True
            
            await asyncio.sleep(4)
            try:
                await asyncio.gather(self.game_loop(), self.sending())
            except Exception as e:
                self._game_loop = False
                message = {
                    'status': 'RoundOver',
                    'score': {
                        'player': self._client1.score,
                        'opponent': self._client2.score
                    }
                }
                await self._client1.ws.send(json.dumps(message))
                message['score'] = {
                    'player': self._client2.score,
                    'opponent': self._client1.score
                }
                await self._client2.ws.send(json.dumps(message))
        message = {
            'status': 'GameOver',
            'player_state' : 'win' if self._client1.score > self._client2.score else 'lose'
        }
        await self._client1.ws.send(json.dumps(message))
        message['player_state'] = 'win' if self._client2.score > self._client1.score else 'lose'
        await self._client2.ws.send(json.dumps(message))

    async def sendData(self, data, ws):
        if ws == self._client1.ws:
            await self._client2.ws.send(json.dumps(data))
        else:
            await self._client1.ws.send(json.dumps(data))

    async def set_player_y(self, ws, y):
        if ws == self._client1.ws:
            self._client1.y = y
        else:
            self._client2.y = y

    def get_room_name(self):
        return self._room_name

    async def handle_disconnect(self):
        self._game_loop = False
        self._rounds = 0
        # if self._client1.ws == self:
        #     self._client2.score = 5
        #     self._client1.score = 0
        # else:
        #     self._client1.score = 5
        #     self._client2.score = 0
        print("Client disconnected", self._client1.score, self._client2.score)

    def set_canvas_width(self, width):
        self._canvas_width = width

    def set_canvas_height(self, height):
        self._canvas_height = height
    
    def get_client1_ws(self):
        return self._client1.ws
    
    def get_client2_ws(self):
        return self._client2.ws

    def set_racquet_size(self, racquet_size):
        self._racquet = racquet_size

    async def reset_players(self):
        self._client1.y = 0
        self._client2.y = 0

class Client :
    def __init__(self, ws, id):
        self.ws = ws
        self.id = id
