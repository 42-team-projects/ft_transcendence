from django.urls import path
from .Views import PlayerView, StatsView, GraphView, AchievementsView, LinksView

urlpatterns = [
    # recieve, create user ("GET", "POST")
    path('',PlayerView.getAllPlayers, name='getAllPlayers'),
    # number of Players ("GET")
    path('count/',PlayerView.countPlayers, name='countPlayers'),
    # recieve, update, delete user ("GET", "PUT", "DELETE")
    path('<int:id>/',PlayerView.getPlayerById, name='getPlayerById'),


    path('<int:id>/stats/',StatsView.getPlayerStats, name='getPlayerStats'),

    path('<int:id>/stats/graph/',GraphView.getPlayerStatsGraph, name='getPlayerStatsGraph'),


    path('<int:playerId>/achievements/',AchievementsView.getPlayerAchievements, name='getPlayerAchievements'),
    path('<int:playerId>/achievements/count/',AchievementsView.coutPlayerAchievements, name='coutPlayerAchievements'),
    path('<int:playerId>/achievements/<int:achievementId>/',AchievementsView.getPlayerAchievementById, name='getPlayerAchievementById'),
  

    path('<int:playerId>/links/',LinksView.getPlayerLinks, name='getPlayerLinks'),
    path('<int:playerId>/links/count/',LinksView.coutPlayerLinks, name='coutPlayerLinks'),
    path('<int:playerId>/links/<int:linkId>/',LinksView.getPlayerLinkById, name='getPlayerLinkById'),
  

]
