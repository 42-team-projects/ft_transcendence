from django.contrib import admin
from .models import  User_Profile, Links, Stats, Graph, Achievements

# Register your models here.

admin.site.register(User_Profile)
admin.site.register(Links)
admin.site.register(Stats)
admin.site.register(Graph)
admin.site.register(Achievements)
