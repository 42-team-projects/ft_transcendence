from rest_framework import serializers
from .models import *
from accounts.models import User
# from Player.Serializers.PlayerSerializer import UserSerializer


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['id','sender', 'receiver', 'is_active']