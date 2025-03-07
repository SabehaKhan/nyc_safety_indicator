from django.urls import path
from api import views  # Ensure views is imported correctly

urlpatterns = [
    path('', views.home)  # Use views.home instead of just home
]
