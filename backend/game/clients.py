import json
import asyncio
class GameLoop :
    def __init__(self, controler, opponent):
        self.controler = controler
        self.opponent = opponent

        self.controler.y = 0
        self.opponent.y = 0

        self.controler.score = 0
        self.opponent.score = 0

        self.active = False

        self.canvas_width = 300
        self.canvas_height = 150

        self.racquet = {
            'height': 50,
            'width': 10
        }

    async def assign_racquet(self, data, ws):
        print('data', data)
        if ws == self.controler:
            self.controler.y = data['y']
        else:
            self.opponent.y = data['y']
        message = {
            'status': 'Racquet',
            'player_1': {
                'id': self.controler.id,
                'y': self.controler.y
            },
            'player_2': {
                'id': self.opponent.id,
                'y': self.opponent.y
            }
        }
        await ws.send_message(message, 'game_message')
    
    async def assign_data(self, data):
        # print('data', data)
        self.canvas_width = data['canvas_width']
        self.canvas_height = data['canvas_height']
        self.racquet = data['racquet']
        self.ready += 1
        if self.ready == 2:
            asyncio.create_task(self.main())
            self.ready = 0

    async def game_loop(self):
        #canvas
        canvas_width = self.canvas_width
        canvas_height = self.canvas_height

        #ball data
        ball_x = canvas_width / 2
        ball_y = canvas_height / 2
        ball_radius = 10
        ball_dx = 8
        ball_dy = 5

        #racquet data
        racquet_width = self.racquet['width']
        racquet_height = self.racquet['height']
        # print('game_loop', self.active)
        #game loop
        while self.active:
            ball_x += ball_dx
            ball_y += ball_dy

            #calculate ball movement
            if ball_y + ball_radius >= canvas_height or ball_y - ball_radius <= 0:
                ball_dy = -ball_dy
            if ball_x - ball_radius <= 0 and ball_y >= self.controler.y and ball_y <= self.controler.y + racquet_height:
                ball_dx = -ball_dx
            elif ball_x + ball_radius >= canvas_width and ball_y >= self.opponent.y and ball_y <= self.opponent.y + racquet_height:
                ball_dx = -ball_dx
            elif ball_x + ball_radius >= canvas_width:
                self.controler.score += 1
                raise Exception("Round Over")
            elif ball_x - ball_radius <= 0:
                self.opponent.score += 1
                raise Exception("Round Over")
            #store data
            self.ball_data = {
                'status': 'Game',
                'player_1': {
                    'id': self.controler.id,
                    'ball_x':  canvas_width - ball_x,
                    'ball_dx': -ball_dx,

                },
                'player_2': {
                    'id': self.opponent.id,
                    'ball_x': ball_x,
                    'ball_dx': ball_dx,
                },
                'ball': {
                    'y': ball_y,
                    'radius': ball_radius,
                    'dy': ball_dy,
                },
            }
            await asyncio.sleep(0.016)
    async def sending(self):
        # print('sending' , self.active)
        while self.active:
            await self.send_message(self.ball_data)      
            await asyncio.sleep(0.05)

    async def round_start(self, round):
        message = {
            'status': 'RoundStart',
            'round': round
        }
        await self.send_message(message)
    
    async def round_over(self):
        message = {
            'status': 'RoundOver',
            'player_1': {
                'id': self.controler.id, 'score': self.controler.score 
            },
            'player_2': {
                'id': self.opponent.id, 'score': self.opponent.score
            }
        }
        await self.send_message(message)

    async def game_over(self):
        message = {
            'status': 'GameOver',
            'player_1': {
                'id': self.controler.id, 'game_state': 'win' if self.controler.score > self.opponent.score else 'lose'
            },
            'player_2': {
                'id': self.opponent.id, 'game_state': 'win' if self.opponent.score > self.controler.score else 'lose'
            }
        }
        await self.send_message(message)

    async def main(self):
        #rounds
        self._rounds = 5
        for i in range(1, self._rounds + 1):
            await self.round_start(i)
            await self.reset_players()
            self.active = True 
            await asyncio.sleep(4)
            try:
                await asyncio.gather(self.game_loop(), self.sending())
            except Exception as e:
                self.active = False
                await self.round_over()
        # print('game over')
        await self.game_over()

    async def send_message(self, message):
        await self.controler.channel_layer.group_send(
            self.controler.room_group_name,
            {
                'type': 'game_message',
                'message': message
            }
        )

    # async def set_player_y(self, ws, y):
    #     if ws == self.controler.ws:
    #         self.controler.y = y
    #     else:
    #         self.opponent.y = y

    # def get_room_name(self):
    #     return self._room_name

    # async def handle_disconnect(self):
    #     self.active = False
    #     self._rounds = 0
    #     # if self.controler.ws == self:
    #     #     self.opponent.score = 5
    #     #     self.controler.score = 0
    #     # else:
    #     #     self.controler.score = 5
    #     #     self.opponent.score = 0
    #     print("Client disconnected", self.controler.score, self.opponent.score)

    # def setcanvas_width(self, width):
    #     self.canvas_width = width

    # def setcanvas_height(self, height):
    #     self.canvas_height = height
    
    # def controler_ws(self):
    #     return self.controler.ws
    
    # def getopponent_ws(self):
    #     return self.opponent.ws

    # def setracquet_size(self, racquet_size):
    #     self.racquet = racquet_size
    def get_players(self):
        return self.controler, self.opponent
    async def reset_players(self):
        self.controler.y = 0
        self.opponent.y = 0

class Client :
    def __init__(self, ws, id):
        self.ws = ws
        self.id = id
