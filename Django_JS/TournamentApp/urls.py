from django.urls import path
from . import views

urlpatterns = [
    path("launch_tournament/", views.launch_tournament_test, name='launch_tournament_test'),
    path("", views.index, name='index'),
    path("list_tournaments/", views.list_tournaments, name="list_tournaments"),
    path('<int:id>/', views.get_tournament_by_id, name='get_tournament_by_id'),
    path('create/', views.create_tournament, name='create_tournament'),
#     path('List_Players/', views.List_Players, name='List_Players'),
    path('player/<int:player_id>/', views.get_tournaments_by_player_id, name='get_tournaments_by_player_id'),
    path('available_tournaments/', views.get_available_tournaments, name='get_available_tournaments'),
#     path('player_leave_tournament/', views.player_leave_tournament, name='player_leave_tournament'),
    
    path('tournament/<int:tournamentId>/player/<int:playerId>/', views.player_join_tournament, name='player_join_tournament'),
]
