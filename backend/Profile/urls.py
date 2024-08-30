from django.urls import path
from .Views import PlayerView, StatsView

urlpatterns = [
    # recieve, create user ("GET", "POST")
    path('',PlayerView.getAllPlayers, name='getAllUsersProfile'),
    # number of users ("GET")
    path('count/',PlayerView.countPlayers, name='countUsersProfile'),
    # recieve, update, delete user ("GET", "PUT", "DELETE")
    path('<int:id>/',PlayerView.getPlayerById, name='getUserProfileById'),


    # path('<int:id>/stats/',StatsView.getUserStats, name='getUserStats'),
    # path('<int:id>/stats/count/',StatsView.countUserStats, name='countUserStats'),
  

]
