from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from .google import Google, register_social_user
from django.conf import settings

class UserRegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, min_length=8, max_length=128)
    password2 = serializers.CharField(write_only=True, min_length=8, max_length=128)
    
    class Meta:
        model = User
        fields = ["email", "username", "password1", "password2"]
    
    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Passwords must match.")
        return data

    def create(self, validated_data):

        user = User.objects.create_user(
            email = validated_data.get('email'),
            username = validated_data.get('username'),
            password = validated_data.get('password1'),
        )
        return user

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=6)
    password = serializers.CharField(max_length=128, write_only=True)
    username = serializers.CharField(max_length=255, read_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'username', 'access_token', 'refresh_token']
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = self.context.get('request')
        user = authenticate(request=request, email=email, password=password)

        if not user:
            raise AuthenticationFailed('Invalid email or password')
        if not user.is_verified:
            raise AuthenticationFailed('Email is not verified')
        
        tokens = user.tokens
        return {
            'email': user.email,
            'username': user.username,
            'access_token': tokens['access_token'],
            'refresh_token': tokens['refresh_token'],
        }

class GoogleSerializer(serializers.Serializer):
    access_token = serializers.CharField(min_length=6)

    def validate(self, data):
        access_token = data.get('access_token')

        google_user_data = Google.validate(access_token)
        try:
            uid = google_user_data["user_id"]
        except:
            raise serializers.ValidationError("this token is invalid or has expired **")
        if google_user_data["audience"] != settings.GOOGLE_CLIENT_ID:
            raise serializers.ValidationError(detail="could not verify user")
        
        
        # register user
        email = google_user_data["email"]
        username = google_user_data["email"].split('@')[0]
        provider = 'google'

        return register_social_user(provider=provider, email=email, username=username)