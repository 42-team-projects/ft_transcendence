from django.db import models
from accounts.models import User

class Notification(models.Model):
    sender = models.ForeignKey(User, related_name='sender_notification', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='receiver_notification', on_delete=models.CASCADE)
    content = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Notification for {self.receiver.username}: {self.content}'


