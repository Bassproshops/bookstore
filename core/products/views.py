from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.pagination import PageNumberPagination
from core.permissions import *
from .serializers import *
from .models import Product, Category
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
import os
from orders.models import Order

##?Pagination Class
class Pagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 30

##?Filter

class PriceFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        minPrice = request.GET.get('minPrice', None)
        maxPrice = request.GET.get('maxPrice', None)
        if(minPrice is None or maxPrice is None):
            return queryset
        return queryset.filter(price__gte=minPrice, price__lte=maxPrice)

##?Admin Methods

#* Category Admin Methods


class CreateCategory(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsStaff]
    
class CategoryCrud(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'slug'
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [IsStaff]

    def delete(self, request, *args, **kwargs):
        slug = self.kwargs['slug']
        try:
            category = Category.objects.all().filter(slug=slug).first()
            products = Product.objects.all().filter(category = category.id)
            for i in products:
                if(os.path.exists(i.image.path)):
                    os.remove(i.image.path)
            Category.objects.filter(slug = slug).delete()
            return Response(status = status.HTTP_200_OK)
        except:
            return Response(status = status.HTTP_400_BAD_REQUEST)

    

class RetrieveCategory(generics.RetrieveAPIView):
    lookup_field = 'slug'
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

#*Product Admin Methods


class ListProductsAdmin(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializerList
    pagination_class = Pagination
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['stock']
    search_fields = ['name', 'description', 'id']

class CreateProduct(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsStaff]


class ProductCrud(generics.UpdateAPIView, generics.DestroyAPIView):

    permission_classes = [IsStaff]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    def delete(self, request, *args, **kwargs):
        slug = self.kwargs['slug']
        product = Product.objects.filter(slug = slug).first()

        imagePath = product.image.path
        if(os.path.exists(imagePath)):
            os.remove(imagePath)
        product.delete()

        return Response(data = {"success": "El producto se a eliminado exitosamente"}, status = status.HTTP_202_ACCEPTED)
    
    def patch(self, request, *args, **kwargs):
        slug = self.kwargs['slug']
        product = Product.objects.filter(slug = slug).first()
        serializer = ProductSerializer(product, request.data, partial = True)
        if 'image' in request.data:
            imagePath = product.image.path
            if os.path.exists(imagePath):
                os.remove(imagePath)

        if serializer.is_valid():
            serializer.save()
            return Response(data = serializer.data, status = status.HTTP_202_ACCEPTED)

        else:
            return Response(data = serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    def put(self, request, *args, **kwargs):
        return Response()

##?Friendly Methods

class ListProducts(generics.ListAPIView):
    queryset = Product.objects.all().order_by('-popularity')
    serializer_class = ProductSerializerList
    pagination_class = Pagination
    filter_backends = [filters.SearchFilter, PriceFilter, filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['category', 'deal']
    search_fields = ['name', 'description']
    ordering_fields = ['popularity', 'price','created_at']

class RetrieveProduct(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializerList
    lookup_field = 'slug'

class RetrieveCategoryProducts(generics.ListAPIView):
    def get(self, request, *args, **kwargs):
        slug = self.kwargs['slug']
        category = Category.objects.all().filter(slug = slug).first()
        if category is None:
            return Response(data = {"errror": "No hemos encontrado esa categoría."}, status = status.HTTP_404_NOT_FOUND)

        products = Product.objects.all().filter(category = category.id)
        
        if len(products) > 0 :
            serializer = ProductSerializerList(products, many = True)
            return Response(data = serializer.data ,status = status.HTTP_200_OK)

        return Response(data = {"error": "No hay productos relacionados con está categoría."},status = status.HTTP_404_NOT_FOUND)

class ListCategories(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BoostPopularity(generics.UpdateAPIView):
    def patch(self, request, *args, **kwargs):
        try:
            slug = self.kwargs['slug']
            product = Product.objects.all().filter(slug = slug).first()
            if(product is not None):
                popularity = {"popularity": product.popularity + 1}
                serializer = ProductSerializer(product, data = popularity, partial = True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(data = serializer.data, status = status.HTTP_202_ACCEPTED) 
                return Response(data = serializer.errors, status = status.HTTP_400_BAD_REQUEST)
            return Response(data = {"errors":"Not Found"}, status = status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        return Response()



class GetMostPopularProducts(generics.ListAPIView):
    queryset = Product.objects.all().order_by('-popularity')[:10]
    serializer_class = ProductSerializerList


class Total(generics.ListAPIView):
    permission_classes = [IsStaff]
    def get(self, request, *args, **kwargs):
        orders = Order.objects.all()
        month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for i in orders:
            date = i.created_at
            monthNumber = int(date.month) - 1
            month[monthNumber] += i.total

        return Response(data = {"total":month}, status = status.HTTP_200_OK)

