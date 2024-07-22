from .models import OTP, User
from rest_framework import generics
from .serializers import UserRegisterSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework import status
from .utils import send_otp, send_confirmation_email, gen_email_token
from rest_framework.decorators import api_view, permission_classes
from django_ratelimit.decorators import ratelimit
from rest_framework.permissions import AllowAny
from django.conf import settings
import jwt

class UserRegisterView(generics.GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer=self.serializer_class(data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            user = serializer.save()
            token = gen_email_token(user)
            send_confirmation_email(user, request, token)
            return Response({
                'message': f"Thank you for registering, {user.username}. A confirmation email has been sent to your email address.",
                'data': UserRegisterSerializer(user).data,
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyOTPView(generics.GenericAPIView):
    def post(self, request):
        otp_code = request.data.get('otp')
        try:
            otp = OTP.objects.get(otp=otp_code)
            user = otp.user
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({'status': 'success', 'message': 'OTP verified successfully'}, status=status.HTTP_200_OK)
            return Response({'status': 'error', 'message': 'User is already verified'}, status=status.HTTP_400_BAD_REQUEST)
        except OTP.DoesNotExist:
            return Response({'status': 'error', 'message': 'OTP does not exist'}, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request':request})
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        else:
            return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

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
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
        return Response({'status': 'error', 'message': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
@ratelimit(key='ip', rate='2/d', block=True)
def resend_confirmation_email(request):
    token = request.data.get('token')    
    
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'], options={'verify_exp': False})
        email = payload['email']
        user = User.objects.get(email=email)
        if user.is_verified:
            return Response({'status': 'success', 'message': 'Email is already confirmed'}, status=status.HTTP_200_OK)

        new_token = gen_email_token(user)
        send_confirmation_email(user, request, new_token)
        return Response({'status': 'success', 'message': 'Confirmation email sent'}, status=status.HTTP_200_OK)
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
        return Response({'status': 'error', 'message': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)