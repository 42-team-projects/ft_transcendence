from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name='index'),
    path("List_Tournaments/", views.List_Tournaments, name="List_Tournaments"),
    path('<int:id>/', views.get_tournament_by_id, name='get_tournament_by_id'),
    path('create/', views.create_tournament, name='create_tournament'),
    path('List_Players/', views.List_Players, name='List_Players'),

]

