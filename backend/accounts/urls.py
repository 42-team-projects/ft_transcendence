from django.urls import path
from .views import UserRegisterView, VerifyOTPView, LoginUserView, ConfirmEmailView

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    # path('verify-email/', VerifyOTPView.as_view(), name='verify'),
    path('confirm-email/<uidb64>/<token>/', ConfirmEmailView.as_view(), name='confirm'),
    path('login/', LoginUserView.as_view(), name='login'),
]