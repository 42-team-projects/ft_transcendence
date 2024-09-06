from django.urls import path
from .Views import PlayerView, StatsView, GraphView, AchievementsView, LinksView

urlpatterns = [
    # recieve and create user ("GET", "POST")
    path('',PlayerView.getPlayer, name='getPlayer'),
    path('search/', PlayerView.searchForPlayers, name='searchForPlayers'),
    path('<int:playerId>/',PlayerView.getPlayerById, name='getPlayerById'),
    path('<str:username>/', PlayerView.findPlayerByUserName, name='findPlayersByUserName'),


    path('stats/',StatsView.getPlayerStats, name='getPlayerStats'),

    path('stats/graph/',GraphView.getPlayerStatsGraph, name='getPlayerStatsGraph'),


    path('achievements/',AchievementsView.getPlayerAchievements, name='getPlayerAchievements'),
    path('achievements/count/',AchievementsView.coutPlayerAchievements, name='coutPlayerAchievements'),
    path('achievements/<int:achievementId>/',AchievementsView.getPlayerAchievementById, name='getPlayerAchievementById'),
  

    path('links/',LinksView.getPlayerLinks, name='getPlayerLinks'),
    path('links/count/',LinksView.coutPlayerLinks, name='coutPlayerLinks'),
    path('links/<int:linkId>/',LinksView.getPlayerLinkById, name='getPlayerLinkById'),
  

]
