from django.contrib import admin
from .Models.UserModel import User
from .Models.UserProfileModel import UserProfile
from .Models.LinksModel import Links
from .Models.StatsModel import Stats
from .Models.GraphModel import Graph
from .Models.AchievementsModel import Achievements

# Register your models here.

admin.site.register(User)
admin.site.register(UserProfile)
admin.site.register(Links)
admin.site.register(Stats)
admin.site.register(Graph)
admin.site.register(Achievements)
