from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from accounts.models import User
from io import BytesIO
from PIL import Image
import pyotp, qrcode, base64


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def enable_2fa(request):
    secret_key = pyotp.random_base32()

    username = request.user.username
    provisioning_uri = pyotp.totp.TOTP(secret_key).provisioning_uri(name=username, issuer_name='ft_transcendence')

    qr = qrcode.make(provisioning_uri)
    qr_bytes = BytesIO()
    qr_img = Image.new('RGB', (qr.pixel_size, qr.pixel_size), 'white')
    qr_img.paste(qr.get_image(), (0, 0))
    qr_img.save(qr_bytes, format='PNG')
    qr_bytes = qr_bytes.getvalue()
    qr_b64 = base64.b64encode(qr_bytes).decode()

    request.user.totp_secret_key = secret_key
    request.user.save()

    return Response({"qr_code": qr_b64})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verify_2fa(request):
    otp = request.GET.get('otp')

    totp = pyotp.TOTP(request.user.totp_secret_key)
    if totp.verify(otp):
        request.user.is_2fa_enabled = True
        request.user.save()
        return Response({"message": "2FA verification successful"})
    else:
        return Response({"error": "Invalid OTP"}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def disable_2fa(request):
    if not request.user.is_2fa_enabled:
        return Response({"message": "2FA is already disabled"})

    request.user.is_2fa_enabled = False
    request.user.totp_secret_key = None
    request.user.save()
    return Response({"message": "2FA disabled successfully"})

@api_view(['POST'])
def verify_2fa_code(request):
    code = request.data.get('code')
    if not code:
        return Response({"message": "2FA code is required"}, status=400)
    
    user_id = request.COOKIES.get('temp_token')
    if not user_id:
        return Response({"message": "You're not authorized to access this resource"}, status=401)
    
    user = User.objects.get(id=user_id)

    totp = pyotp.TOTP(user.totp_secret_key)
    if totp.verify(code):
        tokens = user.tokens
        response = Response({
            'message': '2FA code verification successful',
            'access_token': tokens['access_token'],
        }, status=status.HTTP_200_OK)
        
        response.delete_cookie('temp_token')
        response.set_cookie(key='refresh_token', value=tokens['refresh_token'], httponly=True, samesite='None', secure=True)
        return response
    
    else:
        return Response({"message": "Invalid 2FA code"}, status=400)