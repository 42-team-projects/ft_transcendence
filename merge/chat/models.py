from django.db import models

# Create your models here.

from django.db import models

class Message(models.Model):
    room_name = models.CharField(max_length=255)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

