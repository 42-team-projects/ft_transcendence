from django.db import models

# Create your models here.

from django.db import models
from game.models import Player
import uuid

# Create your models here.

class Tournament(models.Model):
    tournament_id = models.CharField(max_length=10, unique=True, editable=False)
    tournament_name = models.CharField(max_length=255)
    start_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    number_of_players = models.IntegerField(choices=[(4, '4 Players'), (8, '8 Players'), (16, '16 Players')])
    is_accessible = models.BooleanField(default=True)
    access_password = models.CharField(null=True, blank=True, max_length=255)
    owner = models.ForeignKey(Player, on_delete=models.CASCADE, blank=True, null=True)


    players = models.ManyToManyField(Player, related_name='tournaments', blank=True)

    can_join = models.BooleanField(default=True) # if any palyers join in tournament i need to check if tournament is full or not and check datetime of tournament

    def save(self, *args, **kwargs):
        if not self.tournament_id:
            self.tournament_id = str(uuid.uuid4().int)[:10]
        if self.is_accessible:
            self.access_password = None
        super(Tournament, self).save(*args, **kwargs)
    def __str__(self):
        return self.tournament_name