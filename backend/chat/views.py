from django.shortcuts           import render
from rest_framework.response    import Response
from django.http                import JsonResponse
from rest_framework.decorators  import api_view
from .models                    import *
from .serializers               import *
from django.shortcuts           import get_object_or_404


def user1(request):
    c = Conversation.objects.filter(title='chat_12').last()

    print(c.group_name)
    return render(request, 'chat/user1.html')
def user2(request):
    return render(request, 'chat/user2.html')


def group_conversation(request):
    return render(request, 'chat/group_conversation.html')


@api_view(['GET'])
def messages(request):
    title = request.GET.get('cn')
    conversation = get_object_or_404(Conversation, title=title)
    messages = conversation.get_all_messages()
    message_serializer = MessageSerializer(messages, many=True)
    return Response(message_serializer.data)

@api_view(['GET'])
def conversation_list(request):
    if request.user.is_authenticated:
        conversations = Conversation.objects.filter(participants=request.user)
        if conversations.exists():
            conversation_serializer = ConversationSerializer(
                conversations,
                many=True,
                context={
                    'request': request
                })
            return Response(conversation_serializer.data)
        else:
            return Response({'error' : 'no conversation found'}, status=404)
    else:
        return Response({'error' : 'User not authenticated.'}, status=404)

