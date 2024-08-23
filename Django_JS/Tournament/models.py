from django.db import models

# Create your models here.

class Tournament(models.Model):
    name = models.CharField(max_length=255)
    # start_date = models.DateField()
    # end_date = models.DateField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    num_players = models.IntegerField(choices=[(4, '4 Players'), (8, '8 Players'), (16, '16 Players')])

    def __str__(self):
        return self.name

class Stage(models.Model):
    STAGE_CHOICES = [
        ('ROUND_16', 'Round of 16'),
        ('QUARTERFINALS', 'Quarterfinals'),
        ('SEMIFINALS', 'Semifinals'),
        ('FINAL', 'Final'),
    ]
    
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='stages')
    stage_type = models.CharField(max_length=20, choices=STAGE_CHOICES)
    # date = models.DateField()
    date = models.DateTimeField()
    ready_to_play = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.get_stage_type_display()} - {self.date}"

class Player(models.Model):
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE, related_name='players', null=True, blank=True)
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

# class Tournament(models.Model):
#     name = models.CharField(max_length=100)
#     players = models.ManyToManyField(Player, through='PlayerTournament', related_name='tournaments')
#     def __str__(self):
#         return self.name

# class PlayerTournament(models.Model):
#     player = models.ForeignKey(Player, on_delete=models.CASCADE)
#     tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
#     date_joined = models.DateField(auto_now_add=True)
#     # def __str__(self):
#     #     return self.date_joined