from rest_framework import serializers
from ..Models.PlayerModel import Player
from .LinksSerializer import LinksSerializer
from .StatsSerializer import StatsSerializer, DefaultStatsSerializer
from .AchievementsSerializer import AchievementsSerializer
from accounts.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar', 'is_2fa_enabled', 'auth_provider']


class DefaultPlayerSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    stats = DefaultStatsSerializer(required=False)
    class Meta:
        model = Player
        fields = ['id', 'user', 'fullName', 'cover', 'joinDate', 'active', 'stats', 'is_friend']

class PlayerSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    links = LinksSerializer(many=True, required=False)
    stats = StatsSerializer(required=False)
    achievements = AchievementsSerializer(many=True, required=False)
    class Meta:
        model = Player
        fields = ['id', 'user', 'fullName', 'cover', 'joinDate', 'active', 'stats', 'achievements', 'links', 'is_friend']


class CustomPlayerSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    stats = DefaultStatsSerializer(required=False)
    class Meta:
        model = Player
        fields = ['id', 'user', 'active', 'stats']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    links = LinksSerializer(many=True, required=False)
    stats = StatsSerializer(required=False)
    achievements = AchievementsSerializer(many=True, required=False)
    class Meta:
        model = Player
        fields = ['id', 'user', 'fullName', 'cover', 'joinDate', 'active', 'stats', 'achievements', 'links', 'is_friend']
