from django.urls import path
from . import views

urlpatterns = [
    path('game_play/', views.getGamePlayOfTheCurrentUser, name="getGamePlayOfTheCurrentUser")
]
