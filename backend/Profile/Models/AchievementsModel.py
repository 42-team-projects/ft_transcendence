from django.db import models
from .UserProfileModel import UserProfile

class Achievements(models.Model):
    name = models.CharField(max_length=100)
    img = models.URLField()
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='achievements')

    def __str__(self):
        return self.name