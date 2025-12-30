from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed


class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Extract token from cookies
        access_token = request.COOKIES.get('access_token')

        # If no cookie is present — DRF will continue checking other authentication
        if not access_token:
            return None

        try:
            # Validate the JWT using SimpleJWT's built-in method
            validated_token = self.get_validated_token(access_token)

            # From validated token extract the user
            user = self.get_user(validated_token)

        except Exception:
            raise AuthenticationFailed('Invalid or expired token')

        return (user, validated_token)