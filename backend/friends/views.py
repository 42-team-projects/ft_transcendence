from django.shortcuts import render
from accounts.models import User
from friends.models import FriendRequest
from rest_framework.response    import Response
from django.http                import JsonResponse
from rest_framework.decorators  import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions     import ObjectDoesNotExist, ValidationError

from .serializers               import FriendRequestSerializer





@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friend_requests(request):
    friend_requests = FriendRequest.objects.filter(receiver=request.user, is_active=True)
    friend_serializer = FriendRequestSerializer(friend_requests, many=True, read_only=True)
    return Response({'friend_requests': friend_serializer.data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def accept_friend_request(request):
    receiver_id = request.GET.get('receiver_id', None)

    # Validate receiver_id input
    if not receiver_id or not receiver_id.isdigit():
        return Response({'requests': 'Invalid receiver ID.'}, status=400)

    try:
        receiver = User.objects.get(id=receiver_id)
        friend_request = FriendRequest.objects.get(sender=request.user, receiver=receiver, is_active=True)
        friend_request.accept()
        return Response({'requests': 'Friend request accepted.'})

    except User.DoesNotExist:
        return Response({'requests': 'User does not exist.'}, status=404)
    except FriendRequest.DoesNotExist:
        return Response({'requests': 'Friend request not found.'}, status=404)
    except ObjectDoesNotExist:
        return Response({'requests': 'Invalid request or object not found.'}, status=404)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_friend_request(request):
    sender = request.user
    response = {}

    # Validate and extract receiver_id from the request data

    try:
        receiver_id = int(request.data.get('receiver_id'))
        # receiver_id = int(request.data.get('receiver_id'))
        print('receiver ID: ',receiver_id)
    except (TypeError, ValueError):
        return Response({'response': 'Invalid receiver_id. It should be an integer.'}, status=400)

    if receiver_id == sender.id:
        return Response({'response': 'You cannot send a friend request to yourself.'}, status=400)

    # Fetch receiver user and handle exceptions
    try:
        receiver = User.objects.get(id=receiver_id)
    except User.DoesNotExist:
        return Response({'response': 'Receiver user does not exist.'}, status=404)

    try:
        friend_request, created = FriendRequest.objects.get_or_create(sender=sender, receiver=receiver)
        if not created:
            if friend_request.is_active:
                return Response({'response': 'You have already sent a friend request to this user.'}, status=400)
            else:
                # Reactivate the friend request if it was previously deactivated
                friend_request.is_active = True
                friend_request.save()
                return Response({'response': 'Friend request reactivated.'}, status=200)
        else:
            return Response({'response': 'Friend request sent.'}, status=201)
    except ValidationError as e:
        return Response({'response': str(e)}, status=400)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def send_friend_request(request):
#     response = {}
#     sender = request.user
#     if request.method == 'POST' and sender.is_authenticated:
#         try:
#             receiver_id =  (int)(request.POST.get('receiver_id'))
#             if receiver_id and receiver_id != sender.id:
#                 try:
#                     receiver = User.objects.get(id=receiver_id)
#                     try:
#                         friend_request = FriendRequest.objects.get(sender=sender, receiver=receiver)
#                         if friend_request.is_active:
#                             response['response'] = 'you alredy sent them friend request.'
#                         else:
#                             friend_request = FriendRequest(sender=sender, receiver=receiver)
#                             friend_request.save()
#                             response['response'] = 'friend request send.'
#                     except FriendRequest.DoesNotExist:
#                         friend_request = FriendRequest(sender=sender, receiver=receiver)
#                         friend_request.save()
#                         response['response'] = 'friend request send.'
#                 except User.DoesNotExist:
#                     response['response'] = 'receiver user not exist in database.'
#             else:
#                 response['response'] = 'you can\'t send friend request to you.'
#         except ValueError:
#             response['response'] = 'value of receiver_id should be int.' 
#     else:
#         response['response'] = 'unable to send friend request.'
#     return Response(response)    
    
    
    

    


