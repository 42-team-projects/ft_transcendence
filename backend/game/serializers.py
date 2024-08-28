from rest_framework import serializers
from .models import Player

# class PlayerSerializer(serializers.ModelSerializer):
#     tournaments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
#     class Meta:
#         model = Player
#         fields = "__all__"

