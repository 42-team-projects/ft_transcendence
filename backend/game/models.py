from django.db import models
# from accounts.models import User
# class Player(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
#     username = models.CharField(max_length=50, default='player')
#     picture = models.ImageField(upload_to='%y/%m/%d/', blank=True)

#     def __str__(self):
#         return self.username

# class Game(models.Model):
#     player_1 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player_1', null=True)
#     player_2 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player_2', null=True)
#     winner = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='winner', default=None)
#     looser = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='looser', default=None)
#     game_name = models.CharField(max_length=50)
#     score_1 = models.IntegerField(default=0)
#     score_2 = models.IntegerField(default=0)
#     date = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return str(self.game_name)