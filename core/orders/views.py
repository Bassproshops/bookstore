from products.models import Product
from users.models import User
from .models import OrderItem, Order
from rest_framework import generics, status, permissions, pagination
from core.permissions import *
from rest_framework.response import Response
from .serializers import *

from django_filters.rest_framework import DjangoFilterBackend
from cart.models import Cart
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.shortcuts import render

from django.conf import settings
import stripe
import os

# ?Pagination Class
class Pagination(pagination.PageNumberPagination):
    page_size = 100
    page_query_param = 'p'


# ?Views

class UpdateOrder(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = UpdateOrderStatus
    permission_classes = [IsStaff]


# *admin
class ListOrders(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializerListAdmin
    permission_classes = [IsStaff]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status']
    pagination_class = Pagination


# *General
class Checkout(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            products = Cart.objects.all().filter(user=request.user.id)
            total = 0

            for i in products:
                product = Product.objects.all().filter(id=i.product_id).first()
                if product.deal:
                    total += product.special_price * i.quantity
                else:
                    total += product.price * i.quantity

            stripe.api_key = settings.STR_KEY
            charge = stripe.PaymentIntent.create(
                amount=int(total * 100),
                currency='MXN',
                description=f'Order from the user {request.user.id}',
                payment_method=request.data.get('id', None),
                confirm=True
            )

            if(charge['status'] == 'succeeded'):

                user = request.user
                direction = f"{user.calle} #{user.exterior_number} {f'#{user.interior_number}' if user.interior_number else ''}, {user.colonia} {user.postalcode} - {user.estado}"
                order = {
                    "total": total,
                    "user": request.user.id,
                    "direction": direction
                }

                serializer = OrderSerializer(data=order)
                if serializer.is_valid():
                    serializer.save()

                    for i in products:
                        total = 0
                        product = Product.objects.all().filter(id=i.product_id).first()
                        if product.deal:
                            total = product.special_price * i.quantity
                        else:
                            total = product.price * i.quantity
                        data = {
                            "total": total,
                            "order": serializer.data['id'],
                            "quantity": i.quantity,
                            "product": product.id
                        }
                        Product.objects.filter(id=product.id).update(
                            popularity=product.popularity + 20 * i.quantity, stock=product.stock - i.quantity)
                        # ?validating that other carts are in order related to the stock of the product
                        cartProducts = Cart.objects.all()
                        for c in cartProducts:
                            p = Product.objects.filter(id=product.id).first()
                            if p.stock == 0:
                                c.delete()

                            if c.quantity > p.stock:
                                Cart.objects.filter(id=c.id).update(
                                    quantity=p.stock)

                        if product.stock > 0:
                            orderItem = OrderItemSerializer(data=data)
                            if orderItem.is_valid():
                                orderItem.save()
                    products.delete()

                    #? Sending Email
                    context = {
                        "UserName": request.user.nombre,
                        "orderId": serializer.data['id'],
                        "total": total,
                        "url": settings.URL_FOR_EMAIL_ORDER,


                    }
                    template = get_template('orderAlert.html')
                    content = template.render(context)
                    try:
                        email = EmailMultiAlternatives(
                            'Nueva Orden',
                            'Nueva Orden',
                            settings.EMAIL_HOST_USER,
                            [settings.EMAIL_HOST_USER]

                        )
                        email.attach_alternative(content, 'text/html')
                        email.send()
                    except Exception as e:
                        print(e)

                return Response(status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={'error': 'El pago falló, porfavor revisa que tengas suficientes fondos'}, status=status.HTTP_400_BAD_REQUEST)


class ListUserOrders(generics.ListAPIView):
    permission_classes = [IsOwner, permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        orders = Order.objects.all().filter(user=request.user.id)
        serializer = OrderSerializerList(orders, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class RetrieveOrder(generics.RetrieveAPIView):
    permission_class = [IsOwner, permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        id = self.kwargs['pk']
        order = Order.objects.all().filter(id=id).first()
        if(order.user == request.user):

            serializer = OrderSerializerList(order)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_401_UNAUTHORIZED)


class SolicitarFactura(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        id = request.data['id']
        if id:
            order = Order.objects.all().filter(id=id).first()

            if order is None:
                return Response({'detail':'No encontrado'}, status = status.HTTP_404_NOT_FOUND)

            if order.factura:
                return Response({"status": "Esta orden ya a solicitado una factura, si no la haz recibido, porfavor contactate al correo de atención al cliente"}, status=status.HTTP_400_BAD_REQUEST)

            if order.user != request.user:
                return Response({"status": "No tienes permiso para solicitar Factura sobre esta orden"}, status=status.HTTP_401_UNAUTHORIZED)

            data = request.data
            user = request.user
            context = {
                "orderId": data['id'],
                "UserName": data['nombre'],
                "total":order.total,
                "email":data['email'],
                "direccion":f"{user.calle} #{user.exterior_number} {f'#{user.interior_number}' if user.interior_number else ''}, {user.colonia} {user.postalcode} - {user.estado}",
                "rfc":data['rfc'],
                "nombre":data['nombre'],
                "userEmail": user.email

            }
            template = get_template('correo.html')
            content = template.render(context)
            try:
                email = EmailMultiAlternatives(
                    f'El usuario {request.user.nombre} solicito una factura sobre el pedido #{order.id}',
                    'Factura',
                    settings.EMAIL_HOST_USER,
                    ['raulemilianomirandagtz@gmail.com'],
                )
            except Exception as e:
                print(e)


            email.attach_alternative(content, 'text/html')
            email.send()
            Order.objects.all().filter(id=id).update(factura=True)

            return Response({"status": "La solicitud de factura se realizó correctamente"}, status=status.HTTP_200_OK)
