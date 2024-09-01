from django.db import models

class Graph(models.Model):
    skill = models.IntegerField(default=0)
    speed = models.IntegerField(default=0)
    accuracy = models.IntegerField(default=0)
    defense = models.IntegerField(default=0)
    offense = models.IntegerField(default=0)
    consistency = models.IntegerField(default=0)
    Strategy = models.IntegerField(default=0)


    def __str__(self):
        return "Graph"