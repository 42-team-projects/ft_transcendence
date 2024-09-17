from django.urls import re_path
from . import consumers


websocket_urlpatterns = [
    re_path(r'ws/user/notification/(?P<id>\w+)/$', consumers.UserNotificationConsumer.as_asgi()),
    re_path(r'ws/group/notification/(?P<room_name>\w+)/$', consumers.GroupNotificationConsumer.as_asgi())
]
