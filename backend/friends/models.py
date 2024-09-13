from django.db import models
from accounts.models import User


class Friendship(models.Model):
    user = models.OneToOneField(User, related_name='user', on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, blank=True, related_name='friends')
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} friends"
    
    def add_friend(self, friend):
        """Add a friend to the user's friend list."""
        if friend != self.user and not self.is_friend(friend):
            self.friends.add(friend)
            return True
        return False

    def remove_friend(self, friend):
        """Remove a friend from the user's friend list."""
        if self.is_friend(friend):
            self.friends.remove(friend)
            return True
        return False

    def unfriend(self, friend):
        """unfreind user from friendship

        Args:
            friend (User): friend to unfriend from friendship
        """
        self.remove_friend(friend)
        friend_list = Friendship.objects.get(user=friend)
        friend_list.remove_friend(self.user)

    def is_friend(self, friend):
        """Check if the given user is a friend."""
        return friend in self.friends.all()

    def get_friends(self):
        """Get all friends of the user."""
        return self.friends.all()

    def count_friends(self):
        """Count the number of friends the user has."""
        return self.friends.count()

    # def mutual_friends(self, other_user):
    #     """Get the mutual friends between the user and another user."""
    #     if self.user == other_user:
    #         return self.get_friends()
    #     return self.get_friends().intersection(other_user.friends.all())

    @classmethod
    def get_friendship(cls, user):
        """Retrieve the friendship instance for a given user."""
        return cls.objects.filter(user=user).first()


class FriendRequest(models.Model):
    sender = models.ForeignKey(User, related_name="sender_friend_request", on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name="receiver_friend_request", on_delete=models.CASCADE)
    is_active = models.BooleanField(blank=True, null=False, default=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['sender', 'receiver']

    def __str__(self):
        return f"Friend Request from {self.sender.username} to {self.receiver.username} - {'Active' if self.is_active else 'Inactive'}"

    def accept(self):
        """Accepts the current friend request and updates the friendship status between the sender and receiver.

        This method performs the following actions:
        1. Retrieves the `Friend` instance associated with the receiver of the friend request and adds the sender to the receiver's friends list.
        2. Retrieves the `Friend` instance associated with the sender of the friend request and adds the receiver to the sender's friends list.
        3. Marks the current friend request as inactive by setting `self.is_active` to `False` and saves the updated state.

        
        Notes:
            - The method assumes that `self.receiver` and `self.sender` are valid user instances and that `Friend` is a model managing user friendships.
        """
        if self.is_active:
            friends, _ = Friendship.objects.get_or_create(user=self.receiver)
            friends.add_friend(self.sender)
            
            friends, _ = Friendship.objects.get_or_create(user=self.sender)
            friends.add_friend(self.receiver)
            self.is_active = False
            self.save()
            return True
        return False

        # friends, _ = Friendship.objects.get_or_create(user=self.receiver)
        # friends.add_user(self.sender)
        
        # friends, _ = Friendship.objects.get_or_create(user=self.sender)
        # friends.add_user(self.receiver)
        # self.is_active = False
        # self.save()

    def reactivate(self):     
        """Reactivate the friend request
        """
        if not self.is_active:
            self.is_active = True
            self.save()
            return True
        return False

    def decline(self):
        """
        Marks the friend request as declined by setting the `is_active` field to False and saves the instance.

        This method is intended to be used by the receiver of the friend request to decline it.
        """
        if self.is_active:
            self.is_active = False
            self.save()
            return True
        return False
        
    def cancel(self):
        """
        Marks the friend request as canceled by setting the `is_active` field to False and saves the instance.

        This method is intended to be used by the sender of the friend request to cancel the request.
        """
        self.is_active = False
        self.save()

    def is_accepted(self):
        """
        Check if the friend request has been accepted.
        
        Since we mark the friend request as inactive when it is accepted or declined, 
        we need to differentiate between these states. In this example, we assume that 
        an accepted request would have an entry in a Friendship model or a similar approach.
        """
        # Assuming the existence of a Friendship model to represent an active friendship
        return not self.is_active and Friendship.objects.filter(user1=self.sender, user2=self.receiver).exists()
    
    def is_pending(self):
        """Check if the friend request is still pending."""
        return self.is_active

    def get_status(self):
        """Get the status of the friend request."""
        return "Pending" if self.is_active else "Accepted" if self.is_accepted() else "Declined"


class BlockUser(models.Model):
    blocker = models.ForeignKey(User, related_name='blocker', on_delete=models.CASCADE)
    blocked = models.ForeignKey(User, related_name='blocked', on_delete=models.CASCADE)
    create_at = models.TimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.blocker.username} Block {self.blocked.username}" 

    # def is_blocked(self, blocker, friend):
    #     """check if current user block his friend

    #     Args:
    #         current: (User) current user
    #     """
    #     if self.blocker == blocker and self.blocked == friend:
    #         return True
    #     return False


