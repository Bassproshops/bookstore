
from rest_framework import serializers
from products.serializers import ProductSerializer
from .models import Cart

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class CartSerializerList(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = Cart
        fields = '__all__'

class UpdateCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['quantity']