
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from rest_framework.response import Response
from datetime import timedelta
from django.utils import timezone
from jwt import DecodeError
import jwt
from .models import CustomUser 
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from jwt import PyJWKClient
from jwt.exceptions import DecodeError, ExpiredSignatureError, InvalidTokenError
import requests

User = get_user_model()
# Google's public keys URL
GOOGLE_CERTS_URL = "https://www.googleapis.com/oauth2/v3/certs"

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



# Fetch Google's public keys
def get_google_public_keys():
    response = requests.get(GOOGLE_CERTS_URL)
    return response.json()

# Verify the ID token
def verify_google_token(id_token):
    try:
        jwks_client = PyJWKClient(GOOGLE_CERTS_URL)
        signing_key = jwks_client.get_signing_key_from_jwt(id_token)

        # Decode and verify the token
        decoded_token = jwt.decode(
            id_token,
            key=signing_key.key,
            algorithms=["RS256"],  #
            audience=settings.GOOGLE_CLIENT_ID, 
            issuer="https://accounts.google.com",  
        )
        return decoded_token
    except (DecodeError, ExpiredSignatureError, InvalidTokenError) as e:
        print(f"Token verification failed: {str(e)}")
        return None


# Generate JWT tokens
def generate_access_token(user):
    payload = {
        'user_id': user.id,
        'exp': timezone.now() + timedelta(hours=1),  # Token expires in 1 hour
        'iat': timezone.now(),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

def generate_refresh_token(user):
    payload = {
        'user_id': user.id,
        'exp': timezone.now() + timedelta(days=7),  # Token expires in 7 days
        'iat': timezone.now(),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

@csrf_exempt
def google_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            id_token = data.get('token')  # Get the ID token from the frontend
            if not id_token:
                return JsonResponse({'error': 'Token is required'}, status=400)

            decoded_token = verify_google_token(id_token)
            if not decoded_token:
                return JsonResponse({'error': 'Invalid token'}, status=400)

            # Extract user information
            email = decoded_token.get('email')
            first_name = decoded_token.get('given_name', '')
            last_name = decoded_token.get('family_name', '')

            # Authenticate or create the user in your database
            if not CustomUser.objects.filter(email=email).exists():
                new_user = CustomUser.objects.create_user(
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                    password=None  # No password for Google-authenticated users
                )
            else:
                new_user = CustomUser.objects.get(email=email)
                new_user.first_name = first_name
                new_user.last_name = last_name
                new_user.save()

            # Generate JWT tokens
            access_token = generate_access_token(new_user)
            refresh_token = generate_refresh_token(new_user)

            return JsonResponse({
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'access': access_token,
                'refresh': refresh_token,
            })

        except DecodeError as e:
            return JsonResponse({'error': 'Invalid token'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)