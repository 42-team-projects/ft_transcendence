from django.http import JsonResponse
from ..Models.PlayerModel import Player, Nickname
from ..Models.LinksModel import Links
from ..Serializers.PlayerSerializer import PlayerSerializer, CustomPlayerSerializer, DefaultPlayerSerializer, ProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from game.models import GamePlay, GameHestory
import logging
from friend.models import Friendship, BlockUser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from accounts.models import User

logger = logging.getLogger(__name__)

### Player Views ###


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPlayerById(request, playerId):

    try:
        player = Player.objects.get(id=playerId)
    except Player.DoesNotExist:
        return JsonResponse({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = CustomPlayerSerializer(player)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

def update_is_friend_field(currentUser, player):
    # Iterate through the players to check for friendship
    try:
        friendship = Friendship.objects.get(user=currentUser)
    except Friendship.DoesNotExist:
        return  # If no friendship exists for this player, move to the next one

    # Check if the friend's username exists in the friends list
    if friendship.friends.filter(username=player.user).exists():
        player.is_friend = True
    else:
        player.is_friend = False


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def searchForPlayers(request):
    if request.method == 'GET':
        try:
            username = request.GET.get("username")
            if username:
                players = Player.objects.filter(user__username__icontains=username)
                for player in players:
                    update_is_friend_field(request.user, player)
                serializer = DefaultPlayerSerializer(players, many=True)
                return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        except Player.DoesNotExist:
            return JsonResponse({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getAllPlayers(request):
    if request.method == 'GET':
        players = Player.objects.all()
        for player in players:
            update_is_friend_field(request.user, player)
        serializer = DefaultPlayerSerializer(players, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = DefaultPlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def getMyInfo(request):
    try:
        player = Player.objects.get(user=request.user)
        if request.method == 'GET':
            serializer = ProfileSerializer(player)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        elif request.method == 'PUT':
            serializer = PlayerSerializer(player, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)
            else:
                return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            GameHestory.objects.filter(player=player).delete()
            GamePlay.objects.get(player=player).delete()
            Links.objects.filter(player=player).delete()
            player.stats.graph.delete();
            player.stats.delete();
            player.user.delete()
            player.delete()
            return JsonResponse({"message": "Player deleted successfully"}, status=status.HTTP_200_OK)
    except Player.DoesNotExist:
        return JsonResponse({"error": "Player not found"}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def getPlayerByUsername(request, username):
    try:
        player = Player.objects.get(user__username=username)
        update_is_friend_field(request.user, player)
        if request.method == 'GET':
            serializer = PlayerSerializer(player)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        elif request.method == 'PUT':
            serializer = PlayerSerializer(player, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)
            else:
                return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Player.DoesNotExist:
        return JsonResponse({"error": "Player not found"}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPlayerCount(request):
    player_count = Player.objects.count()
    return JsonResponse({"count": player_count}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getLeaderBoard(request):
    players = Player.objects.all().order_by("-stats__xp")
    serializer = DefaultPlayerSerializer(players, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateActiveField(request):
    isActive = request.data["active"]
    player = Player.objects.get(user=request.user)
    player.active = isActive
    player.save()
    return JsonResponse({"message": "is active has successfully updated."}, safe=False, status=status.HTTP_200_OK)






@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def setNickname(request):
    try:
        player = Player.objects.get(user=request.user)

        if request.method == 'POST':
            tournament_id = request.data.get("tournament_id")
            nickname = request.data.get("nickname")

            if not tournament_id or not nickname:
                return JsonResponse({'statusText': 'Missing tournament_id or nickname'}, status=400)

            # Check if a nickname already exists for this player and tournament
            # if Nickname.objects.filter(player=player, tournamentid=tournament_id).exists():
            #     return JsonResponse({'statusText': 'Nickname already exists for this tournament'}, status=400)

            # Create the new nickname for this player and tournament
            Nickname.objects.create(player=player, tournamentid=tournament_id, nickname=nickname)

            return JsonResponse({'statusText': 'Nickname created successfully'}, status=201)

    except Player.DoesNotExist:
        return JsonResponse({'statusText': 'Player not found'}, status=404)

    except Exception as e:
        return JsonResponse({'statusText': str(e)}, status=500)

    return JsonResponse({'statusText': 'Invalid request method'}, status=405)




@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNicknameForTournament(request, tournament_id):
    try:
        player = Player.objects.get(user=request.user)

        if request.method == 'GET':
            try:
                # Fetch the nickname for the player and tournament
                nickname = Nickname.objects.get(player=player, tournamentid=tournament_id)
                return JsonResponse({'nickname': nickname.nickname}, status=200)
            except Nickname.DoesNotExist:
                return JsonResponse({'statusText': 'Nickname not found for this tournament'}, status=404)

    except Player.DoesNotExist:
        return JsonResponse({'statusText': 'Player not found'}, status=404)

    except Exception as e:
        return JsonResponse({'statusText': str(e)}, status=500)

    return JsonResponse({'statusText': 'Invalid request method'}, status=405)