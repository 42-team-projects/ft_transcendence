from django.urls import path
from . import views as friend_views





urlpatterns = [
    path('friend_list/', friend_views.get_friend_list, name='friend-list'),
    path('request_list/', friend_views.get_friend_requests, name='request-list'),
    path('send/', friend_views.send_friend_request, name='send-friend-request'),
    path('accept/', friend_views.accept_friend_request, name='accept-friend-request'),
    path('unfriend/', friend_views.unfriend_user, name='unfriend-user'),


    path('block/', friend_views.block_user, name='block-user'),
    path('unblock/', friend_views.unblock_user, name='unblock-user'),
]
