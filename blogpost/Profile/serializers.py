from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from .models import CustomUser
class UserRegistrationSerializer(ModelSerializer): 
    class Meta:
        model=CustomUser
        fields=['id','email','username','password','first_name','last_name','bio','instagram','linkedin','profile_picture']
        extra_kwargs={
            'password':{'write_only':True}
            }
    def create(self,validated_data):
        email=validated_data['email']
        username=validated_data['username']
        first_name=validated_data['first_name']
        last_name=validated_data['last_name']
        password=validated_data['password']

        user=get_user_model()
        new_user=user.objects.create(email=email,username=username,first_name=first_name,last_name=last_name)
        new_user.set_password(password)
        new_user.save()
        return new_user
    def get_profile_picture(self, obj):
        request = self.context.get('request')
        if obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url)
        return None


class UserListSerializer(ModelSerializer):
    class Meta:
        model=get_user_model()
        fields=['id','username','profile_picture','bio']
    def get_profile_picture(self, obj):
        request = self.context.get('request')
        if obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url)
        return None