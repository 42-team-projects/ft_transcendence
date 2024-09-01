from django.urls import re_path
from . import consumers


websocket_urlpatterns = [
    re_path(r'ws/chat/chat/(?P<room_name>\w+)/$', consumers.ChatConversationConsumer.as_asgi()),
    # re_path(r'ws/chat/group/(?P<room_name>\w+)/$', consumers.GroupConversationConsumer.as_asgi())
]
