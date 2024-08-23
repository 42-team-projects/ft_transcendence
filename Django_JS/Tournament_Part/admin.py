from django.contrib import admin
from .models import Game, Player, Tournament, TournamentPlayer
# Register your models here.
admin.site.register(Game)
admin.site.register(Player)
admin.site.register(Tournament)
admin.site.register(TournamentPlayer)