import jwt
from django.conf import settings
from users.models import User
from rest_framework import authentication
import datetime

class TokenAuth(authentication.BaseAuthentication):
    def authenticate(self, request):
        
        if not request.COOKIES.get('jwt'):
            return None
        
        try:
            token = request.COOKIES.get('jwt')
            payload = jwt.decode(token, settings.JWT_KEY, settings.ALGORITHM)
            if payload['exp'] < int(datetime.datetime.utcnow().timestamp()):
                return None
            user = User.objects.get(pk = payload['id'])
 
        except Exception as e:
            print(e)
            return None
        return (user ,None)