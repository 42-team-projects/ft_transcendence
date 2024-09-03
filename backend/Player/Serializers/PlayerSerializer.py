from rest_framework import serializers
from ..Models.PlayerModel import Player
from .LinksSerializer import LinksSerializer
from .StatsSerializer import StatsSerializer
from .AchievementsSerializer import AchievementsSerializer
from accounts.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar', 'is_2fa_enabled']

class PlayerSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    links = LinksSerializer(many=True, required=False)
    stats = StatsSerializer(required=False)
    achievements = AchievementsSerializer(many=True, required=False)
    class Meta:
        model = Player
        fields = ['id', 'user', 'fullName', 'profile_picture', 'cover', 'joinDate', 'active', 'stats', 'achievements', 'links']


class CustomPlayer(serializers.ModelSerializer):
    user = UserSerializer()
    stats = StatsSerializer()
    class Meta:
        model = Player
        fields = ['id', 'user', 'active', 'stats']
