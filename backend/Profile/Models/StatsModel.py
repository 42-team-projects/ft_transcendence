from django.db import models

class Stats(models.Model):
    win = models.IntegerField()
    loss = models.IntegerField()
    rank = models.IntegerField()
    league = models.CharField(max_length=100)

    def __str__(self):
        return self.league