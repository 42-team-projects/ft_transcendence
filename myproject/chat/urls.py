

from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.chat, name='chat')
]


urlpatterns = [
    path('', views.chat, name='chat'),
    
    # path("", views.chatSender, name='chat'),
    
    path("list", views.list, name='list'),
    path("add/", views.add, name='add'),
    path("html/", views.html, name='html'),
    
    
    
    
    
    # path("add/", views.chat_sender_id, name='chat-sender_id'),
    
    # path("chat-list/", views.chat_list, name='chat-list'),
    # path("<int:id>/", views.chat_by_id, name='chat-by-id'),
    # path("create/", views.send, name='create')
]
