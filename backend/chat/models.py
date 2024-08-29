from django.db import models
# from django.core.exceptions import ValidationError
from django.contrib.auth.models import User



class Conversation(models.Model):
    STATUS_CHOICES = [
        ('C', 'Chat'),
        ('G', 'Group')
    ]
    status = models.CharField(
        max_length=1,
        choices=STATUS_CHOICES
    ) 
    participants = models.ManyToManyField(User, related_name='users')
    conversation_name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.conversation_name

    def get_all_messages(self):
        return self.messages


    
class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sent_at = models.DateTimeField(auto_now_add=True)
        
    def __str__(self):
        return f'{self.sender.username} send message to conversation {self.conversation.conversation_name}'
    


