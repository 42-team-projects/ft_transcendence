from django.urls import path
from accounts import views

urlpatterns = [
    path('players/', views.ListPlayer.as_view()),
    path('players/<int:pk>/', views.whoami),
]
