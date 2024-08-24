from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Message
from .serializers import MessageSerializer

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

# Create your views here.

def index(request):
    return HttpResponse("Chat")

@api_view(['GET', 'POST'])
def message_list_view(request, room_name):
    if request.method == 'GET':
        messages = Message.objects.filter(room_name=room_name)
        serializer = MessageSerializer(messages, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    elif request.method == 'POST':
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(room_name=room_name)
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED, safe=False)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, safe=False)


def start_tournament(tournament_id):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'tournament_{tournament_id}',
        {
            'type': 'tournament_message',
            'message': f'Tournament {tournament_id} is starting!',
        }
    )