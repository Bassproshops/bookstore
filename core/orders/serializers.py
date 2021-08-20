from products.serializers import ProductSerializer
from rest_framework import serializers
from users.serializers import UserSerializer

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderItemSerializerList(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'



class OrderSerializerList(serializers.ModelSerializer):
    order_items = OrderItemSerializerList(many = True)
    class Meta:
        model = Order
        fields = '__all__'


class UpdateOrderStatus(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status']


class OrderSerializerListAdmin(serializers.ModelSerializer):
    order_items = OrderItemSerializerList(many = True)
    user = UserSerializer()
    class Meta:
        model = Order
        fields = '__all__'


class FacturaSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['factura']
        model = Order