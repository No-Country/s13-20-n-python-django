from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user=models.models.OneToOneField("user", on_delete=models.CASCADE)
    imageurl=models.TextField(max_length=255, blank=True)
    
    class Meta:
        Verbose_name = "Perfil"
        Verbose_name_plural = "Perfiles"
