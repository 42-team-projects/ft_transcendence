from rest_framework import serializers
from .models import User, User_Profile, Links, Graph, Stats, Achievements

class UserSerializer(serializers.ModelSerializer):
    # profile = UserProfileSerializer()
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']

class LinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Links
        fields = ['title', 'url']

class GraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = Graph
        fields = ['label', 'value']
class StatsSerializer(serializers.ModelSerializer):
    graph = GraphSerializer(many=True)
    class Meta:
        model = Stats
        fields = ['id','win', 'loss', 'rank', 'league', 'graph']

class AchievementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievements
        fields = ['name', 'img']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    links = LinksSerializer(many=True)
    stats = StatsSerializer()
    achievements = AchievementsSerializer(many=True)
    class Meta:
        model = User_Profile
        fields = ['id', 'user', 'profile_picture', 'joinDate', 'active', 'links', 'stats', 'achievements']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
        
        return super().update(instance, validated_data)