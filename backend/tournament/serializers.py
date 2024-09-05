from rest_framework import serializers
from .models import Tournament
from Player.Serializers.PlayerSerializer import PlayerSerializer


class TournamentSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, required=False)
    owner = PlayerSerializer(allow_null=True, required=False)
    class Meta:
        model = Tournament
        fields = ['id', 'can_join', 'tournament_id', 'tournament_name', 'created_at',  'number_of_players', 'start_date', 'is_accessible', 'access_password', 'players', 'owner']
