import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is a required field")
        if not first_name: 
            raise ValueError("First name is a required field")
        if not last_name:
            raise ValueError("Last name is a required field")
        email = self.normalize_email(email)
        user = self.model(first_name=first_name, last_name = last_name, email = email, **extra_fields)
        user.set_password(password)
        user.save(using = self.db)
        return user
    def create_superuser(self, first_name, last_name, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(first_name, last_name,  email, password, **extra_fields)


class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=200, unique=True)
    username = models.CharField(max_length=200, null=True, blank=True)

    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

class EmergencyContact(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='emergency_contacts')
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, unique=True,  default='000-000-0000')  
    carrier = models.CharField(max_length=25, unique= False,default="Unknown")