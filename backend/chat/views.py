from rest_framework.response    import Response
from rest_framework.decorators  import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models                    import *
from .serializers               import *
from django.shortcuts           import get_object_or_404

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def messages(request):
    title = request.GET.get('cn')
    conversation = get_object_or_404(Conversation, title=title)
    messages = conversation.get_all_messages()
    message_serializer = MessageSerializer(messages, many=True)
    return Response(message_serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def conversation_list(request):
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
    
