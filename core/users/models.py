from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser



class UserManager(BaseUserManager):
    def create_superuser(self, email, calle, colonia, exterior_number, postalcode,estado,interior_number, password = None):
        if not email:
            raise ValueError('Invalid Email')

        user = self.model(    
            email = self.normalize_email(email),
            calle = calle,
            colonia = colonia,
            exterior_number = exterior_number,
            postalcode = postalcode,
            estado = estado,
            interior_number = interior_number,
            

        )

        user.set_password(password)
        user.save()
        return user
    
    def create_user(self, email, calle, colonia, exterior_number, nombre, postalcode,estado, password = None):
        if not email:
            raise ValueError('Invalid Email')
        
        user = self.model(
            email = self.normalize_email(email),
            calle = calle,
            colonia = colonia,
            exterior_number = exterior_number,
            postalcode = postalcode,
            estado = estado,
            nombre = nombre
            
        )

        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser):
    email = models.EmailField(null = False, blank = False, max_length = 255, unique = True, error_messages = {
        'unique': "Ya existe un usuario con este email"
    })
    password = models.CharField(max_length = 255, null = False, blank = False)
    is_superuser = models.BooleanField(default = False)
    is_staff = models.BooleanField(default = False)

    calle = models.CharField(max_length = 255, null = False, blank = False, verbose_name = "Calle")
    estado = models.CharField(max_length=255, blank = False, verbose_name = "Estado")
    colonia = models.CharField(max_length = 255, null = False, blank = False, verbose_name = "Colonia")
    exterior_number = models.PositiveSmallIntegerField( null = False, blank = False, verbose_name = "Número Exterior")
    interior_number = models.PositiveSmallIntegerField(null = True, blank = True, verbose_name = "Número Interior")
    postalcode = models.PositiveIntegerField(null = False, blank = False, verbose_name = "Zip")
    nombre = models.CharField(null = False, blank = False, max_length = 300)

    created_at = models.DateTimeField(auto_now_add = True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password', 'calle', 'colonia', 'exterior_number', 'interior_number', 'postalcode', ]

    objects = UserManager()

    class Meta:
        ordering = ('-created_at',)
        verbose_name = 'usuario'
        verbose_name_plural = "usuarios"

        def __str__(self):
            return self.email
            