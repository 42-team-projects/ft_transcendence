# from django.urls import path
# from . import views

from django.urls import path, re_path, include
from . import views as chat_views
from django.contrib.auth.views import LoginView, LogoutView
# from .routing import *



urlpatterns = [
    path('', chat_views.chat, name='chat'),
    path('conversations/', chat_views.get_all_conversations, name='conversations'),
    path('<str:conversation_name>/', chat_views.get_all_messages, name='messages'),
    path('last_message/<str:conversation_name>/', chat_views.last_message, name='last_message'),
]
