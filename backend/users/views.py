
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

User = get_user_model()

class RegisterViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]  # Allow any user to register
    queryset = User.objects.all()  # Query all users (optional, not needed if only creating users)
    serializer_class = RegisterSerializer  # Use the register serializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                token = Token.objects.create(user=user)
                refresh = RefreshToken.for_user(user = user)
                return Response({
                    "message": "User created successfully!",
                    "user": serializer.data,
                    "token": token.key,  # Return token from `authtoken`
                    "access_token": str(refresh.access_token),  # JWT Access token
                    "refresh_token": str(refresh),  # JWT Refresh token

                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({
                    "error": "User creation failed.",
                    "details": str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({
            "error": "User creation failed.",
            "details": serializer.errors  # This will show which fields failed validation
        }, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    permission_classes = [AllowAny]  # Allow anyone to access this view

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if not email or not password:
            return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate the user
        user = authenticate(username=email, password=password)

        if user is not None:
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),  # JWT Access Token
                'refresh_token': str(refresh),  # JWT Refresh Token
            })
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
