from django.urls import path
from . import password_reset, views, oauth, twofa

urlpatterns = [
    path('register/', views.UserRegisterView.as_view(), name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    
    path('confirm-email/<str:token>/', views.confirm_email_view, name='confirm-email'),


    path('reset-password/', password_reset.reset_password, name='reset-password'),
    path('verify-token/<str:token>/', password_reset.verify_token, name='verify-token'), 
    path('confirm-reset-password/<str:token>/', password_reset.confirm_reset_password, name='confirm-reset-password'),


    path('whoami/', views.whoami, name='whoami'),
    path('refresh/', views.refresh, name='refresh_token'),
    path('verify/', views.verify_token, name='verify'),

    path('<str:provider>/redirect/', oauth.redirect_to_provider, name='redirect_to_provider'),
    path('<str:provider>/oauth_callback/', oauth.oauth_callback, name='oauth_callback'),
    
    
    path('2fa/enable/', twofa.enable_2fa, name='enable_2fa'),
    path('2fa/verify/', twofa.verify_2fa, name='verify_2fa'),
    path('2fa/disable/', twofa.disable_2fa, name='disable_2fa'),
    path('2fa/verify-code/', twofa.verify_2fa_code, name='verify_2fa_code'),

    path('user-data/', views.user_data, name='user_data'),
    path('update-user/', views.update_user, name='update_user'),
    path('report/', views.report_to_support, name='report'),
]
