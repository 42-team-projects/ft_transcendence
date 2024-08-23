from django.db import models
import datetime

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Stats(models.Model):
    win = models.IntegerField()
    loss = models.IntegerField()
    rank = models.IntegerField()
    league = models.CharField(max_length=100)

    def __str__(self):
        return self.league

class Graph(models.Model):
    label = models.CharField(max_length=100)
    value = models.IntegerField()
    stats = models.ForeignKey(Stats, on_delete=models.CASCADE, related_name='graph')
    def __str__(self):
        return self.label


class User_Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    stats = models.OneToOneField(Stats, on_delete=models.CASCADE, related_name='profile')
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    joinDate = models.DateField(default=datetime.date.today)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.user.name

class Links(models.Model):
    title = models.CharField(max_length=100)
    url = models.URLField()
    user_profile = models.ForeignKey(User_Profile, on_delete=models.CASCADE, related_name='links')


    def __str__(self):
        return self.title

class Achievements(models.Model):
    name = models.CharField(max_length=100)
    img = models.URLField()
    user_profile = models.ForeignKey(User_Profile, on_delete=models.CASCADE, related_name='achievements')

    def __str__(self):
        return self.name