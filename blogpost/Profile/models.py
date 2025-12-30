from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
    bio=models.TextField(blank=True,null=True)
    instagram=models.URLField(blank=True,null=True)
    linkedin=models.URLField(blank=True,null=True)
    profile_picture=models.ImageField(upload_to='profile_images',blank=True,null=True)


    def __str__(self):
        return self.username 
