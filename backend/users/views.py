
from datetime import time
import re
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from rest_framework.response import Response
from jwt import DecodeError
import jwt
from .models import CustomUser 
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from jwt import PyJWKClient
from jwt.exceptions import DecodeError, ExpiredSignatureError, InvalidTokenError
import requests
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.core.cache import cache



SMS_GATEWAYS = {
    'att': '@txt.att.net',
    'verizon': '@vtext.com',
    'tmobile': '@tmomail.net',
    'sprint': '@messaging.sprintpcs.com',
}

User = get_user_model()
# Google's public keys URL
GOOGLE_CERTS_URL = "https://www.googleapis.com/oauth2/v3/certs"

#user registration view
class RegisterViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]  # Allow any user to register
    queryset = User.objects.all()  # Query all users (optional, not needed if only creating users)
    serializer_class = RegisterSerializer  # Use the register serializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data) # validate user information
        if serializer.is_valid():
            try:
                user = serializer.save() # save to db
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
    
class UpdateUserProfile(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this

    def put(self, request):
        # Get the current user instance
        user = request.user

        # Initialize the serializer with the user instance and the data from the request
        serializer = UserSerializer(user, data=request.data)

        if serializer.is_valid():
            # Save the updated user data
            serializer.save()

            # Return the updated data in the response
            return Response(serializer.data, status=status.HTTP_200_OK)

        # If serializer is not valid, return the errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# retrieving user details
class UserDetail(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this

    def get(self, request):
        user = request.user  # The authenticated user
    
        # Serialize the user data
        serializer = UserSerializer(user)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
# adding emergency contact to db
class EmergencyContactAdd(APIView):   
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = EmergencyContactSerializer(data=request.data) # validating data format
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"message": "Emergency contact added successfully!", "data": serializer.data},
                            status=status.HTTP_201_CREATED)
        return Response({"error": "Invalid data", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
#Fetching emergency contact 
class EmergencyContactFetch(APIView):
    permission_classes = [IsAuthenticated] # only authenticated/logged in user can do this
    def get(self, request):
        contacts = EmergencyContact.objects.filter(user=request.user) # fetch the emergency contact of the logged in user
        serializer = EmergencyContactSerializer(contacts, many=True)  # transform contact instance into dictionary
        return Response(serializer.data, status=status.HTTP_200_OK)
class EmergencyContactDelete(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        name = request.data.get('name')
        phone = request.data.get('phone_number')
        
        if not name or not phone:
            return Response(
                {"error": "Both name and phone number are required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        contacts = EmergencyContact.objects.filter(
            user=request.user, 
            name=name, 
            phone_number = phone
        )
        
        if contacts.exists():
            contacts.delete()
            
            # Get remaining contacts
            remaining_contacts = EmergencyContact.objects.filter(user=request.user)
            serializer = EmergencyContactSerializer(remaining_contacts, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Contact not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
class EmergencyAlert(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Debugging: Log request data
        print("Received Data:", request.data)
        print("Authenticated User:", request.user)

        # Extract required fields from request
        location = request.data.get("location")
        if not location:
            return Response({"error": "Location is required"}, status=400)

        fname = request.user.first_name 
        lname = request.user.last_name 
        full_name = f"{fname} {lname}".strip()
        
        # Fetch emergency contacts
        contacts = EmergencyContact.objects.filter(user=request.user)
        if not contacts.exists():
            return Response({"error": "No emergency contacts found."}, status=400)

        # Send alert message
        error_contacts = []
        success_count = 0
        for contact in contacts:
            phone = contact.phone_number
            carrier = contact.carrier.lower()
            carrier = re.sub(r'[^a-zA-Z]', '', carrier).lower()
            print(f"Processed carrier: {carrier}")

            if carrier not in SMS_GATEWAYS:
                error_contacts.append(phone)
                continue  # Skip this contact if carrier is invalid

            sms_gateway = f"{phone}{SMS_GATEWAYS[carrier]}"
            message_body =f"{full_name} needs help. Location: {location}"
          
           
            try:
                send_mail(
                    subject=f"{full_name} needs help. Location: {location}",  
                    message=message_body,
                    from_email=settings.EMAIL_HOST_USER,  # Use configured sender email
                    recipient_list=[sms_gateway],  # Recipient is phone + carrier gateway
                    fail_silently=False,  # Raise an error if email fails
                )
                print(f"Message sent to {sms_gateway}")
                success_count += 1
                time.sleep(5)
            except Exception as e:
                print(f"SMTP error: {e}")
                error_contacts.append(phone)

        # Final response
        response_message = {
            "message": f"Alert sent successfully to {success_count} contact(s).",
            "failed_contacts": error_contacts,
        }
        return Response(response_message, status=200 if success_count else 400)

class CrimeNews(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        force_refresh = request.GET.get("refresh") == "true"

        if not force_refresh:
            cached_news = cache.get("nyc_crime_news")
            if cached_news:
                return JsonResponse(cached_news, safe=False)

        api_key = settings.NEWS_DATA_API

        url = (
        f"https://newsdata.io/api/1/news?"
        f"apikey={api_key}"
        "&q=ny OR nyc OR bronx OR brooklyn OR manhattan"
        "&country=us"
        "&language=en"
        "&category=crime"
    )
        def truncate_description(desc, word_limit=50):
            words = desc.split()
            return ' '.join(words[:word_limit]) + ('...' if len(words) > word_limit else '')

        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            

            articles = [
                {
                    "title": item["title"],
                    "description": truncate_description(item.get("description", "")),
                    "url": item["link"],
                    "published_at": item.get("pubDate", ""),
                    "publisher": item.get("source_id", ""),
                    "category": item.get("category", "")
                }
                for item in data.get("results", [])
            ]

            articles = articles[:3]  # Limit to top 3
            cache.set("nyc_crime_news", articles, timeout=60 * 60 * 6)
            return JsonResponse(articles, safe=False)

        return JsonResponse({"error": "Failed to fetch news"}, status=500)

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
            algorithms=["RS256"],  
            audience=settings.GOOGLE_CLIENT_ID, 
            issuer="https://accounts.google.com",  
        )
        return decoded_token
    except (DecodeError, ExpiredSignatureError, InvalidTokenError) as e:
        print(f"Token verification failed: {str(e)}")
        return None

# google login
@csrf_exempt
def google_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            id_token = data.get('token')
            
            decoded_token = verify_google_token(id_token) # validate the token received from the frontend and decode it
            if not decoded_token:
                return JsonResponse({'error': 'Invalid token'}, status=400)

            # retrieve essential user info from the decoded token
            email = decoded_token.get('email')
            first_name = decoded_token.get('given_name', '')
            last_name = decoded_token.get('family_name', '')

            # create user from the retrieved information
            user, created = CustomUser.objects.get_or_create(
                email=email,
                defaults={
                    'first_name': first_name,
                    'last_name': last_name,
                    'password': None  # Use whatever password strategy you prefer
                }
            )

            # Update name if user existed
            if not created:
                user.first_name = first_name
                user.last_name = last_name
                user.save()

            # Use SimpleJWT for token generation
            refresh = RefreshToken.for_user(user)
            
            return JsonResponse({
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)