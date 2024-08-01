from django.db import models
import uuid


# Create your models here.

class Player(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Tournament(models.Model):
    tournament_id = models.CharField(max_length=10, unique=True, editable=False)
    tournament_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    number_of_players = models.IntegerField(choices=[(4, '4 Players'), (8, '8 Players'), (16, '16 Players')])
    is_accessible = models.BooleanField(default=True)
    access_password = models.IntegerField(null=True, blank=True)

    players = models.ManyToManyField(Player, related_name='tournaments')

    can_join = models.BooleanField(default=True) # if any palyers join in tournament i need to check if tournament is full or not and check datetime of tournament

    def save(self, *args, **kwargs):
        if not self.tournament_id:
            self.tournament_id = str(uuid.uuid4().int)[:10]
        if self.is_accessible:
            self.access_password = None
        super(Tournament, self).save(*args, **kwargs)
    def __str__(self):
        return self.tournament_name