from django.db import models
# from django.contrib.auth.models import User
from accounts.models import User

# Create your models here.


class Notification(models.Model):
    sender = models.ForeignKey(User, related_name='sender_notification', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='receiver_notification', on_delete=models.CASCADE)
    content = models.TextField()
    type = models.CharField(max_length=255, null=True)
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Notification for {self.receiver.username}: {self.content}'


