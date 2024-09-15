from rest_framework import serializers
from .models import GamePlay , GameHestory
from Player.Serializers.PlayerSerializer import DefaultPlayerSerializer


class GamePlaySerializer(serializers.ModelSerializer):
    class Meta:
        model = GamePlay
        fields = ["id", "board", "board_color", "first_racket_color", "second_racket_color", "ball_color", "player"]

class GameHestorySerializer(serializers.ModelSerializer):
    player = DefaultPlayerSerializer(required=False)
    opponent_player = DefaultPlayerSerializer(required=False)
    class Meta:
        model = GameHestory
        fields = ["id", "time", "player_score", "opponent_score", "result", "player", "opponent_player"]