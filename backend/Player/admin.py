from django.contrib import admin
from .Models.PlayerModel import Player, Nickname
from .Models.LinksModel import Links
from .Models.StatsModel import Stats
from .Models.GraphModel import Graph
from .Models.AchievementsModel import Achievements

# Register your models here.

admin.site.register(Player)
admin.site.register(Links)
admin.site.register(Stats)
admin.site.register(Graph)
admin.site.register(Achievements)
admin.site.register(Nickname)

