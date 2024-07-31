from rest_framework import serializers
from .models import Tournament, Player, Stage

class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = ['id', 'stage_type', 'stage_datetime', 'is_ready_to_play']

class PlayerSerializer(serializers.ModelSerializer):
    tournaments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Player
        fields = ['id', 'name', 'tournaments']


class TournamentSerializer(serializers.ModelSerializer):
    stages = StageSerializer(many=True)
    players = PlayerSerializer(many=True)
    class Meta:
        model = Tournament
        fields = ['id', 'can_join', 'tournament_id', 'tournament_name', 'start_datetime', 'end_datetime', 'number_of_players', 'is_accessible', 'access_password', 'stages', 'players']
