from django.urls import path, include
from .views import register, login_user, logout_user, ProfileViewSet
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')

urlpatterns = [
    path('register/', register, name="register"),
    path('', include(router.urls)),
    path('login/', login_user, name="login"),
    path('logout/', logout_user, name="logout"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
