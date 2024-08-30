from django.shortcuts import render
from rest_framework.response    import Response
from django.http import JsonResponse
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
    notifications = Notification.objects.filter(user=request.user)
    notification_serializer = NotificationSerializer(notifications, many=True)
    return Response(notification_serializer.data)