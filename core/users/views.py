from django.shortcuts import render
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth import authenticate
from django.conf import settings

import jwt 
import datetime

from core.permissions import *
from .serializers import *
from .models import User

# Create your views here.

estados = [
                'Aguascalientes',
                'Baja California',
                'Baja California Sur',
                'Campeche',
                'Chiapas',
                'Chihuahua',
                'Coahuila de Zaragoza',
                'Colima',
                'Ciudad de México',
                'Durango',
                'Guanajuato',
                'Guerrero',
                'Hidalgo',
                'Jalisco',
                'Estado de Mexico',
                'Michoacan de Ocampo',
                'Morelos',
                'Nayarit',
                'Nuevo Leon',
                'Oaxaca',
                'Puebla',
                'Queretaro de Arteaga',
                'Quintana Roo',
                'San Luis Potosi',
                'Sinaloa',
                'Sonora',
                'Tabasco',
                'Tamaulipas',
                'Tlaxcala',
                'Veracruz de Ignacio de la Llave',
                'Yucatan',
                'Zacatecas',
                ];

#?Pagination

class Pagination(PageNumberPagination):
    page_size = 500
    page_query_param = 'p'



##? Views
#* Auth Methods

class Register(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data = request.data)

        if(request.data['estado'] not in estados):
            return Response(data = {"estado":"El estado seleccionado es inválido"}, status = status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            response = Response(status = status.HTTP_200_OK)
            
            payload = {
                'id': data['id'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days = 2),
                'iat': datetime.datetime.utcnow()
            }

            token = jwt.encode(payload, settings.JWT_KEY, settings.ALGORITHM) 
        
            response.set_cookie(
                key = 'jwt', 
                value = token, 
                samesite = 'strict',
                expires = datetime.datetime.utcnow() + datetime.timedelta( days = 2),
                secure = False,
                httponly = True
            )

            response.data = {
                'id': data['id']
                
            }
            return response
        else:
            return Response(data = serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class Login(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        user = authenticate(email = email, password = password)
        
        if user is not None:
            
            payload = {
                'id':user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days = 2),
                'iat': datetime.datetime.utcnow()
                
            }
            token = jwt.encode(payload, settings.JWT_KEY, settings.ALGORITHM)
            response = Response(status = status.HTTP_200_OK)
            response.set_cookie(
                key = 'jwt',
                value = token, 
                samesite = 'strict', 
                expires = datetime.datetime.utcnow() + datetime.timedelta(days = 2),
                secure = False,
                httponly = True
            )

            return response
        
        else: 
            return Response(data = {'error': 'No tenemos ningún registro con esos datos.'}, status = status.HTTP_400_BAD_REQUEST)

class Logout(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get('jwt', None)
        if token is not None:
            response = Response()
            response.status = status.HTTP_200_OK
            response.delete_cookie('jwt')
            return response
        return Response(status = status.HTTP_400_BAD_REQUEST)

class getUser(APIView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get('jwt', None)
        
        if token is not None:
            try:
                serializer = UserSerializer(request.user)
                return Response(data = serializer.data, status = 200)
            except Exception as e:
                print(e)
                return Response({'error':'No haz iniciado sesión'}, status.HTTP_401_UNAUTHORIZED)
        return Response({'error':'No haz iniciado sesión'}, status.HTTP_401_UNAUTHORIZED)


class updateUser(generics.UpdateAPIView):

    #Todo Fix State validation
    serializer_class = AddressSerializer
    queryset = User.objects.all()
    permission_classes = [IsUser]

    def patch(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user, request.data, partial = True)

        if request.data['estado'] not in estados:
            return Response({'estado':"El estado seleccionado es inválido"}, status = status.HTTP_400_BAD_REQUEST)


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        return Response()


