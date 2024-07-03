from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from datetime import datetime
from .utils import custom_token_generator

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

class ConfirmEmailSerializer(serializers.Serializer):
    uidb64 = serializers.CharField()
    token = serializers.CharField()

    def validate(self, data):
        try:
            uid = force_str(urlsafe_base64_decode(data['uidb64']))
            user = User.objects.get(pk=uid)

            if user.is_verified:
                raise serializers.ValidationError("This user has already been verified.")
            if not custom_token_generator.check_token(user, data['token']):
                raise serializers.ValidationError('Invalid token')
            
            user.is_verified = True
            user.save()
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError('Invalid confirmation link')
        return data
