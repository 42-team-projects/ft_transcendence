from accounts.models            import User
from friends.models             import FriendRequest, Friendship
from rest_framework.response    import Response
from rest_framework.decorators  import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions     import ObjectDoesNotExist,ValidationError
# from django.db                  import transaction
from django.shortcuts           import get_object_or_404


from .serializers               import FriendRequestSerializer 


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_friend_requests(request):
    friend_requests = FriendRequest.objects.filter(receiver=request.user, is_active=True)
    friend_serializer = FriendRequestSerializer(friend_requests, many=True, read_only=True)
    return Response({'friend_requests': friend_serializer.data})


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
        friend_request.accept()
        return Response({'requests': 'Friend request accepted.'})
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

    current_user = request.user
    target_user = get_object_or_404(User, id=target_user_id)

    current_user_friends = get_object_or_404(Friendship, user=current_user)
    target_user_friends = get_object_or_404(Friendship, user=target_user)

    if not (current_user_friends.is_my_friend(target_user) and target_user_friends.is_my_friend(current_user)):
        return Response({'response': 'Friendship not found.'}, status=400)

    # Perform removal
    try:
        current_user_friends.remove_user(target_user)
        target_user_friends.remove_user(current_user)
        return Response({'response': 'User removed successfully.'})
    except Exception as e:
        # Log the exception
        return Response({'response': f'Error occurred while removing friend, {str(e)}'}, status=500)

