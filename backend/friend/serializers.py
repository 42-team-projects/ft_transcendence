from rest_framework import serializers
from .models import *
from accounts.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'is_active']

class FriendshipSerializer(serializers.ModelSerializer):
    friends = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Friendship
        fields = ['friends']

class FriendRequestSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    receiver = UserSerializer()
    class Meta:
        model = FriendRequest
        fields = ['id','sender', 'receiver', 'is_active']

