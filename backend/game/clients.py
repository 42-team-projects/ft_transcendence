import json
import asyncio
import logging
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

    async def assign_racquet(self, data, ws):
        if ws == self.controler:
            self.controler.y = data['y']
        else:
            self.opponent.y = data['y']
        message = {
            'status': 'move',
            'player_1': {
                'id': self.controler.id,
                'y': self.controler.y
            },
            'player_2': {
                'id': self.opponent.id,
                'y': self.opponent.y
            }
        }
        await self.send_message(message)


    async def rounds_loop(self):
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
                self.break_loop = True
                await self.round_over()
        return True

    async def main(self):
        await self.rounds_loop()
        await self.game_over()
    
    async def cancel_game(self, ws):
        self.break_loop = True
        self.active = False
        if self.task:
            self.task.cancel()
        if self.task.cancelled() == False:
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

    async def sending(self):
        # print('sending' , self.active)
            # start time
        if self.active:
            self.break_loop = False
        while True:
            if self.break_loop:
                raise Exception("Round Over")
            if(self.pause):
                await asyncio.sleep(0.05)
                continue
            await self.send_message(self.ball_data)
            await asyncio.sleep(0.05)


    async def assign_data(self, data, ws):
        # print('data', data)
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
            # end task of main
            self.ready = 0


    async def calculate_ball_movement(self):
        if self.data['ball_y'] + self.data['ball_radius'] >= self.canvas_height or self.data['ball_y'] - self.data['ball_radius'] <= 0:
            self.data['ball_dy'] = -self.data['ball_dy']
        if self.data['ball_x'] - self.data['ball_radius'] <= 0 and self.data['ball_y'] >= self.controler.y and self.data['ball_y'] <= self.controler.y + self.racquet['height']:
            self.data['ball_dx'] = -self.data['ball_dx']
        elif self.data['ball_x'] + self.data['ball_radius'] >= self.canvas_width and self.data['ball_y'] >= self.opponent.y and self.data['ball_y'] <= self.opponent.y + self.racquet['height']:
            self.data['ball_dx'] = -self.data['ball_dx']
        elif self.data['ball_x'] + self.data['ball_radius'] >= self.canvas_width:
            self.controler.score += 1
            raise Exception("Round Over")
        elif self.data['ball_x'] - self.data['ball_radius'] <= 0:
            self.opponent.score += 1
            raise Exception("Round Over")

    async def store_data(self):
        self.ball_data = {
            'status': 'Game',
            'player_1': {
                'id': self.opponent.id,
                'ball_x':  self.canvas_width - self.data['ball_x'],
                'ball_dx': -self.data['ball_dx'],
            },
            'player_2': {
                'id': self.controler.id,
                'ball_x': self.data['ball_x'],
                'ball_dx': self.data['ball_dx'],
            },
            'ball': {
                'y': self.data['ball_y'],
                'radius': self.data['ball_radius'],
                'dy': self.data['ball_dy']
            },
        }


    async def game_loop(self):
        #game loop
        self.data = {
            'ball_x': self.canvas_width / 2,
            'ball_y': self.canvas_height / 2,
            'ball_radius': 12,
            'ball_dx': 12,
            'ball_dy': 9,
        }
        while self.active:
            if self.pause:
                await asyncio.sleep(0.0167)
                continue
            self.data['ball_x'] += self.data['ball_dx']
            self.data['ball_y'] += self.data['ball_dy']
            #calculate ball movement
            await self.calculate_ball_movement()
            #store data
            await self.store_data()
            await asyncio.sleep(0.0167)


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
        # self.active = False
        self.pause = True
        message = {
            'status': 'Pause'
        }
        await self.send_message(message)

    async def resume_game(self):
        # self.active = True
        self.pause = False
        message = {
            'status': 'Resume'
        }
        await self.send_message(message)

        # try:
        #     self._rounds = 5
        #     for i in range(1, self._rounds + 1) and self.break_loop == False:
        #         print('round', i)
        #         await self.round_start(i)
        #         await self.reset_players()
        #         self.active = True 
        #         await asyncio.sleep(4)
        #         try:
        #             await asyncio.gather(self.game_loop(), self.sending())
        #         except Exception as e:
        #             self.active = False
        #             await self.round_over()
        #     # print('game over')
        #     await self.game_over()
        # except asyncio.CancelledError:
        #     print('cancelled')
        #     self.active = False
        #     self.break_loop = True
        #     self.task = None
        #     self._rounds = 0




