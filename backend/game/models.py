from django.db import models
from Player.Models.PlayerModel import Player

class GamePlay(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player', null=True)
    board = models.IntegerField(default=0)
    board_color = models.CharField(max_length=10, default='#00fffc')
    first_racket_color = models.CharField(max_length=10, default='#FFFFFF')
    second_racket_color = models.CharField(max_length=10, default='#000000')
    ball_color = models.CharField(max_length=10, default='#CCCCCC')

    def __str__(self):
        return str(self.player.user.username)
    

