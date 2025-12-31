from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
# Create your views here.
from django.contrib.auth import get_user_model

from .serializers import UserRegistrationSerializer
@api_view(['POST'])
def UserRegistration(request):
    serializer=UserRegistrationSerializer(data=request.data)
    if(serializer.is_valid()):
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)


from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        data = response.data
        access = data.get("access")
        refresh = data.get("refresh")

        # Remove tokens from API response body (optional for security)
        response.data = {"message": "Login successful"}

        # Set Cookies (HttpOnly for security)
        response.set_cookie(
            key="access_token",
            value=access,
            httponly=True,
            secure=True,          # True in production only!
            samesite="None",      # Needed when frontend domain differs
            max_age=3600,         # 1 hr — match access token exp
        )
        response.set_cookie(
            key="refresh_token",
            value=refresh,
            httponly=True,
            secure=True,
            samesite="None",
            max_age=7 * 24 * 3600,   # 7 days — match refresh token exp
        )
        return response


class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh = request.COOKIES.get("refresh_token")
        if refresh:
            request.data["refresh"] = refresh

        response = super().post(request, *args, **kwargs)
        access = response.data.get("access")

        # Again, do not return tokens in body
        response.data = {"message": "Token refreshed"}

        response.set_cookie(
            key="access_token",
            value=access,
            httponly=True,
            secure=True,
            samesite="None",
        )
        return response

@api_view(["POST"])
def logout_view(request):
    response = Response({"message": "Logged out successfully"})

    response.delete_cookie(
        key="access_token",
        path="/",
        samesite="None",
    )

    response.delete_cookie(
        key="refresh_token",
        path="/",
        samesite="None",
    )

    return response

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def auth_me(request):
    user = request.user

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "bio": user.bio,
        "instagram": user.instagram,
        "linkedin": user.linkedin,
        "first_name":user.first_name,
        "last_name":user.last_name,
        "profile_picture": (
            request.build_absolute_uri(user.profile_picture.url)
            if user.profile_picture else None
        ),
    })

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def UpdateUser(request):
    user=request.user
    serializer=UserRegistrationSerializer(user,data=request.data,partial=True,
    context={"request": request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    print(serializer.errors)
    return Response(serializer.error_messages,status=400)

from .serializers import UserListSerializer
from rest_framework.generics import ListAPIView
from .Pagination import CustomPagination

class UserListView(ListAPIView):
    serializer_class = UserListSerializer
    pagination_class = CustomPagination
    
    def get_queryset(self):
        return get_user_model().objects.all().order_by('-date_joined')
