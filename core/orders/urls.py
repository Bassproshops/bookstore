from django.urls import path
from .views import *

urlpatterns = [
    path('admin-orders/', ListOrders.as_view()),

    path('checkout/', Checkout.as_view()),
    path('user-orders/', ListUserOrders.as_view()),
    path('order/<int:pk>/', RetrieveOrder.as_view()),
    path('order-admin/<int:pk>/', UpdateOrder.as_view()),
    path('factura/', SolicitarFactura.as_view()),

]