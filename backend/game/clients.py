from datetime import datetime
import json
import asyncio

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
        await ws.send_message(message, 'game_message')


    async def rounds_loop(self):
        self._rounds = 5
        for i in range(1, self._rounds + 1):
            await self.round_start(i)
            await self.reset_players()
            self.active = True
            await asyncio.sleep(4)
            self.sending_task = asyncio.create_task(self.sending(i))
            try:
                await self.game_loop()
            except Exception as e:
                self.active = False
                self.sending_task.cancel()
                if(i != self._rounds):
                    await self.round_over()


    async def main(self): 
        try:
            await self.rounds_loop()
            await self.game_over()
        except asyncio.CancelledError:
            print('task cancelled')
            if self.opponent:
                await self.close_socket(self.controler)
            if self.controler:
                await self.close_socket(self.opponent)


    async def sending(self, i):
        # print('sending' , self.active)
        try:
            # start time
            current_time = datetime.now()
            while True:
                print('sending', i)
                await self.send_message(self.ball_data)
                await asyncio.sleep(0.05)
        except asyncio.CancelledError:
            # end time
            print('time taken', datetime.now() - current_time)
            print('sending cancelled')
            raise


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
        while self.active and self.break_loop == False:
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
                    'id': self.opponent.id,
                    'ball_x':  canvas_width - ball_x,
                    'ball_dx': -ball_dx,

                },
                'player_2': {
                    'id': self.controler.id,
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
            await self.controler.channel_layer.group_send(
                self.controler.room_group_name,
                {
                    'type': 'game_message',
                    'message': message
                }
            )
        if self.opponent:
            await self.opponent.channel_layer.group_send(
                self.opponent.room_group_name,
                {
                    'type': 'game_message',
                    'message': message
                }
            )





    def get_players(self):
        return self.controler, self.opponent
        
    async def close_socket(self, ws):
        print('closing')
        try:
            if ws == self.controler:
                await self.opponent.close()
                # self.opponent = None
            else:
                await self.controler.close()
                # self.controler = None
        except Exception as e:
            print(e)
        # end task of main


    async def reset_players(self):
        self.controler.y = self.canvas_height / 2
        self.opponent.y = self.canvas_height / 2

    async def game_over(self):
        if self.controler and self.opponent:
            message = {
                'status': 'GameOver',
                'player_1': {
                    'id': self.controler.id, 'game_state': 'win' if self.controler.score > self.opponent.score else 'lose'
                },
                'player_2': {
                    'id': self.opponent.id, 'game_state': 'win' if self.opponent.score > self.controler.score else 'lose'
                }
            }
        elif self.controler:
            message = {
                'status': 'GameOver',
                'player_1': {
                    'id': self.controler.id, 'game_state': 'win'
                },
            }
        elif self.opponent:
            message = {
                'status': 'GameOver',
                'player_1': {
                    'id': self.opponent.id, 'game_state': 'win'
                }
            }
        await self.send_message(message)
        self.active = False
        self.task.cancel()
        self.task = None





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




