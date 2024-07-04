from rest_framework import generics
from .serializers import UserRegisterSerializer, LoginSerializer, ConfirmEmailSerializer
from rest_framework.response import Response
from rest_framework import status
from .utils import send_otp, send_confirmation_email, custom_token_generator
from .models import OTP, User
# from datetime import timedelta, datetime
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed


class UserRegisterView(generics.GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        serializer=self.serializer_class(data=request.data)
        if (serializer.is_valid(raise_exception=True)):
            user = serializer.save()
            token = custom_token_generator.make_token(user)
            send_confirmation_email(user, request, token)
            return Response({
                'message': f"Thank you for registering, {user.username}.",
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

class ConfirmEmailView(generics.GenericAPIView):
    serializer_class = ConfirmEmailSerializer

    def get(self, request, uidb64, token):
        serializer = self.get_serializer(data={'uidb64': uidb64, 'token': token})
        serializer.is_valid(raise_exception=True)
        return Response({'status': 'success', 'message': 'Email confirmed successfully'}, status=status.HTTP_200_OK)
