import json
import asyncio
import logging
import random
class GameLoop :
    def __init__(self, controler, opponent):
        self.controler = controler
        self.opponent = opponent
        self.controler.score = 0
        self.opponent.score = 0
        self.active = False
        self.break_loop = False
        self.canvas_width = 300
        self.canvas_height = 150
        self.racquet = {'height': 50,'width': 10}
        self.ready = 0
        self.closed = 0
        self.task = None
        self.pause = False
        self._game_over = False
        self.ball_direction = random.choice([-1, 1])
        

    async def assign_racquet(self, data, ws):
        if ws == self.controler:
            self.controler.y = data['y']
        else:
            self.opponent.y = data['y']


    async def rounds_loop(self):
        self._rounds = 5
        for i in range(1, self._rounds + 1):
            if i % 4 == 1 or i % 4 == 3:
                self.ball_direction *= -1
            await self.round_start(i)
            await self.reset_players()
            self.active = True
            await asyncio.sleep(4)
            try:
                await self.game_loop()
            except Exception as e:
                self.active = False
                self.break_loop = True
                await self.round_over()
                if self.controler.score >= 3 or self.opponent.score >= 3:
                    return 

    async def main(self):
        await self.rounds_loop()
        await self.game_over()
    
    async def cancel_game(self, ws):
        self.break_loop = True
        self.active = False
        if self.task:
            self.task.cancel()
        if not self.task or self.task.cancelled() == False:
            await self.forfit(ws)
            
        self.task = None
        self._rounds = 0
        self.controler = None
        self.opponent = None

    async def forfit(self, ws):
        self.opponent.score = 0
        self.controler.score = 0
        if ws == self.controler:
            self.opponent.score = 5
        elif ws == self.opponent:
            self.controler.score = 5
        await self.game_over()

    async def assign_data(self, data, ws):
        self.canvas_width = data['canvas_width']
        self.canvas_height = data['canvas_height']
        self.reset_players()
        self.racquet = data['racquet']
        if ws == self.controler:
            self.controler.id = data['id']
        else:
            self.opponent.id = data['id']
        self.ready += 1
        if self.ready == 2:
            self.task = asyncio.create_task(self.main())
            self.ready = 0


    async def calculate_ball_movement(self):
        if self.data['ball_y'] + self.data['ball_radius'] >= self.canvas_height or self.data['ball_y'] - self.data['ball_radius'] <= 0:
            self.data['ball_dy'] = -self.data['ball_dy']

        if self.data['ball_x'] - self.data['ball_radius'] <= 0: 
            if self.data['ball_y'] >= self.controler.y and self.data['ball_y'] <= self.controler.y + self.racquet['height']:
                self.data['ball_dx'] = -self.data['ball_dx']
            else:
                self.opponent.score += 1
                raise Exception("Round Over")
    
        elif self.data['ball_x'] + self.data['ball_radius'] >= self.canvas_width: 
            if self.data['ball_y'] >= self.opponent.y and self.data['ball_y'] <= self.opponent.y + self.racquet['height']:
                self.data['ball_dx'] = -self.data['ball_dx']
            else:
                self.controler.score += 1
                raise Exception("Round Over")
        if(self.data['ball_dx'] < 0):
            self.data['ball_dx'] -= 0.01
        else:
            self.data['ball_dx'] += 0.01
        if(self.data['ball_dy'] < 0):
            self.data['ball_dy'] -= 0.01
        else:
            self.data['ball_dy'] += 0.01
    

    async def store_data(self):
        self.ball_data = {
            'status': 'Game',
            'player_1': {
                'id': self.opponent.id,
                'ball_x':  self.canvas_width - self.data['ball_x'],
                'ball_dx': -self.data['ball_dx'],
                'y': self.opponent.y
                
            },
            'player_2': {
                'id': self.controler.id,
                'ball_x': self.data['ball_x'],
                'ball_dx': self.data['ball_dx'],
                'y': self.controler.y
            },
            'ball': {
                'y': self.data['ball_y'],
                'radius': self.data['ball_radius'],
                'dy': self.data['ball_dy']
            },
        }


    async def game_loop(self):
        self.data = {
            'ball_x': self.canvas_width / 2,
            'ball_y': self.canvas_height / 2,
            'ball_radius': 12,
            'ball_dx': 10  * self.ball_direction,
            'ball_dy': 7 * random.choice([-1, 1])
        }
        while self.active:
            if self.pause:
                await asyncio.sleep(0.01667)
                continue
            self.data['ball_x'] += self.data['ball_dx']
            self.data['ball_y'] += self.data['ball_dy']
            await self.calculate_ball_movement()
            await self.store_data()
            await asyncio.gather(self.send_message(self.ball_data), asyncio.sleep(0.01667))                 


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


    async def send_message(self, message):
        if self.controler:
            await self.controler.send_message(message, 'game_message')
        elif self.opponent:
            await self.opponent.send_message(message, 'game_message')



    def get_players(self):
        return self.controler, self.opponent
        
    async def reset_players(self):
        self.controler.y = self.canvas_height / 2
        self.opponent.y = self.canvas_height / 2

    async def game_over(self):
        self._game_over = True
        if self.controler and self.opponent:
            message = {
                'status': 'GameOver',
                'player_1': {
                    'id': self.controler.id, 'game_state': 'win' if self.controler.score > self.opponent.score else 'lose' , 'score': self.controler.score, 'opponent_score': self.opponent.score
                },
                'player_2': {
                    'id': self.opponent.id, 'game_state': 'win' if self.opponent.score > self.controler.score else 'lose', 'score': self.opponent.score, 'opponent_score': self.controler.score
                }
            }
        elif self.controler:
            message = {
                'status': 'GameOver',
                'player_1': {
                    'id': self.controler.id, 'game_state': 'win', 'score': self.controler.score, 'opponent_score': self.opponent.score
                },
            }
        elif self.opponent:
            message = {
                'status': 'GameOver',
                'player_1': {
                    'id': self.opponent.id, 'game_state': 'win', 'score': self.opponent.score, 'opponent_score': self.controler.score
                }
            }
        await self.send_message(message)
        self.active = False

    async def pause_game(self):
        self.pause = True
        message = {
            'status': 'Pause'
        }
        await self.send_message(message)

    async def resume_game(self):
        self.pause = False
        message = {
            'status': 'Resume'
        }
        await self.send_message(message)

