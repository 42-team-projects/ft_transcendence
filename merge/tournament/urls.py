from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("list_tournaments/", views.list_tournaments, name="list_tournaments"),
    path('tournament/<int:tournamentId>/player/<int:playerId>/', views.player_join_tournament, name='player_join_tournament'),
    path('SetStartDate/', views.SetStartDate, name='SetStartDate'),
    path('tournament/<int:tournamentId>/', views.get_tournament_by_id, name='get_tournament_by_id'),

]

