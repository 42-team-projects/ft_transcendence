from django.db import models
# Create your models here.

class Player(models.Model):
    username = models.CharField(max_length=100)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=225)
    def __str__(self):
        return self.username