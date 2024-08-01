from rest_framework import serializers
from .models import Tournament, Player

class PlayerSerializer(serializers.ModelSerializer):
    tournaments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Player
        fields = ['id', 'name', 'tournaments']

class TournamentSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, required=False)
    class Meta:
        model = Tournament
        fields = ['id', 'can_join', 'tournament_id', 'tournament_name', 'created_at', 'number_of_players', 'is_accessible', 'access_password', 'players']