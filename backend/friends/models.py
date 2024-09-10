from django.db import models
from accounts.models import User

class Friendship(models.Model):
    user = models.OneToOneField(User, related_name='user', on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, blank=True, related_name='friends')
    create_at = models.TimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} friends"
    
    def add_user(self, friend):
        """Add user to friend list

        Args:
            friend (User): friend to add in friend list.
        """
        if not friend in self.friends.all():
            self.friends.add(friend)

    def remove_user(self, friend):
        """remove user from friend list

        Args:
            friend (User): friend to remove from friend list.
        """
        if friend in self.friends.all():
            self.friends.remove(friend)
            
    def unfriend(self, friend):
        """unfreind user from friendship

        Args:
            friend (User): friend to unfriend from friendship
        """
        self.remove_user(friend)
        friend_list = Friendship.objects.get(user=friend)
        friend_list.remove_user(self.user)

    def is_my_friend(self, user):
        """check is user my friend

        Args:
            user (User): is user my friend 

        Returns:
            bool: true if user is my friend otherwase false
        """
        if user in self.friends.all():
            return True
        return False



class FriendRequest(models.Model):
    sender = models.ForeignKey(User, related_name="sender_friend_request", on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name="receiver_friend_request", on_delete=models.CASCADE)
    is_active = models.BooleanField(blank=True, null=False, default=True)
    create_at = models.TimeField(auto_now_add=True)

    class Meta:
        unique_together = ['sender', 'receiver']

    def __str__(self):
        return f"{self.sender.username} send friend request to {self.receiver.username}" 
    
    def accept(self):
        """Accepts the current friend request and updates the friendship status between the sender and receiver.

        This method performs the following actions:
        1. Retrieves the `Friend` instance associated with the receiver of the friend request and adds the sender to the receiver's friends list.
        2. Retrieves the `Friend` instance associated with the sender of the friend request and adds the receiver to the sender's friends list.
        3. Marks the current friend request as inactive by setting `self.is_active` to `False` and saves the updated state.

        
        Notes:
            - The method assumes that `self.receiver` and `self.sender` are valid user instances and that `Friend` is a model managing user friendships.
        """
        friends, _ = Friendship.objects.get_or_create(user=self.receiver)
        friends.add_user(self.sender)
        
        friends, _ = Friendship.objects.get_or_create(user=self.sender)
        friends.add_user(self.receiver)
        self.is_active = False
        self.save()
    
    def decline(self):
        """
        Marks the friend request as declined by setting the `is_active` field to False and saves the instance.

        This method is intended to be used by the receiver of the friend request to decline it.
        """
        self.is_active = False
        self.save()

    def cancel(self):
        """
        Marks the friend request as canceled by setting the `is_active` field to False and saves the instance.

        This method is intended to be used by the sender of the friend request to cancel the request.
        """
        self.is_active = False
        self.save()


# class BlockUser(models.Model):
#     blocked = models.ForeignKey(User, related_name='blocked', on_delete=models.CASCADE)
#     blocker = models.ManyToManyField(User, on_delete=models.CASCADE)
#     # blocker = models.ForeignKey(User, related_name='blocker', on_delete=models.CASCADE)
#     create_at = models.TimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.blocked.username} Block {self.blocker.username}" 

#     def is_blocked(self, user):
#         if user in self.blocker.all():
#             return True
#         return False
    

#     def remove_friendship(self):
#         Friendship.objects.get(user=self.blocked).unfriend(self.blocker)


