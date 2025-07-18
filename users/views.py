from django.contrib.auth import get_user_model, authenticate, login, logout
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, ProfileSerializer
from .models import Profile  
from django.views.decorators.csrf import csrf_exempt
import logging
from rest_framework import status

User = get_user_model()

logger = logging.getLogger(__name__)

# Register
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """ User Registration Endpoint """
    data = request.data
    
    if 'username' not in data or not data['username'].strip():
        return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.create_user(
            username=data['username'],
            first_name=data.get('first_name', ''),
            last_name=data.get('last_name', ''),
            email=data['email'],
            password=data['password'],
            role=data.get('role', 'student')  
        )
        Profile.objects.create(user=user)

        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# login
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """ User Login Endpoint """
    data = request.data
    user = authenticate(username=data.get('username'), password=data.get('password'))

    if user:
        login(request, user)
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UserSerializer(user).data
        })
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    """ User Logout Endpoint with Token Blacklisting """
    try:
        refresh_token = request.data.get("refresh_token")
        if not refresh_token:
            return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

        token = RefreshToken(refresh_token)
        token.blacklist()  
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": "Invalid token or already logged out"}, status=status.HTTP_400_BAD_REQUEST)

class ProfileViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request):
        user = request.user
        profile, created = Profile.objects.get_or_create(user=user)

        return Response({
            "username": user.username,
            "email": user.email,
            "created_at": user.date_joined.strftime("%Y-%m-%d"),
            "bio": profile.bio if profile.bio else "No bio available",
            "profile_picture": request.build_absolute_uri(profile.profile_picture.url) if profile.profile_picture else None,
            "location": profile.location if profile.location else "No location set",
        })

