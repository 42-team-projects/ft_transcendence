import json
import asyncio
class GameRoom :
    def __init__(self, client1, client2):
        self._client1 = client1
        self._client2 = client2
        self._room_name = f"{client1.id}-{client2.id}_room"
        self._client1.y = 0
        self._client2.y = 0
        self._active = False
        self._canvas_width = 300
        self._canvas_height = 150
        self._game_loop = True

    async def find_opponent(self):
        message = {
            'room_name': self._room_name,
            'opponent_id': self._client2.id
        }
        await self._client1.ws.send(json.dumps(message))
        message['opponent_id'] = self._client1.id
        await self._client2.ws.send(json.dumps(message))
    async def game_loop(self):
        #canvas
        canvas_width = self._canvas_width
        canvas_height = self._canvas_height

        #ball
        ball_x = canvas_width / 2
        ball_y = canvas_height / 2
        ball_radius = 10
        ball_dx = 8
        ball_dy = 5

        #racquet
        player1_y = canvas_height / 2
        player2_y = canvas_height / 2
        racquet_width = 5
        racquet_height = 90
        #game loop
        while self._game_loop:
            ball_x += ball_dx
            ball_y += ball_dy
            if ball_x + ball_radius >= canvas_width or ball_x - ball_radius <= 0 :
                raise Exception("Game Over")
            if ball_y + ball_radius >= canvas_height or ball_y - ball_radius <= 0:
                ball_dy = -ball_dy
            if ball_x - ball_radius <= racquet_width and ball_y >= player1_y and ball_y <= player1_y + racquet_height:
                ball_dx = -ball_dx
            if ball_x + ball_radius >= canvas_width - racquet_width and ball_y >= player2_y and ball_y <= player2_y + racquet_height:
                ball_dx = -ball_dx
            
            self._data1 = {
                'ball': {
                    'x': ball_x,
                    'y': ball_y,
                    'radius': ball_radius,
                    'dx': ball_dx,
                    'dy': ball_dy,
                },
                'racquet': {
                    'player_y': player1_y,
                    'opponent_y': player2_y,
                    'racquet_width': racquet_width,
                    'racquet_height': racquet_height,
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
                'racquet': {
                    'player_y': player2_y,
                    'opponent_y': player1_y,
                    'racquet_width': racquet_width,
                    'racquet_height': racquet_height,
                },
            }
            await asyncio.sleep(0.016)
    async def sendin(self):
        while self._game_loop:
            # print(self._data1, self._data2)
            await self.sendData(self._data1, self._client1.ws)
            await self.sendData(self._data2, self._client2.ws)
            await asyncio.sleep(0.05)

    async def game_loops(self):
        i = 0
        while i < 5:
            message = {
                'status': 'RoundStart',
                'round': i
            }
            await self._client1.ws.send(json.dumps(message))
            await self._client2.ws.send(json.dumps(message))
            self._game_loop = True
            await asyncio.sleep(4)
            try:
                await asyncio.gather(self.game_loop(), self.sendin())
            except Exception as e:
                print(e)
                self._game_loop = False
                await self._client1.ws.send(json.dumps({'status': 'RoundOver'}))
                await self._client2.ws.send(json.dumps({'status': 'RoundOver'}))
            i += 1
    async def sendData(self, data, ws):
        if ws == self._client1.ws:
            await self._client2.ws.send(json.dumps(data))
        else:
            await self._client1.ws.send(json.dumps(data))
    def set_player_y(self, ws, y):
        if ws == self._client1.ws:
            self._client1.y = y
        else:
            self._client2.y = y
    def get_room_name(self):
        return self._room_name

    def get_player1_y(self):
        return self._client1.y

    def get_player2_y(self):
        return self._client2.y

    def get_client1_ws(self):
        return self._client1.ws

    def get_client2_ws(self):
        return self._client2.ws
    def set_canvas_width(self, width):
        self._canvas_width = width
    def set_canvas_height(self, height):
        self._canvas_height = height

class Client :
    def __init__(self, ws, id):
        self.ws = ws
        self.id = id
