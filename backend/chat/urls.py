# from django.urls import path
# from . import views

from django.urls import path, re_path, include
from . import views as chat_views
from django.contrib.auth.views import LoginView, LogoutView
# from .routing import *



urlpatterns = [
    path('messages/', chat_views.messages, name='conversation-messages'),
    path('conversation_list/', chat_views.conversation_list, name='conversation-list'),
    # path('mark_as_read/<str:conversation_name>/', chat_views.mark_messages_as_read, name='mark_messages_as_read'),
    

    
    # path('block/', chat_views.block_user, name='block-user'),
    # path('unblock/', chat_views.unblock_user, name='unblock-user'),
    
    # path('group_conversation_list/', chat_views.group_conversation_list, name='group_conversation_list'),
    

    
    path('user1/', chat_views.user1, name='user1'),
    path('user2/', chat_views.user2, name='user2'),
    
    # path('group_conversation/', chat_views.group_conversation, name='group-conversation'),
]
