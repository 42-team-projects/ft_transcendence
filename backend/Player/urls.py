from django.urls import path
from .Views import PlayerView, StatsView, GraphView, AchievementsView, LinksView

urlpatterns = [
    path('search/', PlayerView.searchForPlayers, name='searchForPlayers'),

    path('<int:playerId>/',PlayerView.getPlayerById, name='getPlayerById'),

    # Players - retrieve, create, update, delete
    path('', PlayerView.getAllPlayers, name='getAllPlayers'),  # GET all players

    path('me/', PlayerView.getMyInfo, name='getMyInfo'),  # GET all players
    path('count/', PlayerView.getPlayerCount, name='getPlayerCount'),  # GET player count
    path('<str:username>/', PlayerView.getPlayerByUsername, name='getPlayerByUsername'),  # GET player by username
 

    # Stats - retrieve and update
    path('me/stats/', StatsView.getMyStats, name='getPlayerStats'),  # GET player stats
    path('<str:username>/stats/', StatsView.getPlayerStats, name='getPlayerStats'),  # GET player stats


    path('me/stats/graph/', GraphView.getMyStatsGraph, name='getPlayerStatsGraph'),  # GET player stats graph,  PUT update player stats graph
    path('<str:username>/stats/graph/', GraphView.getPlayerStatsGraph, name='getPlayerStatsGraph'),  # GET player stats graph,  PUT update player stats graph

    # Achievements - retrieve, create, update, delete
    path('me/achievements/', AchievementsView.getMyAchievements, name='getMyAchievements'),  # GET all achievements of a player

    path('<str:username>/achievements/', AchievementsView.getPlayerAchievements, name='getPlayerAchievements'),  # GET all achievements of a player
    path('<str:username>/achievements/count/', AchievementsView.countPlayerAchievements, name='countPlayerAchievements'),  # GET count of player achievements
    path('<str:username>/achievements/<int:achievementId>/', AchievementsView.getPlayerAchievementById, name='getPlayerAchievementById'),  # GET specific achievement by ID

    # Links - retrieve, create, update, delete
    path('me/links/', LinksView.getMyLinks, name='getMyLinks'),  # GET all links of a player
    path('me/links/<int:linkId>/', LinksView.getMyLinkById, name='getPlayerLinkById'),  # GET specific link by ID

    path('<str:username>/links/', LinksView.getPlayerLinks, name='getPlayerLinks'),  # GET all links of a player
    path('<str:username>/links/count/', LinksView.countPlayerLinks, name='countPlayerLinks'),  # GET count of player links
    path('<str:username>/links/<int:linkId>/', LinksView.getPlayerLinkById, name='getPlayerLinkById'),  # GET specific link by ID


]
