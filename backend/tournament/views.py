from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Tournament
from .serializers import TournamentSerializer
from django.views.decorators.csrf import csrf_exempt
from Player.Models.PlayerModel import Player
from rest_framework import status
from rest_framework.parsers import JSONParser
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from dotenv import load_dotenv


from web3 import Web3
import os
from eth_account import Account
import os

# Load environment variables from .env file
load_dotenv()


# Web3.py setup 
SEPOLIA_URL = os.getenv('SEPOLIA_URL')
CONTRACT_ADDRESS = os.getenv('CONTRACT_ADDRESS')
PRIVATE_KEY = os.getenv('PRIVATE_KEY')

w3 = Web3(Web3.HTTPProvider(SEPOLIA_URL))

@csrf_exempt
@api_view(['POST'])
def leave_tournament_and_store_score(request):
    if request.method == 'POST':
        try:
            # Extract data from the request
            tournament_id = request.data.get('tournamentId')
            winner_id = request.data.get('winnerId')
            winner_score = request.data.get('winnerIdScore')
            loser_id = request.data.get('loserId')
            loser_score = request.data.get('loserIdScore')
            CONTRACT_ABI = request.data.get('abi')
            # Check if the tournament exists
            # try:
            #     tournament = Tournament.objects.get(tournament_id=tournament_id)
            # except Tournament.DoesNotExist:
            #     return JsonResponse({'statusText': 'Tournament not found'}, status=404)
            # # If the player is the loser, remove them from the tournament
            # if player.id == loser_id:
            #     tournament.players.remove(player)
            #     tournament.save()
            # Validate required parameters
            if not all([tournament_id, winner_id, winner_score, loser_id, loser_score, CONTRACT_ABI]):
                return JsonResponse({'statusText': 'Missing required parameters'}, status=400)
            # Create contract instance
            contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)
            # Create account from private key
            account = w3.eth.account.privateKeyToAccount(PRIVATE_KEY)
            # Build the transaction
            tx = contract.functions.storeScore(
                tournament_id,
                winner_id,
                winner_score,
                loser_id,
                loser_score
            ).buildTransaction({
                'from': account.address,
                'chainId': 11155111,  # Sepolia Testnet Chain ID
                'gas': 2000000,
                'gasPrice': w3.toWei('50', 'gwei'),
                'nonce': w3.eth.getTransactionCount(account.address),
            })
            # Sign the transaction
            signed_txn = w3.eth.account.signTransaction(tx, private_key=PRIVATE_KEY)
            # Send the transaction
            try:
                tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)
                receipt = w3.eth.waitForTransactionReceipt(tx_hash)
                scores = contract.functions.getScores(tournament_id).call()
                return JsonResponse({
                    'success': 'Player successfully left the tournament (if loser) and score stored on blockchain',
                    'txHash': tx_hash.hex(),
                    'scores': scores
                }, status=200)
            except Exception as e:
                return JsonResponse({'statusText': f'Error sending transaction: {str(e)}'}, status=500)

        except Exception as e:
            return JsonResponse({'statusText': str(e)}, status=500)
    return JsonResponse({'statusText': 'Invalid request method'}, status=405)


def list_tournaments(request):
    if request.method == 'GET':
        try:
            Tournaments = Tournament.objects.all()
            serializer  = TournamentSerializer(Tournaments, many=True)
            return JsonResponse(serializer.data, safe=False, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

@permission_classes([IsAuthenticated])
def get_tournament_by_id(request, tournamentId):
    if request.method == 'GET':
        try:
            player = Player.objects.get(user=request.user)
            tournament = Tournament.objects.get(tournament_id=tournamentId)
        except Tournament.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Tournament not found'}, status=status.HTTP_404_NOT_FOUND)
        except player.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User doesn\'t Authenticated'}, status=403)
        serializer = TournamentSerializer(tournament)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def player_join_tournament(request, tournamentId):
    if request.method == 'POST':
        try:
            player = Player.objects.get(user=request.user)
            tournament = Tournament.objects.get(tournament_id=tournamentId)
            if not tournament.can_join:
                return JsonResponse({'statusText': 'Tournament is not open for new players'}, status=400)
            if player in tournament.players.all():
                return JsonResponse({'statusText': 'Player is already in the tournament'}, status=400)
            tournament.players.add(player)
            tournament.save()
            serializer = TournamentSerializer(tournament)
            if tournament.players.count() >= tournament.number_of_players:
                tournament.can_join = False
                tournament.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        # Send a message to the WebSocket group
        # channel_layer = get_channel_layer()
        # tournament_name = "Tournament"
        # room_group_name = f'tournament_{tournament_name}'
        # async_to_sync(channel_layer.group_send)(
        #         room_group_name,
        #         {
        #             'type': 'tournament_message',
        #             'message': 'A new tournament has been created!',
        #             'dataTest': serializer.data,
        #             'join': True
        #         }
        #     )
        #     if tournament.players.count() >= tournament.number_of_players:
        #         tournament.can_join = False
        #         tournament.save()
                # launch_tournament(tournament) # here call launch_tournament function
                # return JsonResponse(serializer.data, status=status.HTTP_200_OK)
                # return JsonResponse({'success': launch_tournament(tournament)}, status=200)
            # return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            # return JsonResponse({'success': 'Player successfully joined the tournament'}, status=200)
        except Player.DoesNotExist:
            return JsonResponse({'statusText': 'Player not found'}, status=404)
        except Tournament.DoesNotExist:
            return JsonResponse({'statusText': 'Tournament not found'}, status=404)
    return JsonResponse({'statusText': 'Invalid request method'}, status=405)

