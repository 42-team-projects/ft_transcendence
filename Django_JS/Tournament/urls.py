from django.urls import path
from . import views

urlpatterns = [
    # path("", views.index, name='index'),
    path("create_tournament/", views.create_tournament, name='create_tournament'),
    path("create_player/", views.create_player, name='create_player'),
    path("List_Players/", views.List_Players, name='List_Players'),
    path("List_Tournament/", views.List_Tournament, name='List_Tournament'),

    # path('check_relationship/', views.check_relationship, name='check'),
    # path('create/', views.create, name='create')
]