from django.db import models

from users.models import User
from products.models import Product

# Create your models here.


class Order(models.Model):
    total = models.IntegerField(null = False, blank = False)
    user = models.ForeignKey(User,  on_delete = models.CASCADE)
    direction = models.CharField(null = False, blank = False, max_length = 500)
    status = models.CharField(default = 'Orden Recivida', max_length = 100)
    factura = models.BooleanField(default = False)

    created_at = models.DateTimeField(auto_now_add = True)

    class Meta:
        ordering = ('-created_at',)
        verbose_name = "orden"
        verbose_name_plural = "ordenes"
    
    def __str__(self):
        return f'Order of {self.user.email}'


class OrderItem(models.Model):
    product = models.ForeignKey(Product,  on_delete = models.CASCADE)
    order = models.ForeignKey(Order, related_name="order_items",  on_delete = models.CASCADE)
    quantity = models.SmallIntegerField(null = False, blank = False)
    total = models.IntegerField(null = False, blank = False)
