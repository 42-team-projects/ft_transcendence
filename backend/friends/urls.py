from django.urls import path
from . import views as friend_views





urlpatterns = [
    path('friends/', friend_views.get_friends_list, name='friends-list'),
    path('requests/', friend_views.get_friend_requests, name='requests-list'),
    path('send/', friend_views.send_friend_request, name='send-friend-request'),
    path('accept/', friend_views.accept_friend_request, name='accept-friend-request'),
    path('unfriend/', friend_views.unfriend_user, name='unfriend-user'),
    path('decline/', friend_views.decline_friend_request, name='decline-friend-request'),
    path('cancel/', friend_views.cancel_friend_request, name='cancel-friend-request'),

    # block user

    path('block/', friend_views.block_user, name='block-user'),
    path('unblock/', friend_views.unblock_user, name='unblock-user'),
]
