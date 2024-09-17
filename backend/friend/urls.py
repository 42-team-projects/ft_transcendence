from django.urls import path
from . import views as friend_views

urlpatterns = [
    path('friends/', friend_views.get_friends_list, name='friends-list'),
    path('requests/', friend_views.get_friend_requests, name='requests-list'),
    path('send/<int:receiver_id>/', friend_views.send_friend_request, name='send-friend-request'),
    path('accept/<int:request_id>/', friend_views.accept_friend_request, name='accept-friend-request'),
    path('unfriend/<int:friend_id>/', friend_views.unfriend_user, name='unfriend-user'),
    path('decline/<int:request_id>/', friend_views.decline_friend_request, name='decline-friend-request'),
    path('cancel/<int:request_id>/', friend_views.cancel_friend_request, name='cancel-friend-request'),
    path('accept_all/', friend_views.accept_all_friend_requests, name='accept-all'),
    path('decline_all/', friend_views.decline_all_friend_requests, name='decline-all'),

    
    # block user
    path('block/<int:user_id>/', friend_views.block_user, name='block-user'),
    path('unblock/<int:user_id>/', friend_views.unblock_user, name='unblock-user'),

    path('is_blocked/<str:username>/', friend_views.is_blocked, name='is-blocked'),
    
    

]
