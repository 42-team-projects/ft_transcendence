from django.db import models
from .PlayerModel import Player

class Links(models.Model):
    title = models.CharField(max_length=100)
    url = models.URLField()
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='links')

    def __str__(self):
        return self.title