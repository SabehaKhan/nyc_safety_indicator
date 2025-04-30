from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('users.urls')),  # User-related endpoints
    path('api/', include('reviews.urls')),  # Review-related endpoints
    path('api/safety/', include('safety_report.urls')),  # Safety report endpoints
]