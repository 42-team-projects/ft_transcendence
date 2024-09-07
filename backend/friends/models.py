from django.db import models
from accounts.models import User

# Create your models here.

class Friendship(models.Model):
    user = models.OneToOneField(User, related_name='user', on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, blank=True, related_name='friends')
    create_at = models.TimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} friends"
    
    def add_user(self, user):
        """ Add user to friends

        Args:
            user (User): user to add to friends.
        """
        if not user in self.friends.all():
            self.friends.add(user)

    def remove_user(self, user):
        """ remove user from friends

        Args:
            user (User): user to remove from friends.
        """
        if user in self.friends.all():
            self.friends.remove(user)
            
    # def unfriend(self, user):
    #     """ unfreind user

    #     Args:
    #         user (User): user to unfriend
    #     """
    #     self.remove_user(user)

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
    
    sender = models.ForeignKey(User, related_name="sender", on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name="receiver", on_delete=models.CASCADE)
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

        Raises:
            Friend.DoesNotExist: If either the receiver or sender does not have a corresponding `Friend` instance in the database.
        
        Notes:
            - The method assumes that `self.receiver` and `self.sender` are valid user instances and that `Friend` is a model managing user friendships.
        """
        try:
            friends, _ = Friendship.objects.get_or_create(user=self.receiver)
            friends.add_user(self.sender)
            
            friends, _ = Friendship.objects.get_or_create(user=self.sender)
            friends.add_user(self.receiver)
            self.is_active = False
            self.save()
        except Friendship.DoesNotExist as e:
            print(str(e))
    
    def decline(self):
        """Declines the current friend request and marks it as inactive.

        This method sets the `is_active` attribute of the current friend request to `False` 
        and saves the updated state to the database. This action indicates that the request 
        has been declined and is no longer active.

        Notes:
            - This method only updates the status of the current friend request and does not affect 
            the friendship status of the sender or receiver.
        """
        self.is_active = False
        self.save()
        
    def cancel(self):
        self.decline()
    

        
        
    
    

# class UserBlock(models.Model):
#     blocked = models.ForeignKey(User, related_name='blocked', on_delete=models.CASCADE)
#     blocker = models.ForeignKey(User, related_name='blocker', on_delete=models.CASCADE)
#     create_at = models.TimeField(auto_now_add=True)
    
    
