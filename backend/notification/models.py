from django.db import models
# from django.contrib.auth.models import User
from accounts.models import User

# Create your models here.


class Notification(models.Model):
    user = models.ForeignKey(User, related_name='notifications', on_delete=models.CASCADE)
    content = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Notification for {self.user.username}: {self.content}'


