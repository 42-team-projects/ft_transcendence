from django.urls import path
from . import views as friend_views





urlpatterns = [
    path('list_friend_requests/', friend_views.get_friend_requests, name='list-friend-requests'),
    path('send_friend_request/', friend_views.send_friend_request, name='send-friend-request'),
    path('accept_friend_request/', friend_views.accept_friend_request, name='accept-friend-request'),

    path('unfriend_user/', friend_views.unfriend_user, name='unfriend-user'),
]
