
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token  # Import token login view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *


# Initialize the router and register the RegisterViewSet under 'register'
router = DefaultRouter()
router.register(r'register', RegisterViewSet, basename='register')

urlpatterns = [
    path('api/', include(router.urls)),  # Includes all the routes for the RegisterViewSet
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # JWT refresh
    path('api/google-login/', google_login, name='google-login'),
    path('api/emergency/add/', EmergencyContactAdd.as_view(), name='add_emergency_contact'),
    path('api/emergency/fetch/', EmergencyContactFetch.as_view(), name="fetch_emergency_contact"),
    path('api/emergency/delete/', EmergencyContactDelete.as_view(), name = "delete_emergency_contact"),
    path('api/emergency/sendAlert/', EmergencyAlert.as_view(), name="send_emergency_alert"),
    path('api/crime-news/', CrimeNews.as_view(), name = "recent_crime_news"),
]
