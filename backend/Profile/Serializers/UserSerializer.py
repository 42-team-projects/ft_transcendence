from rest_framework import serializers
from ..Models.UserModel import User

class UserSerializer(serializers.ModelSerializer):
    # profile = UserProfileSerializer()
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']

