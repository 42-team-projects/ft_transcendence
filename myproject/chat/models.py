from django.db import models

# Create your models here.


class ChatList(models.Model):
    pass
    # sender_id = models.ForeignKey(User, unique=True, null=True)
    # receiver_id = models.ForeignKey(User, unique=True, null=True)
    # friend_id = models.IntegerField()
    # receiver_id = models.IntegerField()
    # content = models.TextField()
    # date = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return f"receiver is = {self.receiver_id}"
    



class Chat(models.Model):
    # sender_id = models.ForeignKey(User, unique=True, null=True)
    # receiver_id = models.ForeignKey(User, unique=True, null=True)
    sender_id = models.IntegerField()
    receiver_id = models.IntegerField()
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"receiver is = {self.receiver_id}"
