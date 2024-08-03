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

    def find_opponent(self):
        message = {
            'room_name': self._room_name,
            'opponent_id': self._client2.id
        }
        self._client1.ws.send(json.dumps(message))
        message['opponent_id'] = self._client1.id
        self._client2.ws.send(json.dumps(message))
    def game_loop(self):
        canvas_width = 300
        canvas_height = 150
        ball_x = canvas_width / 2
        ball_y = canvas_height / 2
        ball_radius = 0.1
        ball_dx = 0.1
        ball_dy = 0.1
        player1_y = canvas_height / 2
        player2_y = canvas_height / 2
        racquet_width = 2
        racquet_height = 25
        while True:
            ball_x += ball_dx
            ball_y += ball_dy
            if ball_x + ball_radius >= canvas_width or ball_x - ball_radius <= 0 :
                break
            if ball_y + ball_radius >= canvas_height or ball_y - ball_radius <= 0:
                ball_dy = -ball_dy
            if ball_x - ball_radius <= racquet_width and ball_y >= player1_y and ball_y <= player1_y + racquet_height:
                ball_dx = -ball_dx
            if ball_x + ball_radius >= canvas_width - racquet_width and ball_y >= player2_y and ball_y <= player2_y + racquet_height:
                ball_dx = -ball_dx
            
            data1 = {
                'ball': {
                    'x': ball_x,
                    'y': ball_y,
                    'radius': ball_radius,
                },
                'racquet': {
                    'player_y': player1_y,
                    'opponent_y': player2_y,
                    'racquet_width': racquet_width,
                    'racquet_height': racquet_height,
                },
            }
            data2 = {
                'ball': {
                    'x': canvas_width - ball_x,
                    'y': ball_y,
                    'radius': ball_radius,
                },
                'racquet': {
                    'player_y': player2_y,
                    'opponent_y': player1_y,
                    'racquet_width': racquet_width,
                    'racquet_height': racquet_height,
                },
            }
            self.sendData(data1, self._client1.ws)
            self.sendData(data2, self._client2.ws)
            asyncio.sleep(0.16)
    def sendData(self, data, ws):
        if ws == self._client1.ws:
            # print("sending data to client2")
            self._client2.ws.send(json.dumps(data))
        else:
            # print("sending data to client1")
            self._client1.ws.send(json.dumps(data))
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
class Client :
    def __init__(self, ws, id):
        self.ws = ws
        self.id = id
