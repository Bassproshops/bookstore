from .models import Product, Category
from rest_framework import serializers
from django.conf import settings

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductSerializerList(serializers.ModelSerializer):

    image = serializers.SerializerMethodField('get_photo_url')
    category = CategorySerializer()
    class Meta:
        model = Product
        fields = '__all__'

    def get_photo_url(self, obj):
        photo_url = obj.image.url
        return f'{settings.PAGE_URL}{photo_url}'

