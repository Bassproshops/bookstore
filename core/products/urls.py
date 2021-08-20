from django.urls import path
from .views import *

urlpatterns = [
    ##?Admin Urls
    path('product/', CreateProduct.as_view()),
    path('product-admin/<str:slug>/', ProductCrud.as_view()),
    path('products-list/', ListProductsAdmin.as_view()),
    
    path('category/', CreateCategory.as_view()),
    path('category/<str:slug>/', CategoryCrud.as_view()),

    ##?Friendly Urls
    path('products/', ListProducts.as_view()),
    path('product/<str:slug>/', RetrieveProduct.as_view()),
    path('categories/', ListCategories.as_view()),
    path('products/<str:slug>/', RetrieveCategoryProducts.as_view()),
    path('pop/<str:slug>/', BoostPopularity.as_view()),
    path('retr-category/<str:slug>/', RetrieveCategory.as_view()),
    path('popular-products/', GetMostPopularProducts.as_view()),
    path('total/', Total.as_view()),
]