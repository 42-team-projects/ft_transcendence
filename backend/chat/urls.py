from django.urls import path
from . import views as chat_views
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path('messages/', chat_views.messages, name='conversation-messages'),
    path('conversation_list/', chat_views.conversation_list, name='conversation-list'),
]
