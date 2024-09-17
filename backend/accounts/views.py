from .models import User
from rest_framework import generics
from .serializers import UserRegisterSerializer, LoginSerializer
from rest_framework.response import Response
from django.core.mail import EmailMessage
from rest_framework import status
from .utils import send_confirmation_email, gen_email_token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db import IntegrityError
from django.core.exceptions import ValidationError
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
    if data['is_2fa_enabled']:
        user = User.objects.get(email=data['email'])
        response = Response({
            'message': '2FA verification required',
            'is_2fa_enabled': data['is_2fa_enabled'],
        }, status=status.HTTP_401_UNAUTHORIZED)
        response.set_cookie(key='temp_token', value=str(user.id), httponly=True, samesite='None', secure=True)
        return response
    
    else:
        response = Response({
            'access_token': data['access_token'],
        })
        response.set_cookie(key='refresh_token', value=data['refresh_token'], httponly=True, samesite='None', secure=True)
        return response

@api_view(['POST'])
def refresh(request):
    refresh_token = request.COOKIES.get('refresh_token')

    if refresh_token is None:
        return Response({'error': 'Authentication credentials were not provided.'}, status=status.HTTP_403_FORBIDDEN)

    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=['HS256'])
        if not User.objects.filter(id=payload['user_id']).exists():
            return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.get(id=payload['user_id'])
        
        tokens = user.tokens
        response = Response({
            # 'email': user.email,
            # 'username': user.username,
            'access_token': tokens['access_token'],
        })
        response.set_cookie(key='refresh_token', value=tokens['refresh_token'], httponly=True, samesite='None', secure=True)
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
    return Response({'username': request.user.username, 'id': request.user.id, })

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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token is None:
            raise KeyError
        token = RefreshToken(refresh_token)
        token.blacklist()
    except (InvalidToken, TokenError, KeyError):
        return Response({'status': 'error', 'message': 'Invalid or missing refresh token.'}, status=status.HTTP_400_BAD_REQUEST)

    response = Response(status=status.HTTP_205_RESET_CONTENT)
    response.delete_cookie('refresh_token')
    return response

@api_view(['POST'])
def verify_token(request):
    try:
        token = request.headers.get('Authorization').split()[1]
        validated_token = JWTAuthentication().get_validated_token(token)
        user_id = validated_token['user_id']

        # print('--->', User.objects.get(id=user_id))
        if not User.objects.filter(id=user_id).exists():
            return Response({'status': 'error', 'message': 'User does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'status': 'success', 'message': 'Token is valid.'}, status=status.HTTP_200_OK)
    except (InvalidToken, TokenError):
        return Response({'status': 'error', 'message': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    data = request.data

    try:
        username = data.get('username')
        if username:
            user.username = username
            
        avatar = data.get('avatar')
        if avatar:
            user.avatar = avatar
        
        password = data.get('password')
        if password:
            user.set_password(password)
    
        user.full_clean()
        user.save()

        return Response({'status': 'success', 'message': 'User updated.'}, status=status.HTTP_200_OK)

    except IntegrityError:
        return Response({'status': 'error', 'message': 'Username already taken.'}, status=status.HTTP_400_BAD_REQUEST)
    except ValidationError as e:
        return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def report_to_support(request):
    data = request.data
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not message:
        return Response({'status': 'error', 'message': 'Message is required.'}, status=status.HTTP_400_BAD_REQUEST)
    if not email:
        return Response({'status': 'error', 'message': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
    if not name:
        return Response({'status': 'error', 'message': 'Name is required.'}, status=status.HTTP_400_BAD_REQUEST)

    support_email = settings.EMAIL_HOST_USER
    mail_subject = f'Support Request from {name}'
    body = f'Name: {name}<br>Email: {email}<br>Message: {message}'
    email = EmailMessage(
        mail_subject,
        body,
        settings.EMAIL_HOST_USER,
        [support_email],
    )
    email.content_subtype = 'html'
    email.send(fail_silently=False)

    return Response({'status': 'success', 'message': 'Support request sent.'}, status=status.HTTP_200_OK)