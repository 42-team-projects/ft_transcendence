from django.db import models
from accounts.models import User
from .StatsModel import Stats

class Player(models.Model):
    # player = models.OneToOneField(User, on_delete=models.CASCADE, related_name='player')
    fullName = models.CharField(max_length=255, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    cover = models.ImageField(upload_to='covers/', null=True, blank=True)
    joinDate = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=False)
    stats = models.OneToOneField(Stats, on_delete=models.CASCADE, related_name='stats', null=True, blank=True)

    def __str__(self):
        return self.fullName