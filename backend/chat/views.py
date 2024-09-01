from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from django.db.models import Q
import json
from django.core.serializers import serialize
from django.shortcuts import get_object_or_404
from django.shortcuts import render, redirect


def chat_conversation(request):
    return render(request, 'chat/chat_conversation.html')

def group_conversation(request):
    return render(request, 'chat/group_conversation.html')


@api_view(['GET'])
def get_chat_conversation(request):
    conversation_name = request.GET.get('cn')
    conversation = get_object_or_404(Conversation, conversation_name=conversation_name)
    messages = Message.objects.filter(conversation=conversation)
    message_serializer = MessageSerializer(messages, many=True)
    return Response(message_serializer.data)

@api_view(['GET'])
def group_conversations(request):
    user = get_object_or_404(User, id=request.user.id) 
    conversations = Conversation.objects.filter(status='G', users=user)
    if conversations.exists():
        conversation_serializer = ConversationSerializer(conversations, many=True)
        return Response(conversation_serializer.data)
    else:
        return Response({'error' : 'no conversation found'})
        


@api_view(['GET'])
def chat_conversations(request):
    user = get_object_or_404(User, id=request.user.id) 
    conversations = Conversation.objects.filter(status='C', users=user)
    if conversations.exists():
        conversation_serializer = ConversationSerializer(conversations, many=True)
        return Response(conversation_serializer.data)
    else:
        return Response({'error' : 'no conversation found'})




# @api_view(['GET'])
# def get_all_conversations(request):
#     conversations = Conversation.objects.all() 
#     if conversations.exists():
#         # Serialize the queryset
#         conversations_serializer = ConversationSerializer(conversations, many=True)
#         return Response(conversations_serializer.data)
#     else:
#         return Response({'Error': 'No conversations found'}, status=404)

@api_view(['GET'])
def last_message(request):
    conversation_name = request.GET.get('cn')
    conversation = get_object_or_404(Conversation, conversation_name=conversation_name)
    message = Message.objects.filter(conversation=conversation.id).last()
    if message:
        message_serializer = MessageSerializer(message)
        return Response(message_serializer.data)
    else:
        return Response({'Error': 'No message found'}, status=404)
    





    
