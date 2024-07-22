from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserRegisterView.as_view(), name='register'),
    
    # path('verify-email/', VerifyOTPView.as_view(), name='verify'),
    path('confirm-email/<str:token>/', views.confirm_email_view, name='confirm-email'),
    path('resend-confirm/', views.resend_confirmation_email, name='resend_confirmation_email'),

    path('login/', views.LoginUserView.as_view(), name='login'),
]
