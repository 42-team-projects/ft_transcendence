# from django.urls import path
# from . import views

from django.urls import path, re_path, include
from . import views as chat_views
from django.contrib.auth.views import LoginView, LogoutView
# from .routing import *



urlpatterns = [
    path('conversation/', chat_views.get_chat_conversation, name='get_chat_conversation'),
    path('chat_conversations/', chat_views.chat_conversations, name='chat_conversations'),
    path('group_conversations/', chat_views.group_conversations, name='group_conversations'),
    
    
    
    
    
    
    path('chat_conversation/', chat_views.chat_conversation, name='chat-conversation'),
    path('group_conversation/', chat_views.group_conversation, name='group-conversation'),
]
