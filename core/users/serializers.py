
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'created_at':{'read_only': True},
            'password':{'write_only':True},
            'is_staff':{'read_only': True},
            'is_superuser':{'read_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance
    
    def update (self, instance, validated_data):
        
        
        instance.calle = validated_data.get('calle', instance.calle)
        instance.estado = validated_data.get('estado', instance.estado)
        instance.colonia = validated_data.get('colonia', instance.colonia)
        instance.exterior_number = validated_data.get('exterior_number', instance.exterior_number)
        instance.interior_number = validated_data.get('interior_number', instance.interior_number)
        instance.postalcode = validated_data.get('postalcode', instance.postalcode)
        instance.nombre = validated_data.get('nombre', instance.nombre)

        instance.save()
        return instance


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields  = ['calle', 'estado', 'colonia', 'exterior_number', 'interior_number', 'postalcode', 'nombre']












