from django.db import models
from .PlayerModel import Player

class Achievements(models.Model):
    name = models.CharField(max_length=100)
    img = models.URLField()
    user_profile = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='achievements')

    def __str__(self):
        return self.name