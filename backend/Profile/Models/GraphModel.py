from django.db import models
from .StatsModel import Stats

class Graph(models.Model):
    label = models.CharField(max_length=100)
    value = models.IntegerField()
    # stats = models.ForeignKey(Stats, on_delete=models.CASCADE, related_name='graph')
    def __str__(self):
        return self.label