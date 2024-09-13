from django.urls import path
from . import views

urlpatterns = [
    path('game_play/', views.getGamePlayOfTheCurrentUser, name="getGamePlayOfTheCurrentUser"),
    path('game_history/', views.getGameHestoryByUserName, name="getGameHestoryByUserName")
]
