from django.db import models
from chat.models import User
# Create your models here.


class Notification(models.Model):
    sender = models.ForeignKey(User, related_name="sender", on_delete=models.CASCADE)
    receiver = models.ManyToManyField(User, related_name="receivers")
    content = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)
        
    
    def __str__(self):
        return self.sender.name
    