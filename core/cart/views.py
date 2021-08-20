from django.shortcuts import render

from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .serializers import *
from products.models import Product
from users.models import User
from core.permissions import *
from .models import Cart


# Create your views here.


class ListCartItems(generics.ListAPIView):
    permission_classes = [IsOwner, permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        products = Cart.objects.all().filter(user = request.user.id)
        serializer = CartSerializerList(products, many = True)
        return Response(data = serializer.data, status = status.HTTP_200_OK)

class AddToCart(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, *args, **kwargs):
        user = request.user.id

        product = Product.objects.all().filter(slug = request.data['product']).first()
        searchForProduct = Cart.objects.all().filter(user = user, product = product.id).first()

        if searchForProduct is not None:
            quantity = searchForProduct.quantity + int(request.data['quantity'])

            if quantity > product.stock:
                quantity = product.stock

            serializer = CartSerializer(searchForProduct, data = {'quantity':quantity}, partial = True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status = status.HTTP_202_ACCEPTED)
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        else:
            request.data['user'] = request.user.id
            request.data['product'] = product.id
            if int(request.data['quantity']) > product.stock:
                return Response(data={'Haz exedido el límite de productos'}, status = status.HTTP_400_BAD_REQUEST)

            serializer = CartSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status = status.HTTP_201_CREATED)
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class CartCrud(generics.DestroyAPIView, generics.UpdateAPIView):

    permission_classes = [IsOwner, permissions.IsAuthenticated]
    queryset = Cart.objects.all()
    serializer_class = UpdateCartSerializer

    def put():
        return Response()
    