@csrf_exempt
@permission_classes([IsAuthenticated])
def SetStartDate(request):
    if request.method == 'PUT':
        try:
            data = JSONParser().parse(request)
            tournamentId = data.get('tournamentId')
            start_date = data.get('start_date')
            tournament = Tournament.objects.get(id=tournamentId)
            tournament.start_date = start_date
            tournament.save()
            return JsonResponse('start date is updated !', safe=False, status=200)
        except Player.DoesNotExist:
            return JsonResponse({'statusText': 'Player not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_tournaments_by_player_id(request):
    try:
        player = Player.objects.get(user=request.user)
    except Player.DoesNotExist:
        return JsonResponse({'error': 'Player not found'})
    
    tournaments = player.tournaments.all()  # Get all tournaments associated with the player
    serializer = TournamentSerializer(tournaments, many=True)
    return JsonResponse(serializer.data, safe=False)


def get_available_tournaments(request):
    if request.method == 'GET':
        tournamentName = request.GET.get("tournament_name")
        tournamentId = request.GET.get("tournament_id")
        if tournamentId and tournamentName:
            tournaments = Tournament.objects.filter(can_join=True, tournament_id=tournamentId, tournament_name__contains=tournamentName)
        elif tournamentId : 
            tournaments = Tournament.objects.filter(can_join=True, tournament_id=tournamentId)
        elif tournamentName : 
            tournaments = Tournament.objects.filter(can_join=True, tournament_name__contains=tournamentName)
        else :
            tournaments = Tournament.objects.filter(can_join=True)

        serializer = TournamentSerializer(tournaments, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)


# @csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def create_tournament(request):
    if request.method == 'POST':
        try:
            player = Player.objects.get(user=request.user)
        except player.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User doesn\'t Authenticated'}, status=403)


        data = JSONParser().parse(request)
        # print(data)
        # tournament = Tournament.objects.create(tournament_name=data.tournament_name, number_of_players=data.number_of_players, is_accessible=data.is_accessible,
        # access_password=data.access_password)

        # player = Player.objects.get(id=player_id)
        # data.owner = player
        # print("===\n")
        # print(data)
        # print("====\n")


        # player = Player.objects.get(id=player_id)
        # tournament.players.add(player)
        # tournament.owner = player
        # tournament.save()
        # return JsonResponse({'status': 'success', 'tournament': "Created"}, status=201)



        serializer = TournamentSerializer(data=data)
        if serializer.is_valid():
            tournament = serializer.save()
            player = Player.objects.get(user=request.user)
            tournament.players.add(player)
            tournament.owner = player
            tournament.save()

            # tournaments = Tournament.objects.filter(can_join=True)
            # serializers = TournamentSerializer(tournaments, many=True)

            # Send a message to the WebSocket group
            # channel_layer = get_channel_layer()
            # tournament_name = "Tournament"
            # room_group_name = f'tournament_{tournament_name}'
            
            # async_to_sync(channel_layer.group_send)(
            #     room_group_name,
            #     {
            #         'type': 'tournament_message',
            #         'message': 'A new tournament has been created!',
            #         'dataTest': serializer.data,
            #         'join': False
            #     }
            # )
            return JsonResponse({'status': 'success', 'tournament': serializer.data}, status=201)
        # print(serializer.errors)
        # logger.debug("Validation errors:", serializer.errors)
        return JsonResponse({'status': 'error', 'errors': serializer.errors}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def player_leave_tournament(request, tournamentId):
    if request.method == 'POST':
        try:
            player = Player.objects.get(user=request.user)
            tournament = Tournament.objects.get(tournament_id=tournamentId)
            # if not tournament.can_join:
            #     return JsonResponse({'statusText': 'Tournament is not open for new players'}, status=400)

            # if player not in tournament.players.all():
            #     return JsonResponse({'statusText': 'Player is not in the tournament'}, status=400)

            # tournament.players.add(player)
            tournament.players.remove(player)
            tournament.save()
            # if tournament.players.count() >= tournament.number_of_players:
            #     tournament.can_join = False
            #     tournament.save()
                # launch_tournament(tournament) # here call launch_tournament function
                # return JsonResponse({'success': launch_tournament(tournament)}, status=200)
            return JsonResponse({'success': 'Player successfully leaved the tournament'}, status=200)
        except Player.DoesNotExist:
            return JsonResponse({'statusText': 'Player not found'}, status=404)
        except Tournament.DoesNotExist:
            return JsonResponse({'statusText': 'Tournament not found'}, status=404)
    return JsonResponse({'statusText': 'Invalid request method'}, status=405)
