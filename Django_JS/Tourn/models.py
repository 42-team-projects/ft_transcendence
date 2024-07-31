from django.db import models
import uuid
# Create your models here.


class Tournament(models.Model):
    tournament_id = models.CharField(max_length=10, unique=True, editable=False)
    tournament_name = models.CharField(max_length=255)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    number_of_players = models.IntegerField(choices=[(4, '4 Players'), (8, '8 Players'), (16, '16 Players')])
    is_accessible = models.BooleanField(null=True, blank=True)
    access_password = models.IntegerField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.tournament_id:
            self.tournament_id = str(uuid.uuid4().int)[:10]
        if self.is_accessible:
            self.access_password = None
        super(Tournament, self).save(*args, **kwargs)
    def __str__(self):
        return self.tournament_name

class Stage(models.Model):
    STAGE_CHOICES = [
        ('ROUND_16', 'Round of 16'),
        ('QUARTERFINALS', 'Quarterfinals'),
        ('SEMIFINALS', 'Semifinals'),
        ('FINAL', 'Final'),
    ]
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='stages')
    stage_type = models.CharField(max_length=20, choices=STAGE_CHOICES)
    stage_datetime = models.DateTimeField()
    is_ready_to_play = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return f"{self.get_stage_type_display()} - {self.stage_datetime}"

class Player(models.Model):
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE, related_name='players', null=True, blank=True)
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
