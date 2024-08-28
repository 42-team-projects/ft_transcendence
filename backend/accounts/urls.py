from django.urls import path
from . import password_reset
from . import views
from . import oauth
from .twofa import enable_2fa, verify_2fa, disable_2fa
from .views import user_data

urlpatterns = [
    path('register/', views.UserRegisterView.as_view(), name='register'),
    path('login/', views.login, name='login'),
    
    path('confirm-email/<str:token>/', views.confirm_email_view, name='confirm-email'),
    path('resend-confirm/', views.resend_confirmation_email, name='resend_confirmation_email'),


    path('reset-password/', password_reset.reset_password, name='reset-password'),
    path('verify-token/<str:token>/', password_reset.verify_token, name='verify-token'), 
    path('confirm-reset-password/<str:token>/', password_reset.confirm_reset_password, name='confirm-reset-password'),


    path('whoami/', views.whoami, name='whoami'),
    path('refresh/', views.refresh, name='refresh_token'),

    path('<str:provider>/redirect/', oauth.redirect_to_provider, name='redirect_to_provider'),
    path('<str:provider>/oauth_callback/', oauth.oauth_callback, name='oauth_callback'),
    
    
    path('2fa/enable/', enable_2fa, name='enable_2fa'),
    path('2fa/verify/', verify_2fa, name='verify_2fa'),
    path('2fa/disable/', disable_2fa, name='disable_2fa'),

    path('user-data/', views.user_data, name='user_data'),
]
