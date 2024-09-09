from accounts.models            import User
from friends.models             import FriendRequest, Friendship, BlockUser
from rest_framework.response    import Response
from rest_framework.decorators  import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions     import ObjectDoesNotExist,ValidationError
# from django.db                  import transaction
from django.shortcuts           import get_object_or_404

from .serializers               import FriendRequestSerializer, FriendshipSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_friend_requests(request):
    friend_requests = FriendRequest.objects.filter(receiver=request.user, is_active=True)
    friend_serializer = FriendRequestSerializer(friend_requests, many=True, read_only=True)
    return Response({'response': friend_serializer.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_friend_list(request):
    my_friends = get_object_or_404(Friendship, user=request.user)
    my_friends_serializer = FriendshipSerializer(my_friends, read_only=True)
    return Response({'response': my_friends_serializer.data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_friend_request(request):

    # Validate and extract receiver_id from the request data
    receiver_id = request.data.get('receiver_id', None)
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
    

    try:
        if Friendship.objects.filter(user=current_user, friends=receiver_user).exists() and \
            Friendship.objects.filter(user=receiver_user, friends=current_user).exists():
            return Response({'response': 'You are already friends with this user.'}, status=400)


        friend_request, created = FriendRequest.objects.get_or_create(sender=current_user, receiver=receiver_user)
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def accept_friend_request(request):

    # Validate request_id input
    request_id = request.GET.get('request_id', None)
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
    except ObjectDoesNotExist:
        return Response({'requests': 'Invalid request or object not found.'}, status=404)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def unfriend_user(request):
    target_user_id = request.data.get('friend_id', None)
    if not target_user_id:
        return Response({'response': 'target_user_id is required.'}, status=400)
    try:
        target_user_id = int(target_user_id)
    except ValueError:
        return Response({'response': 'Invalid removed ID. It should be an integer.'}, status=400)

    target_user = get_object_or_404(User, id=target_user_id)
    friend_list = get_object_or_404(Friendship, user=request.user)
    if friend_list.is_my_friend(target_user):
        friend_list.unfriend(target_user)
        return Response({'response': 'You have successfully unfriend this user.'})
    return Response({'response': 'Cannot unfriend this user, no friendship found.'})


@api_view(['POST'])
def block_user(request):
    """Block a user.

    This endpoint allows an authenticated user to block another user. The request should
    include the ID of the user to be blocked.

    Request Data:
    - user_id: The ID of the user to be blocked.

    Response:
    - 200 OK: If the user was successfully blocked.
    - 400 Bad Request: If the request data is invalid or missing.
    - 401 Unauthorized: If the user is not authenticated.

    Example Request:
    POST /api/block_user/
    {
        "user_id": 123
    }

    Example Response:
    {
        "detail": "User blocked successfully."
    }
    """
    user_id = request.data.get('user_id', None)
    try:
        blocked_user = request.user
        blocker_user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'response': 'Blocker user not exist.'})
    
    user_block = BlockUser.objects.create(blocked=blocked_user, blocker=blocker_user)
    # print('is friend >', user_block.is_friend())

    if user_block.is_friend():
        user_block.remove_friendship()
        return Response({'response': 'User blocked successfuly.'})
    else:
        return Response({'response': 'User not blocked.'})

@api_view(['POST'])
def unblock_user(request):
    """Unblock a user.

    This endpoint allows an authenticated user to unblock a previously blocked user. The request should
    include the ID of the user to be unblocked.

    Request Data:
    - user_id: The ID of the user to be unblocked.

    Response:
    - 200 OK: If the user was successfully unblocked.
    - 400 Bad Request: If the request data is invalid or missing.
    - 401 Unauthorized: If the user is not authenticated.

    Example Request:
    POST /api/unblock_user/
    {
        "user_id": 123
    }

    Example Response:
    {
        "detail": "User unblocked successfully."
    }
    """
    user_id = request.data.get('user_id', None)
    return Response({'unblock-user': user_id})
