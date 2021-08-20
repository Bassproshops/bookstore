# Generated by Django 3.2.5 on 2021-07-21 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='deal',
            field=models.BooleanField(default=False, verbose_name='En Oferta'),
        ),
        migrations.AddField(
            model_name='product',
            name='special_price',
            field=models.IntegerField(blank=True, null=True, verbose_name='Precio Especial'),
        ),
    ]
