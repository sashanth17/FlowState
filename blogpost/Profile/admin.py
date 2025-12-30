from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
# Register your models here.
from django.contrib.auth import get_user_model

class CustomeUserAdmin(UserAdmin):
    list_display=('username','email','first_name','last_name','bio','instagram','profile_picture')

userModel=get_user_model()
admin.site.register(userModel,CustomeUserAdmin)