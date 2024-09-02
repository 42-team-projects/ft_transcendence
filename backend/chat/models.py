from django.db import models
# from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
    
    
class Conversation(models.Model):
    """
    Represents a conversation between users.

    Attributes:
        participants (ManyToManyField): The users involved in the conversation.
        title (CharField): The title of the conversation, must be unique.
        created_at (DateTimeField): The date and time when the conversation was created.

    Methods:
        __str__(): Returns a string representation of the conversation.
        get_all_messages(): Retrieves all messages related to this conversation.
    """
    
    # STATUS_CHOICES = [
    #     ('C', 'Chat'),
    #     ('G', 'Group')
    # ]
    # status = models.CharField(
    #     max_length=1,
    #     choices=STATUS_CHOICES
    # ) 
    
    participants    = models.ManyToManyField(User, related_name='conversations', blank=False)
    title           = models.CharField(max_length=255, blank=True, unique=True)
    # name            = models.CharField(max_length=255, blank=False, unique=False)
    created_at      = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    @property
    def group_name(self):
        """ generate name for chat conversation
        """
        return f'chat_{self.title}'
    
    def add_participant(self, user):
        if not user in self.participants.all():
            self.participants.add(user)
            self.save()

    def remove_participant(self, user):
        if user in self.participants.all():
            self.participants.remove(user)
            self.save()
    
    def get_all_messages(self):
        return self.messages


class MessageManager(models.Manager):
    def by_title(self, title):
        """
        Retrieves all conversations with the specified title.

        Args:
            title (str): The title of the conversation to filter by.

        Returns:
            QuerySet: A QuerySet containing all conversations that match the given title.
        """
        qs = Conversation.objects.filter(title=title)
        return qs
    
class Message(models.Model):
    """
    Represents a message sent by a user in a conversation.

    Attributes:
        user (ForeignKey): The user who sent the message.
        conversation (ForeignKey): The conversation to which the message belongs.
        content (TextField): The content of the message.
        sent_at (DateTimeField): The date and time when the message was sent.
        
    Methods:
        __str__(): Returns a string representation of the message.
    """
    user            = models.ForeignKey(User, blank=True, on_delete=models.CASCADE)
    conversation    = models.ForeignKey(Conversation, related_name='messages', blank=True, on_delete=models.CASCADE)
    content         = models.TextField(unique=False, blank=False)
    sent_at         = models.DateTimeField(auto_now_add=True)
    
    objects = MessageManager()
        
    def __str__(self):
        return f'{self.user.username} sent a message to conversation {self.conversation.title}'


