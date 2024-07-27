from django.db import models

# Create your models here.

class Player(models.Model):
    username = models.CharField(max_length=200)
    picture = models.URLField(max_length=200)

    def __str__(self):
        return self.username