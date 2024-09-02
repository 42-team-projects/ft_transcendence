from django.shortcuts           import render
from rest_framework.response    import Response
from django.http                import JsonResponse
from rest_framework.decorators  import api_view

from .models                    import *
from .serializers               import *

from django.shortcuts           import get_object_or_404


# from django.db.models import Q
# import json
# from django.core.serializers import serialize



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
    
    # user = get_object_or_404(User, id=request.user.id)
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


# def mark_messages_as_read(request, conversation_name):
#     conversation = get_object_or_404(Conversation, conversation_name=conversation_name)
#     messages = conversation.messages.filter(is_read=False).exclude(sender=request.user)
#     print(messages)
#     messages.update(is_read=True)
#     return JsonResponse({'status': 'success', 'message': 'Messages marked as read'})


# def mark_messages_as_read(request, conversation_name):
#     conversation = get_object_or_404(Conversation, conversation_name=conversation_name)
#     messages = conversation.get_unread_messages(request.user)
#     if messages.exists():
#         messages.update(is_read=True)
#         return JsonResponse({'status': 'success', 'message': 'Messages marked as read'})
#     else:
#         return JsonResponse({'status': 'success', 'message': 'No messages to mark as read'})








# @api_view(['GET'])
# def block_user(request, user_id):
#     user_to_block = User.objects.get(pk=user_id)
#     Block.objects.get_or_create(blocker=request.user, blocked=user_to_block)
#     return JsonResponse({'status': 'User blocked'})


# @api_view(['GET'])
# def unblock_user(request, user_id):
#     user_to_unblock = User.objects.get(pk=user_id)
#     Block.objects.filter(blocker=request.user, blocked=user_to_unblock).delete()
#     return JsonResponse({'status': 'User unblocked'})




# @api_view(['GET'])
# def group_conversation_list(request):
#     user = get_object_or_404(User, id=request.user.id) 
#     conversations = Conversation.objects.filter(status='G', users=user)
#     if conversations.exists():
#         conversation_serializer = ConversationSerializer(
#             conversations,
#             many=True,
#             context={
#                 'request': request
#             })
#         return Response(conversation_serializer.data)
#     else:
#         return Response({'error' : 'no conversation found'})
        





# @api_view(['GET'])
# def last_message(request):
#     conversation_name = request.GET.get('cn')
#     conversation = get_object_or_404(Conversation, conversation_name=conversation_name)
#     message = Message.objects.filter(conversation=conversation.id).last()
#     if message:
#         message_serializer = MessageSerializer(message)
#         return Response(message_serializer.data)
#     else:
#         return Response({'Error': 'No message found'}, status=404)

