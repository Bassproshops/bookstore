from django.urls import path
from .views import *

urlpatterns = [
    path('cart/', ListCartItems.as_view()),
    path('add-to-cart/', AddToCart.as_view()),
    path('cart-item/<int:pk>/', CartCrud.as_view()),
]