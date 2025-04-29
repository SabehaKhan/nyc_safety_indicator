from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Review
from .serializers import ReviewSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ReviewListView(APIView):
    def get(self, request):
        # Get query parameters
        boroname = request.query_params.get('boroname', None)
        ntaname = request.query_params.get('ntaname', None)

        # Filter reviews based on boroname or ntaname
        if boroname:
            reviews = Review.objects.filter(boroname=boroname)
        elif ntaname:
            reviews = Review.objects.filter(ntaname=ntaname)
        else:
            return Response({"error": "Please provide either 'boroname' or 'ntaname' as a query parameter."}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize the data
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)