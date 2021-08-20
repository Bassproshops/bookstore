from django.urls import path
from .views import *


urlpatterns = [
    path('login/', Login.as_view()),
    path('logout/', Logout.as_view()),
    path('register/', Register.as_view()),

    path('profile/', getUser.as_view()),
    path('user/<int:pk>/', updateUser.as_view())
]