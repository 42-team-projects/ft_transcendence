from django.urls import re_path
from . import consumers


websocket_urlpatterns = [
    re_path(r'ws/notification/user/(?P<room_name>\w+)/$', consumers.UserNotificationConsumer.as_asgi()),
    # re_path(r'ws/notification/group/(?P<room_name>\w+)/$', consumers.UserNotificationConsumer.as_asgi())
]
