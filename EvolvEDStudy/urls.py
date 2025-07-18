from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.decorators import api_view
from rest_framework.response import Response

# def home(request):
#     return JsonResponse({"message": "Welcome to EvolvEDStudy API"}, status=200)
@api_view(["GET"])
def test_api(request):
    return Response({"message": "Django & React Integration Successful!"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/profile/', include('users.urls')),
    path("api/users/", include("users.urls")),
    path("api/groups/", include("groups.urls")),
    path("api/discussions/", include("discussions.urls")),
    path("api/meetings/", include("meetings.urls")),
    path("api/test/", test_api),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  
    # path("", home),  # API home response
    # React Frontend
    path("", TemplateView.as_view(template_name='index.html')),
]
