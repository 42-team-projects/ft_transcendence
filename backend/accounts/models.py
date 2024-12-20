from django.db                          import models
from django.db                          import transaction

from django.contrib.auth.models         import AbstractBaseUser, PermissionsMixin
from rest_framework_simplejwt.tokens    import RefreshToken
from django.utils.translation           import gettext as _
from .managers                          import UserManager
from .utils                             import get_default_avatar

AUTH_PROVIDERS = {'email':'email', 'google':'google', 'github':'github'}

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True, verbose_name=_('Username'))
    email = models.EmailField(max_length=255, unique=True, verbose_name=_('Email Address'))

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    auth_provider = models.CharField(max_length=50, default=AUTH_PROVIDERS.get("email")) 
    totp_secret_key = models.CharField(max_length=50, null=True, blank=True)
    is_2fa_enabled = models.BooleanField(default=False)

    # new
    avatar = models.ImageField(upload_to='avatars/', default=get_default_avatar, blank=True, null=True, max_length=5000)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = UserManager()

    def __str__(self) -> str:
        return self.username

    @property
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        tokens = {
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
        }
        return tokens