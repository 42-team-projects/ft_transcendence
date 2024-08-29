from django.db import models
from .UserModel import User
from .StatsModel import Stats

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    stats = models.OneToOneField(Stats, on_delete=models.CASCADE, related_name='profile')
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    joinDate = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.user.name