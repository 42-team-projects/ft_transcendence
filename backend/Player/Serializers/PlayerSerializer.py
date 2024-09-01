from rest_framework import serializers
from ..Models.PlayerModel import Player
from .LinksSerializer import LinksSerializer
from .StatsSerializer import StatsSerializer
from .AchievementsSerializer import AchievementsSerializer
from accounts.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar']

class PlayerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    links = LinksSerializer(many=True)
    stats = StatsSerializer() 
    achievements = AchievementsSerializer(many=True)
    class Meta:
        model = Player
        fields = ['id', 'user', 'fullName', 'profile_picture', 'cover', 'joinDate', 'active', 'stats', 'achievements', 'links']
