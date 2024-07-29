import json
class GameRoom :
    def __init__(self, client1, client2):
        self.client1 = client1
        self.client2 = client2
        self.room_name = f"{client1.id}-{client2.id}_room"
    def find_opponent(self):
        message = {
            'room_name': self.room_name,
            'opponent_id': self.client2.id
        }
        self.client1.ws.send(json.dumps(message))
        message['opponent_id'] = self.client1.id
        self.client2.ws.send(json.dumps(message))
    def sendData(self, data, ws):
        y = data.get('position', None)
        print("position : ", y)
        if ws == self.client1.ws:
            print("sending data to client2")
            self.client2.ws.send(json.dumps({'position' : y}))
            # self.client1.ws.send(json.dumps({'message' : 'your y position is go to client2'}))
        else:
            print("sending data to client1")
            self.client1.ws.send(json.dumps({'position' : y}))

class Client :
    def __init__(self, ws, id):
        self.ws = ws
        self.id = id
