from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
import datetime

class RefreshTokenMiddleware(MiddlewareMixin):
    def process_request(self, request):
        auth_header = request.headers.get("Authorization")
        if auth_header and "Bearer " in auth_header:
            token = auth_header.split(" ")[1]
            try:
                access_token = AccessToken(token)
                # If token is about to expire, refresh it
                if access_token["exp"] < datetime.datetime.utcnow().timestamp() + 300:  # 5 min buffer
                    refresh = RefreshToken.for_user(request.user)
                    new_access_token = str(refresh.access_token)
                    request.META["HTTP_AUTHORIZATION"] = f"Bearer {new_access_token}"
            except:
                return JsonResponse({"error": "Token expired, please refresh"}, status=401)
