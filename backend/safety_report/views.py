from django.shortcuts import render

from model.model_loader import load_model
from model.utils import haversine, predict_safety
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from model.utils import calculate_borough_safety_index, calculate_ntaname_safety_index
from model.utils import get_crime_breakdown, get_crime_data, predict_safety
from .models import ArrestData
# Create your views here.

# class SafetyScoreView(APIView):
#     permission_classes = [AllowAny]  # Allow access to anyone

#     def get(self, request):
#         boroname = request.query_params.get('boroname', None)
#         ntaname = request.query_params.get('ntaname', None)

#         if boroname:
#             safety_score = calculate_borough_safety_index(boroname)
#         elif ntaname:
#             safety_score = calculate_ntaname_safety_index(ntaname)
#         else:
#             return Response({"error": "Please provide either 'boroname' or 'ntaname'."}, status=status.HTTP_400_BAD_REQUEST)

#         return Response({"safety_score": safety_score}, status=status.HTTP_200_OK)
class SafetyScoreView(APIView):
    permission_classes = [AllowAny]  # Allow access to anyone

    def get(self, request):
        # Get query parameters
        boroname = request.query_params.get('boroname', None)
        ntaname = request.query_params.get('ntaname', None)
        lat = request.query_params.get('latitude', None)
        lon = request.query_params.get('longitude', None)

        try:
            if boroname:
                # Calculate safety score for a specific borough
                safety_score = calculate_borough_safety_index(boroname)
                return Response({"safety_score": safety_score}, status=status.HTTP_200_OK)

            elif ntaname:
                # Calculate safety score for a specific neighborhood
                safety_score = calculate_ntaname_safety_index(ntaname)
                return Response({"safety_score": safety_score}, status=status.HTTP_200_OK)

            elif lat and lon:
                # Validate latitude and longitude
                try:
                    lat = float(lat)
                    lon = float(lon)
                except ValueError:
                    return Response({"error": "'latitude' and 'longitude' must be valid numbers."}, status=status.HTTP_400_BAD_REQUEST)

                # Calculate safety score using latitude and longitude
                safety_score = predict_safety(lat, lon)
                return Response({"safety_score": safety_score}, status=status.HTTP_200_OK)

            else:
                return Response({"error": "Please provide either 'boroname', 'ntaname', or 'lat' and 'lon'."}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class CrimeBreakdownView(APIView):
    permission_classes = [AllowAny]  # Allow access to anyone
    def get(self, request):
        neighborhood_name = request.query_params.get('ntaname', None)

        if not neighborhood_name:
            return Response({"error": "Please provide 'ntaname'."}, status=status.HTTP_400_BAD_REQUEST)

        crime_breakdown = get_crime_breakdown(neighborhood_name)
        return Response({"crime_breakdown": crime_breakdown}, status=status.HTTP_200_OK)

class CrimeTrendsView(APIView):
    permission_classes = [AllowAny]  # Allow access to anyone
    def get(self, request):
        neighborhood_name = request.query_params.get('ntaname', None)

        if not neighborhood_name:
            return Response({"error": "Please provide 'ntaname'."}, status=status.HTTP_400_BAD_REQUEST)

        df = get_crime_data()
        crimes_in_neighborhood = df[df['ntaname'] == neighborhood_name]

        # Group by year and offense description
        crimes_in_neighborhood['year'] = crimes_in_neighborhood['arrest_date'].dt.year
        crime_trends = crimes_in_neighborhood.groupby(['year', 'ofns_desc']).size().unstack(fill_value=0)

        return Response({"crime_trends": crime_trends.to_dict()}, status=status.HTTP_200_OK)


class SeriousCrimesView(APIView):
    permission_classes = [AllowAny]  # Allow access to anyone
    def get(self, request):
        neighborhood_name = request.query_params.get('ntaname', None)

        if not neighborhood_name:
            return Response({"error": "Please provide 'ntaname'."}, status=status.HTTP_400_BAD_REQUEST)

        df = get_crime_data()
        crimes_in_neighborhood = df[(df['ntaname'] == neighborhood_name) & (df['crime_severity'] == 'serious')]

        crime_breakdown = crimes_in_neighborhood['ofns_desc'].value_counts()
        return Response({"serious_crimes": crime_breakdown.to_dict()}, status=status.HTTP_200_OK)
    
class NeighborhoodsView(APIView):
    permission_classes = [AllowAny]  # Allow access to anyone
    def get(self, request):
        try:
            # Query the database using Django ORM
            #data = ArrestData.objects.values('boroname', 'ntaname').distinct()
            data = ArrestData.objects.exclude(boroname__isnull=True).exclude(boroname='').exclude(ntaname__isnull=True).exclude(ntaname='').values('boroname', 'ntaname').distinct()
            # Process the data into the desired format
            neighborhoods = {}
            for entry in data:
                borough = entry['boroname']
                neighborhood = entry['ntaname']
                if borough not in neighborhoods:
                    neighborhoods[borough] = []
                neighborhoods[borough].append(neighborhood)

            return Response({"boroughs": list(neighborhoods.keys()), "neighborhoods": neighborhoods}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class MixedSafetyScoresView(APIView):
    permission_classes = [AllowAny]  # Allow access to anyone

    def get(self, request):
        try:
            # Query distinct boroname and ntaname values
            data = ArrestData.objects.exclude(boroname__isnull=True).exclude(boroname='') \
                                     .exclude(ntaname__isnull=True).exclude(ntaname='') \
                                     .values('boroname', 'ntaname').distinct()

            # Initialize the result dictionary
            safety_scores = {}

            # Calculate safety scores for each boroname
            boroughs = set(entry['boroname'] for entry in data)
            for borough in boroughs:
                safety_scores[borough] = calculate_borough_safety_index(borough)

            # Calculate safety scores for each ntaname
            neighborhoods = set(entry['ntaname'] for entry in data)
            for neighborhood in neighborhoods:
                safety_scores[neighborhood] = calculate_ntaname_safety_index(neighborhood)

            return Response(safety_scores, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)