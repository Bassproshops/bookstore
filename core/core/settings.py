

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-1$v=+_x8_n5&hx%trzm+1*v6-n@)971!&*k_9v$*k6-)vbs73y'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = [
    'localhost',
    '192.168.1.81',
    'test.grizzlytechstore.com'
    'bookstore.grizzlytechstore.com',
    'bookstore.grizzlytechstore.com'
]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # ? Own apps
    'users',
    'products',
    'cart',
    'orders',

    # ?Third Parties
    'rest_framework',
    'django_filters',
    'corsheaders'
]

MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['/templates'],
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

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'HOST': 'localhost',
        'USER': 'raul',
        'PASSWORD': '',
        'NAME': 'book_store',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'es-mx'

TIME_ZONE = 'America/Mexico_City'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ? Rest Framework

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'core.auth.TokenAuth',
    ]
}


# ? WhiteNoise configuration

WHITENOISE_AUTOREFRESH = True
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# ? Cors Config

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:4000',
    'http://192.168.1.81',
    'http://192.168.1.81:3000',
    'http://192.168.1.81:4000',
    'http://bookstore.grizzlytechstore.com',
    'http://test.grizzlytechstore.com',
    'http://bookstore.grizzlytechstore.com',
    'http://bookstore.grizzlytechstore.com:8000',
]

CORS_ALLOW_CREDENTIALS = True

# ? Users Config

AUTH_USER_MODEL = 'users.User'


# ? Auth config

JWT_KEY = 'kladflkajkfj3q049tuafdjkaf9823tadsfadasfafadfsadfasdfasdfasdfaf23t243t254t3y36554645345234'
ALGORITHM = 'HS256'

# ? Strp
STR_KEY = "sk_test_51IuiHqKwNak06cqUgoyshSxCRSc5saX06X6KXArqL0Dy7HT6WwZBhKsLjkFE8NyMFLM2G91q5PS3KBY2BKTSvMBh005QPfmXHp"


# ? Email config



URL_FOR_EMAIL_ORDER = 'http://bookstore.grizzlytechstore.com/admin/ordenes'
PAGE_URL = 'http://test.grizzlytechstore.com'
