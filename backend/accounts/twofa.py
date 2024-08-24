from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
import pyotp
import qrcode
from io import BytesIO
import base64
from PIL import Image


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def enable_2fa(request):
    secret_key = pyotp.random_base32()

    # print ("secret_key ---> ", secret_key)
    username = request.user.username
    # print ("username ---> ", username)
    provisioning_uri = pyotp.totp.TOTP(secret_key).provisioning_uri(name=username, issuer_name='ft_transcendence')
    # print ("uri ---> ", provisioning_uri)

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
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def verify_2fa(request):
    otp = request.GET.get('otp')
    # print ("otp----> ", otp)

    totp = pyotp.TOTP(request.user.totp_secret_key)
    if totp.verify(otp):
        request.user.is_2fa_enabled = True
        request.user.save()
        return Response({"message": "2FA verification successful"})
    else:
        return Response({"error": "Invalid OTP"}, status=400)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def disable_2fa(request):
    if not request.user.is_2fa_enabled:
        return Response({"message": "2FA is already disabled"})

    request.user.is_2fa_enabled = False
    request.user.totp_secret_key = None
    request.user.save()
    return Response({"message": "2FA disabled successfully"})