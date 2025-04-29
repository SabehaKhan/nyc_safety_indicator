from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReviewViewSet, ReviewListView

router = DefaultRouter()
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('', include(router.urls)),  # Standard RESTful endpoints
    path('reviews/filter/', ReviewListView.as_view(), name='review-list'),  # Custom filtering endpoint
]