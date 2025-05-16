from pathlib import Path
import os
import dj_database_url
from datetime import timedelta
from dotenv import load_dotenv
load_dotenv()


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY')

DEBUG = True #changed for production

ALLOWED_HOSTS =  ['127.0.0.1', 'localhost','nyc-safety-indicator.software',
'nycsafetyindicator.vercel.app','www.nyc-safety-indicator.software','159.203.64.170'] 

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'rest_framework',
    'rest_framework.authtoken',
    "corsheaders",
    'users',
    'safety_report',
    'reviews',

]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication', 
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',  
    ],
}

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    
]
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend'
]

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
}

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "crime_news_cache",
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'nycsafetyapp@gmail.com'  
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")

NEWS_DATA_API = os.getenv("NEWS_DATA_API")

GOOGLE_CLIENT_ID = os.getenv("CLIENT_ID")
GOOGLE_SECRET_KEY = os.getenv("SECRET_KEY")

LOGIN_REDIRECT_URL = '/'  
LOGOUT_REDIRECT_URL = '/'

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'https://nycsafetyindicator.vercel.app',
    'https://nyc-safety-indicator.software',
]
CORS_ALLOW_CREDENTIALS = True
AUTH_USER_MODEL = 'users.CustomUser'
ROOT_URLCONF = "server.urls"
MAIL_GUN = os.getenv("MAIL_GUN_API")


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "server.wsgi.application"


DATABASES = {
    "default": dj_database_url.config(
        default=os.getenv("SUPABASE_DATABASE_URL"),
        engine="django.db.backends.postgresql",
        conn_max_age=600,
    )
}

# Manually add search_path to OPTIONS
DATABASES["default"]["OPTIONS"] = {
    "options": "-c search_path=public"
}


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True



STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
