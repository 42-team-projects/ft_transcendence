from accounts.models            import User
from friends.models             import FriendRequest, Friendship, BlockUser
from rest_framework.response    import Response
from rest_framework.decorators  import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions     import ObjectDoesNotExist,ValidationError
from django.shortcuts           import get_object_or_404

# from django.db import IntegrityError

from .serializers               import FriendRequestSerializer, FriendshipSerializer

def unfriend(current_user, target_user):
    try:
        friend_list = Friendship.objects.get(user=current_user)
        if friend_list.is_my_friend(target_user):
            friend_list.unfriend(target_user)
            return True
        return False
    except Friendship.DoesNotExist:
        return False



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_friend_requests(request):
    friend_requests = FriendRequest.objects.filter(receiver=request.user, is_active=True)
    friend_serializer = FriendRequestSerializer(friend_requests, many=True, read_only=True)
    return Response({'response': friend_serializer.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_friends_list(request):
    my_friends = get_object_or_404(Friendship, user=request.user)
    my_friends_serializer = FriendshipSerializer(my_friends, read_only=True)
    return Response({'response': my_friends_serializer.data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_friend_request(request):

    # Validate and extract receiver_id from the request data
    receiver_id = request.data.get('receiver_id', None)
    # try:
    #     error_handling(receiver_id)
    # except Exception as e:
    #     return Response({'response': str(e)})
    if not receiver_id:
        return Response({'response': 'receiver_id is required.'}, status=400)
    try:
        receiver_id = int(receiver_id)
    except ValueError:
        return Response({'response': 'Invalid receiver ID. It should be an integer.'}, status=400)

    current_user = request.user
    receiver_user = get_object_or_404(User, id=receiver_id)
    if receiver_id == current_user.id:
        return Response({'response': 'You cannot send a friend request to yourself.'}, status=400)
    

    # Check for any existing friend request from the receiver to the sender
    reverse_request = FriendRequest.objects.filter(sender=receiver_user, receiver=current_user, is_active=True)
    if reverse_request.exists():
        return Response({'response': 'There is already a friend request from this user to you.'}, status=400)
    # Check if they are already friends
    if Friendship.objects.filter(user=current_user, friends=receiver_user).exists() and \
        Friendship.objects.filter(user=receiver_user, friends=current_user).exists():
        return Response({'response': 'You are already friends with this user.'}, status=400)
    friend_request, created = FriendRequest.objects.get_or_create(sender=current_user, receiver=receiver_user)
    if not created:
        if friend_request.is_active:
            return Response({'response': 'You have already sent a friend request to this user.'}, status=400)
        else:
            # Reactivate the friend request if it was previously deactivated
            friend_request.reactivate()
            return Response({'response': 'Friend request reactivated.'}, status=200)
    else:
        return Response({'response': 'Friend request sent.'}, status=201)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_friend_request(request):

    # Validate request_id input
    request_id = request.POST.get('request_id', None)
    if not request_id:
        return Response({'response': 'request_id is required.'}, status=400)
    try:
        request_id = int(request_id)
    except ValueError:
        return Response({'response': 'Invalid request ID. It should be an integer.'}, status=400)

    try:
        friend_request = FriendRequest.objects.get(id=request_id, is_active=True)
        if friend_request.receiver == request.user:
            friend_request.accept()
            return Response({'requests': 'Friend request accepted.'})
        return Response({'requests': 'That is not your friend request to accepte.'}, status=403)
    except FriendRequest.DoesNotExist:
        return Response({'requests': 'Friend request not found.'}, status=404)
    # except ObjectDoesNotExist:
    #     return Response({'requests': 'Invalid request or object not found.'}, status=404)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def unfriend_user(request):
    target_user_id = request.data.get('friend_id', None)
    if not target_user_id:
        return Response({'response': 'friend_id is required.'}, status=400)
    try:
        target_user_id = int(target_user_id)
    except ValueError:
        return Response({'response': 'Invalid removed ID. It should be an integer.'}, status=400)

    current_user = get_object_or_404(User, id=request.user.id)
    target_user = get_object_or_404(User, id=target_user_id)
    if unfriend(current_user, target_user):
        return Response({'response': 'You have successfully unfriend this user.'})
    return Response({'response': 'Cannot unfriend this user, no friendship found.'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decline_friend_request(request):
    # Validate request_id input
    request_id = request.POST.get('request_id', None)
    if not request_id:
        return Response({'response': 'request_id is required.'}, status=400)
    try:
        request_id = int(request_id)
    except ValueError:
        return Response({'response': 'Invalid request ID. It should be an integer.'}, status=400)

    try:
        friend_request = FriendRequest.objects.get(id=request_id, is_active=True)
        if friend_request.receiver == request.user:
            friend_request.decline()
            return Response({'requests': 'Friend request declined.'})
        return Response({'requests': 'That is not your friend request to decline.'}, status=403)
    except FriendRequest.DoesNotExist:
        return Response({'requests': 'Friend request not found.'}, status=404)
    # except ObjectDoesNotExist:
    #     return Response({'requests': 'Invalid request or object not found.'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_friend_request(request):
    # Validate request_id input
    request_id = request.POST.get('request_id', None)
    if not request_id:
        return Response({'response': 'request_id is required.'}, status=400)
    try:
        request_id = int(request_id)
    except ValueError:
        return Response({'response': 'Invalid request ID. It should be an integer.'}, status=400)

    try:
        friend_request = FriendRequest.objects.get(id=request_id, is_active=True)
        if friend_request.sender == request.user:
            friend_request.cancel()
            return Response({'requests': 'Friend request cancelled.'})
        return Response({'requests': 'That is not your friend request to cancel.'}, status=403)
    except FriendRequest.DoesNotExist:
        return Response({'requests': 'Friend request not found.'}, status=404)
    # except ObjectDoesNotExist:
    #     return Response({'requests': 'Invalid request or object not found.'}, status=404)






@api_view(['POST'])
@permission_classes([IsAuthenticated])
def block_user(request):
    # Validate and extract the user to be blocked
    blocked_user_id = request.data.get('friend_id', None)
    if not blocked_user_id:
        return Response({'response': 'blocked_user_id is required.'}, status=400)
    try:
        blocked_user_id = int(blocked_user_id)
    except ValueError:
        return Response({'response': 'Invalid blocked user ID. It should be an integer.'}, status=400)

    current_user = request.user
    blocked_user = get_object_or_404(User, id=blocked_user_id)

    if blocked_user == current_user:
        return Response({'response': 'You cannot block yourself.'}, status=400)

    # Automatically unfriend the user when they are blocked
    block = BlockUser.objects.filter(blocker=current_user, blocked=blocked_user).first()
    if block:
        return Response({'response': 'This user is already blocked.'}, status=400)
    # Use the utility function to unfriend
    if unfriend(current_user, blocked_user):
        block = BlockUser.objects.create(blocker=current_user, blocked=blocked_user)
        return Response({'response': 'User blocked and unfriended successfully.'}, status=201)
    return Response({'response': 'No existing friendship was found to Block.'}, status=200)
















# @api_view(['POST'])
# def block_user(request):
#     """Block a user.

#     This endpoint allows an authenticated user to block another user. The request should
#     include the ID of the user to be blocked.

#     Request Data:
#     - user_id: The ID of the user to be blocked.

#     Response:
#     - 200 OK: If the user was successfully blocked.
#     - 400 Bad Request: If the request data is invalid or missing.
#     - 401 Unauthorized: If the user is not authenticated.

#     Example Request:
#     POST /api/block_user/
#     {
#         "user_id": 123
#     }

#     Example Response:
#     {
#         "detail": "User blocked successfully."
#     }
#     """
#     user_id = request.data.get('user_id', None)
#     try:
#         blocked_user = request.user
#         blocker_user = User.objects.get(id=user_id)
#     except User.DoesNotExist:
#         return Response({'response': 'Blocker user not exist.'})
    
#     # print('is friend >', user_block.is_friend())

#     user_block = BlockUser.objects.create(blocked=blocked_user, blocker=blocker_user)
    
#     if user_block.is_friend():
#         user_block.remove_friendship()
#         return Response({'response': 'User blocked successfuly.'})
#     else:
#         return Response({'response': 'User not blocked.'})

@api_view(['DELETE'])
def unblock_user(request):
    """Unblock a user.

    This endpoint allows an authenticated user to unblock a previously blocked friend. The request should
    include the ID of the friend to be unblocked.

    Request Data:
    - friend_id: The ID of the friend to be unblocked.

    Response:
    - 200 OK: If the user was successfully unblocked.
    - 400 Bad Request: If the request data is invalid or missing.
    - 401 Unauthorized: If the user is not authenticated.
    """
    friend_id = request.data.get('friend_id', None)
    if not friend_id:
        return Response({'response': 'friend_id is required.'}, status=400)
    try:
        friend_id = int(friend_id)
    except ValueError:
        return Response({'response': 'Invalid unblocked user ID. It should be an integer.'}, status=400)


    current_user = request.user
    blocked_user = get_object_or_404(User, id=friend_id)

    block = BlockUser.objects.filter(blocker=current_user, blocked=blocked_user).first()
    if block:
        block.delete()
        return Response({'response': 'User unblocked successfully.'})
    return Response({'response': 'you not blocked.'})
