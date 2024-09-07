from django.urls import path
from . import views as friend_views





urlpatterns = [
    path('send_friend_request/', friend_views.send_friend_request, name='send-friend-request'),
    path('friend_requests/', friend_views.friend_requests, name='friend-requests'),
    path('accept_friend_request/', friend_views.accept_friend_request, name='accept-friend-request'),

    path('remove_friend/', friend_views.remove_friend, name='remove-friend'),
]
