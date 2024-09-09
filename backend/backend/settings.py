from pathlib import Path
from datetime import timedelta
import environ, os

env = environ.Env(

    # can expose sensitive information in (logs)
    DEBUG=(bool, False)
)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(BASE_DIR.parent / '.env')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = 'django-insecure-#9s2!%+fj#b-^+cwwe6#yym$zc1csinht_z0$6_z$^w92_&y6^'
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
DEBUG = env('DEBUG')

ALLOWED_HOSTS = ['*']
# ALLOWED_HOSTS = ['localhost', '127.0.0.1']



# Application definition

INSTALLED_APPS = [
    'daphne', #new
    'channels',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework', #new
    'corsheaders', #new

    # 'Tournament', #new
    'tournament', #new
    'game', #new
    'Player', #new
    'accounts',
    'rest_framework_simplejwt.token_blacklist', # ogorfti


    'chat',          #dokoko
    'notification',  #dokoko
    

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware', # new
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    

    'django.middleware.csrf.CsrfViewMiddleware',  # Ensure this is included
]



CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOWED_ORIGINS = [
    'http://localhost:8080',  # Example: Your frontend origin
    'http://127.0.0.1:8080',   # Another example: Your frontend origin
    # Add more origins as needed

    'http://localhost:5501',  # Example: Your frontend origin
    'http://127.0.0.1:5501',
    'http://127.0.0.1:5500',
    'http://127.0.0.1:3000',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 'DIRS': [],
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'
ASGI_APPLICATION = 'backend.asgi.application' #new

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    },
}

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('POSTGRES_DB'),
        'USER': env('POSTGRES_USER'),
        'PASSWORD': env('POSTGRES_PASSWORD'),
        'HOST': 'database',
        'PORT': '5432',
    }
}

AUTH_USER_MODEL="accounts.User"

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(weeks=4),
    "AUTH_HEADER_TYPES": ("Bearer",),
    "BLACKLIST_AFTER_ROTATION": True,
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

MEDIA_URL = '/media/'

MEDIA_ROOT = BASE_DIR / 'media'


# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         'console': {
#             'level': 'DEBUG',
#             'class': 'logging.StreamHandler',
#         },
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['console'],
#             'level': 'DEBUG',
#         },
#         # You can define your app logger here as well
#         'TournamentApp': {
#             'handlers': ['console'],
#             'level': 'DEBUG',
#             'propagate': True,
#         },
#     },
# }


# DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
FRONTEND_BASE_URL = env('FRONTEND_BASE_URL')
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
EMAIL_PORT = 587
EMAIL_USE_TLS = True

OAUTH_PROVIDERS = {
    'INTRA': {
        'CLIENT_ID': env('INTRA_CLIENT_ID'),
        'CLIENT_SECRET': env('INTRA_CLIENT_SECRET'),
        'REDIRECT_URI': env('INTRA_REDIRECT_URI'),
        'AUTHORIZE_URL': 'https://api.intra.42.fr/oauth/authorize',
        'TOKEN_URL': 'https://api.intra.42.fr/oauth/token',
        'USER_INFO_URL': 'https://api.intra.42.fr/v2/me',
        'SCOPE': 'public',
        'USER_ID_FIELD': 'login',
    },
    'GOOGLE': {
        'CLIENT_ID': env('GOOGLE_CLIENT_ID'),
        'CLIENT_SECRET': env('GOOGLE_CLIENT_SECRET'),
        'REDIRECT_URI': env('GOOGLE_REDIRECT_URI'),
        'AUTHORIZE_URL': 'https://accounts.google.com/o/oauth2/v2/auth',
        'TOKEN_URL': 'https://oauth2.googleapis.com/token',
        'USER_INFO_URL': 'https://openidconnect.googleapis.com/v1/userinfo',
        'SCOPE': 'profile email',
        'USER_ID_FIELD': 'given_name',
    },
}
