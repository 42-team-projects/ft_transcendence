from django.db import models
from .GraphModel import Graph

class Stats(models.Model):
    win = models.IntegerField(default=0)
    loss = models.IntegerField(default=0)
    rank = models.IntegerField(default=0)
    progress_bar = models.IntegerField(default=0)
    league = models.CharField(max_length=100, default="bronze")
    xp = models.IntegerField(default=0)
    graph = models.OneToOneField(Graph, on_delete=models.CASCADE, related_name='graph', null=True, blank=True)

    # LEAGUES = {
    #     "bronze": 1000,
    #     "silver": 2000,
    #     "gold": 3000,
    #     "platinum": 4000,
    #     "legendary": 6000
    # }

    def __str__(self):
        return self.league
    
    # def save(self, *args, **kwargs):
    #     # Automatically calculate xp as win - loss multiplied by 150
    #     self.xp = (self.win - self.loss) * 150
        
    #     # Rank calculation based on xp (example: 1 rank per 1000 xp)
    #     self.rank = self.xp // 1000

    #     # Update progress_bar based on current xp and next league threshold
    #     for league, xp_threshold in self.LEAGUES.items():
    #         if self.xp < xp_threshold:
    #             self.league = league
    #             self.progress_bar = (self.xp * 100) // xp_threshold  # percentage progress
    #             break

    #     super().save(*args, **kwargs)
