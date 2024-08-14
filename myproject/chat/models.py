from django.db import models
# from django.core.exceptions import ValidationError

class User(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Conversation(models.Model):
    users = models.ManyToManyField(User, related_name='users')
    conversation_name = models.CharField(max_length=255, unique=True)
    # last_message = models.ForeignKey(Message, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.conversation_name

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    sent_at = models.DateTimeField(auto_now_add=True)

    # def save(self, *args, **kwargs):
    #     conv = Conversation.objects.filter(users=self.sender ,conversation_name=self.conversation.conversation_name)
    #     if not conv:
    #         raise ValidationError(f"{self.sender.name} is not part of the conversation {self.conversation.conversation_name}.")
    #     super().save(*args, **kwargs)
    def __str__(self):
        return f'{self.sender.name} send message to conversation {self.conversation.conversation_name}'

