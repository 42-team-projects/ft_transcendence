from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Notification(models.Model):
    user = models.ForeignKey(User, related_name='notifications', on_delete=models.CASCADE)
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Notification for {self.user.username}: {self.content}'

    class Meta:
        ordering = ['-create_at']
        
    def mark_as_read(self):
        self.is_read = True
        self.save()