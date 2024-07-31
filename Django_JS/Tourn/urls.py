from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name='index'),
    path("List_Tournaments/", views.List_Tournaments, name="List_Tournaments"),
    path('<int:id>/', views.get_tournament_by_id, name='get_tournament_by_id'),
    path('create/', views.create_tournament, name='create_tournament'),
    path('List_Players/', views.List_Players, name='List_Players'),
    path('player/<int:player_id>/', views.get_tournaments_by_player_id, name='get_tournaments_by_player_id'),
    path('Available_Tournaments/', views.get_Available_Tournaments, name='get_Available_Tournaments'),
    path('Player_Join_Tournament/', views.Player_Join_Tournament, name='Player_Join_Tournament'),
    path('player_leave_tournament/', views.player_leave_tournament, name='player_leave_tournament'),
    

]

