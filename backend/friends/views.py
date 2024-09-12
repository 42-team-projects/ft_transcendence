from accounts.models            import User
from friends.models             import(FriendRequest, Friendship, BlockUser)
from rest_framework.response    import Response
from rest_framework.decorators  import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions     import ObjectDoesNotExist,ValidationError
from django.shortcuts           import get_object_or_404

from .serializers               import FriendRequestSerializer, FriendshipSerializer

def unfriend(current_user, target_user):
    try:
        user_friend = Friendship.get_friendship(user=current_user)
        if user_friend.is_friend(target_user):
            user_friend.unfriend(target_user)
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
    friends = Friendship.get_friendship(request.user)
    friends_serializer = FriendshipSerializer(friends, read_only=True)
    return Response({'response': friends_serializer.data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_friend_request(request, receiver_id):
    current_user = request.user
    if receiver_id == current_user.id:
        return Response({'response': 'You cannot send a friend request to yourself.'}, status=400)
    receiver_user = get_object_or_404(User, id=receiver_id)
    # Check for any existing friend request from the receiver to the sender
    reverse_request = FriendRequest.objects.filter(sender=receiver_user, receiver=current_user, is_active=True)
    if reverse_request.exists():
        return Response({'response': 'There is already a friend request from this user to you.'}, status=400)
    # Check if they are already friends
    if Friendship.get_friendship(current_user).is_friend(receiver_user) and \
        Friendship.get_friendship(receiver_user).is_friend(current_user):
        return Response({'response': 'You are already friends with this user.'}, status=400)
    friend_request, created = FriendRequest.objects.get_or_create(sender=current_user, receiver=receiver_user)
    if not created:
        if friend_request.is_pending():
            return Response({'response': 'You have already sent a friend request to this user.'}, status=400)
        else:
            # Reactivate the friend request if it was previously deactivated
            friend_request.reactivate()
            return Response({'response': 'Friend request reactivated.'}, status=200)
    else:
        return Response({'response': 'Friend request sent.'}, status=201)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_friend_request(request, request_id):
    try:
        friend_request = FriendRequest.objects.get(id=request_id, is_active=True)
        # check is my friend request to accept.
        if friend_request.receiver == request.user:
            friend_request.accept()
            return Response({'requests': 'Friend request accepted.'})
        return Response({'requests': 'That is not your friend request to accepte.'}, status=403)
    except FriendRequest.DoesNotExist:
        return Response({'requests': 'Friend request not found.'}, status=404)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def unfriend_user(request, friend_id):
    current_user = request.user
    target_user = get_object_or_404(User, id=friend_id)

    my_friend_list = Friendship.get_friendship(current_user)
    if my_friend_list.is_friend(target_user):
        my_friend_list.unfriend(target_user)
        return Response({'response': 'You have successfully unfriend this user.'})
    return Response({'response': 'Cannot unfriend this user, no friendship found.'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decline_friend_request(request, request_id):
    try:
        friend_request = FriendRequest.objects.get(id=request_id, is_active=True)
        if friend_request.receiver == request.user:
            friend_request.decline()
            return Response({'requests': 'Friend request declined.'})
        return Response({'requests': 'That is not your friend request to decline.'}, status=403)
    except FriendRequest.DoesNotExist:
        return Response({'requests': 'Friend request not found.'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_friend_request(request, request_id):
    try:
        friend_request = FriendRequest.objects.get(id=request_id, is_active=True)
        if friend_request.sender == request.user:
            friend_request.cancel()
            return Response({'requests': 'Friend request cancelled.'})
        return Response({'requests': 'That is not your friend request to cancel.'}, status=403)
    except FriendRequest.DoesNotExist:
        return Response({'requests': 'Friend request not found.'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def block_user(request, user_id):
    """Block a user.
    This endpoint allows an authenticated user to block another user.
    """
    current_user = request.user
    blocked_user = get_object_or_404(User, id=user_id)

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

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def unblock_user(request, user_id):
    """Unblock a user.
    This endpoint allows an authenticated user to unblock a previously blocked friend.
    """
    current_user = request.user
    blocked_user = get_object_or_404(User, id=user_id)

    block = BlockUser.objects.filter(blocker=current_user, blocked=blocked_user).first()
    if block:
        block.delete()
        return Response({'response': 'User unblocked successfully.'})
    return Response({'response': 'No blocking action found for this user.'})

