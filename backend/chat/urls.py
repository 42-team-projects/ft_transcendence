from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<str:room_name>/messages/', views.message_list_view, name='message_list'),
    path('start_tournament/', views.start_tournament, name='start_tournament'),
]
