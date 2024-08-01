




'''
from django.shortcuts import render
from rest_framework.response import Response

# Create your views here.


def chat(request, name):
    return Response({ "name" : name})
    
def defualt(request):
    return Response({"name" : "mzeroual"})

'''
from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Chat
from .serializers import ChatSerializer
from django.db.models import Q



def chat(request):
    return render(request, 'chat/chat.html')

# @api_view(['GET'])
# def chat_view_param(request, name):
#     return Response({"user": name})


# def chat_view(request):
#     return render(request, 'app/index.html')

# @api_view(['GET'])
# def chat(request) -> Response:
#     chats = Chat.objects.all()
#     serializer = ChatSerializer(chats, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
def chatSender(request) -> Response:
    sender_id = request.GET.get('sender_id')
    receiver_id = request.GET.get('receiver_id')
    chats = Chat.objects.filter(Q(sender_id=sender_id, receiver_id=receiver_id) | Q(sender_id=receiver_id, receiver_id=sender_id))
    serializer = ChatSerializer(chats, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def list(request) -> Response:
    chats = Chat.objects.all()
    serializer = ChatSerializer(chats, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add(request) -> Response:
    serializer = ChatSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


def html(request):
    return render(request, "chat/index.html")


def getAllMessages():
    pass

# def chat_list(request) -> Response:
#     chats = Chat.objects.all()
#     serializer = ChatSerializer(chats, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def chat_by_id(request, id) -> Response:
#     chats = Chat.objects.get(id=id)
#     serializer = ChatSerializer(chats, many=False)
    
#     return Response(serializer.data)
