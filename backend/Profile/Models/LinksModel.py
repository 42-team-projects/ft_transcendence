from django.db import models
from .UserProfileModel import UserProfile

class Links(models.Model):
    title = models.CharField(max_length=100)
    url = models.URLField()
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='links')

    def __str__(self):
        return self.title