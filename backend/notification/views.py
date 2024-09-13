from django.shortcuts import render
from rest_framework.response    import Response
from .models import *
from .serializers import *
from rest_framework.decorators  import api_view


# Create your views here.


def receive(request):
    return (render(request, 'notification/receive.html'))

def send(request):
    return (render(request, 'notification/send.html'))

@api_view(['GET'])
def list_user_notifications(request):
    if request.user.is_authenticated:
        notifications = Notification.objects.filter(receiver=request.user)
        notification_serializer = NotificationSerializer(notifications, many=True, context=request)
        return Response(notification_serializer.data)
    else:
        return Response({'error' : 'User not authenticated'}, status=404) 
