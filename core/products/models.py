from django.db import models
from PIL import Image


class Category(models.Model):
    name = models.CharField(max_length=255, null=False,
                            blank=False, verbose_name="Nombre")
    slug = models.SlugField(max_length=255, null=False,
                            blank=False, verbose_name="URL", unique=True)
    created_at = models.DateTimeField(auto_now_add=True)


def upload_to(instance, filename):
    name = filename
    return f"static/products/{name}".format(filename=filename)


class Product(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False, verbose_name="Nombre")
    price = models.PositiveIntegerField(null=False, blank=False, verbose_name="Precio")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="category", verbose_name="Categoría")
    stock = models.PositiveIntegerField(null=False, blank=False)
    slug = models.SlugField(null=False, blank=False, verbose_name="URL", unique=True)
    image = models.ImageField(null=False, blank=False,
                              verbose_name="Imagen", upload_to=upload_to)
    popularity = models.PositiveBigIntegerField(
        default=0, verbose_name="Popularidad")

    description = models.TextField(
        null=False, blank=False, verbose_name="Descripción")

    created_at = models.DateTimeField(auto_now_add=True)

    # ?? Deal Section
    deal = models.BooleanField(default=False, verbose_name="En Oferta")
    special_price = models.IntegerField(
        null=True, blank=True, verbose_name="Precio Especial")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "producto"
        verbose_name_plural = "productos"

    def __str__(self):
        return 'producto'
