from django.db import models

from users.models import User
from products.models import Product

# Create your models here.


class Cart(models.Model):
    product = models.ForeignKey(Product, related_name = "product", on_delete = models.CASCADE)
    user = models.ForeignKey(User, related_name = "user", on_delete = models.CASCADE)
    quantity = models.PositiveSmallIntegerField(null = False, blank = False,)

    created_at = models.DateTimeField(auto_now_add = True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ('product', 'user')
        verbose_name = "carrito"
        verbose_name_plural = "carritos"
    
    def __str__(self):
        return f'{self.product.name}, with {self.quantity} units, of {self.user.email}'
