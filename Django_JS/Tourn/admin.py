from django.contrib import admin
from .models import  Tournament, Stage, Player
# Register your models here.

admin.site.register(Player)
admin.site.register(Tournament)
admin.site.register(Stage)
