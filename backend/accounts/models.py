from abstracts.models import AbstractModel
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from .managers import CustomUserManager


class User(AbstractBaseUser, AbstractModel, PermissionsMixin):

    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    username = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False, null=True, blank=True)
    is_superuser = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)
    image_url = models.CharField(max_length=255, null=True, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["password"]

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"
