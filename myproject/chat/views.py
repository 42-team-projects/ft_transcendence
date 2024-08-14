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


def chat(request):
    return render(request, 'chat/chat.html')

@api_view(['GET'])
def get_all_messages(request, conversation_name):
    conversation = get_object_or_404(Conversation, conversation_name=conversation_name)
    serializer = ConversationSerializer(conversation)
    messages = Message.objects.filter(conversation=serializer.data['id'])
        
    if messages.exists():
        # Serialize the queryset
        message_serializer = MessageSerializer(messages, many=True)
        return Response(message_serializer.data)
    else:
        return Response({'Error': 'No messages found for this conversation'}, status=404)



@api_view(['GET'])
def get_all_conversations(request):
    conversations = Conversation.objects.all() 
    if conversations.exists():
        # Serialize the queryset
        conversations_serializer = ConversationSerializer(conversations, many=True)
        return Response(conversations_serializer.data)
    else:
        return Response({'Error': 'No conversations found'}, status=404)

@api_view(['GET'])
def last_message(request, conversation_name):
    conversation = get_object_or_404(Conversation)
    message = Message.objects.filter(conversation=conversation.id).last()
    if message:
        message_serializer = MessageSerializer(message)
        return Response(message_serializer.data)
    else:
        return Response({'Error': 'No message found'}, status=404)
    



# # @api_view(['GET'])
# # def chat_view_param(request, name):
# #     return Response({"user": name})


# # def chat_view(request):
# #     return render(request, 'app/index.html')

# # @api_view(['GET'])
# # def chat(request) -> Response:
# #     chats = Chat.objects.all()
# #     serializer = ChatSerializer(chats, many=True)
# #     return Response(serializer.data)

# @api_view(['GET'])
# def chatSender(request) -> Response:
#     sender_id = request.GET.get('sender_id')
#     receiver_id = request.GET.get('receiver_id')
#     chats = Message.objects.filter(Q(sender_id=sender_id, receiver_id=receiver_id) | Q(sender_id=receiver_id, receiver_id=sender_id))
#     serializer = ChatSerializer(chats, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def list(request) -> Response:
#     chats = Friend.objects.all()
#     print(chats.order_by('id'))
#     chats = Message.objects.all()
#     serializer = ChatSerializer(chats, many=True)
#     # print(serializer.data)
#     return Response(serializer.data)

# @api_view(['POST'])
# def add(request) -> Response:
#     serializer = ChatSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)


# def html(request):
#     return render(request, "chat/index.html")


# def getAllMessages():
#     pass

# # def chat_list(request) -> Response:
# #     chats = Chat.objects.all()
# #     serializer = ChatSerializer(chats, many=True)
# #     return Response(serializer.data)

# # @api_view(['GET'])
# # def chat_by_id(request, id) -> Response:
# #     chats = Chat.objects.get(id=id)
# #     serializer = ChatSerializer(chats, many=False)
    
# #     return Response(serializer.data)
