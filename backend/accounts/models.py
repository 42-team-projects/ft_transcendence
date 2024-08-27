from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.translation import gettext as _
from .managers import UserManager

AUTH_PROVIDERS = {'email':'email', 'google':'google', 'github':'github'}

class User(AbstractBaseUser, PermissionsMixin):
    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        related_name='accounts_user_set',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        related_name='accounts_user_set',
    )
    username = models.CharField(max_length=255, unique=True, verbose_name=_('Username'))
    email = models.EmailField(max_length=255, unique=True, verbose_name=_('Email Address'))

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    auth_provider = models.CharField(max_length=50, default=AUTH_PROVIDERS.get("email")) 
    totp_secret_key = models.CharField(max_length=50, null=True, blank=True)
    is_2fa_enabled = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = UserManager()

    def __str__(self) -> str:
        return self.email

    @property
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        # print(refresh)
        tokens = {
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
        }
        return tokens

class OTP(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp = models.IntegerField()

    def __str__(self) -> str:
        return f"{self.user.username}--otpcode"