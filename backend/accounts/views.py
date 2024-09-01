from .models import User
from rest_framework import generics
from .serializers import UserRegisterSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework import status
from .utils import send_confirmation_email, gen_email_token
from rest_framework.decorators import api_view, permission_classes
from django_ratelimit.decorators import ratelimit
from rest_framework.permissions import AllowAny,IsAuthenticated

from django.conf import settings
import jwt

class UserRegisterView(generics.GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer=self.serializer_class(data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            user = serializer.save()
            token = gen_email_token(user, days=7)
            send_confirmation_email(user, request, token)
            return Response({
                'message': f"Thank you for registering, {user.username}. A confirmation email has been sent to your email address.",
                'data': UserRegisterSerializer(user).data,
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data, context={'request': request})
    if not serializer.is_valid():
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data
    response = Response({
        'email': data['email'],
        'username': data['username'],
        'access_token': data['access_token'],
    })
    response.set_cookie(key='refresh_token', value=data['refresh_token'], httponly=True)
    return response

@api_view(['POST'])
def refresh(request):
    refresh_token = request.COOKIES.get('refresh_token')

    if refresh_token is None:
        return Response({'error': 'Authentication credentials were not provided.'}, status=status.HTTP_403_FORBIDDEN)

    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(id=payload['user_id'])
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
        tokens = user.tokens
        response = Response({
            'email': user.email,
            'username': user.username,
            'access_token': tokens['access_token'],
        })
        response.set_cookie(key='refresh_token', value=tokens['refresh_token'], httponly=True)
        return response
    except jwt.ExpiredSignatureError:
        return Response({'error': 'Refresh token expired'}, status=status.HTTP_403_FORBIDDEN)
    except jwt.InvalidTokenError:
        return Response({'error': 'Invalid token'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes([AllowAny])
def confirm_email_view(request, token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(id=payload['user_id'])

        if user.is_verified:
            return Response(
                {'status': 'success', 'message': 'Email is already confirmed'}, 
                status=status.HTTP_200_OK
            )
        elif user.email == payload['email']:
            user.is_verified = True
            user.save()
            return Response(
                {'status': 'success', 'message': 'Email confirmed successfully'}, 
                status=status.HTTP_200_OK
            )
        else:
            return Response({'status': 'error', 'message': 'Email could not be confirmed'}, status=status.HTTP_400_BAD_REQUEST)
    except jwt.ExpiredSignatureError:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'], options={'verify_exp': False})
        user = User.objects.get(id=payload['user_id'])
        if user.is_verified:
            return Response(
                {'status': 'success', 'message': 'Email is already confirmed'}, 
                status=status.HTTP_200_OK
            )
        new_token = gen_email_token(user, days=7)
        send_confirmation_email(user, request, new_token)
        return Response({'status': 'error', 'message': 'Link expired. A new confirmation email has been sent.'}, status=status.HTTP_400_BAD_REQUEST)
    except (jwt.InvalidTokenError, User.DoesNotExist):
        return Response({'status': 'error', 'message': 'Invalid link'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def whoami(request):
    return Response({'username': request.user.username})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_data(request):
    user = request.user
    user_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'avatar': user.avatar,
    }
    return Response(user_data)
