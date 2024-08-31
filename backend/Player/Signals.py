# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .Models.PlayerModel import Player
from .Models.StatsModel import Stats

@receiver(post_save, sender=Player)
def create_stats_for_player(sender, instance, created, **kwargs):
    if created:
        Stats.objects.create(player=instance)