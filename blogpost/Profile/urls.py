from django.urls import path
from .views import UserRegistration

from .views import CookieTokenObtainPairView,CookieTokenRefreshView
from .views import logout_view,auth_me ,UpdateUser,UserListView
urlpatterns=[
    path('Register',UserRegistration),
    path('login',CookieTokenObtainPairView.as_view()),
    path('refreshtoken',CookieTokenRefreshView.as_view()),
    path('logout',logout_view),
    path('getUser',auth_me),
    path('updateUser',UpdateUser),
    path('Users',UserListView.as_view()),

]