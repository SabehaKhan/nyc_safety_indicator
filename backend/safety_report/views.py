from django.shortcuts import render

from model.model_loader import load_model
from model.utils import haversine, predict_safety
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from model.utils import calculate_borough_safety_index, calculate_ntaname_safety_index
from model.utils import get_crime_breakdown, get_crime_data

# Create your views here.

#model = load_model()
class SafetyScoreView(APIView):
    def get(self, request):
        boroname = request.query_params.get('boroname', None)
        ntaname = request.query_params.get('ntaname', None)
        
        if boroname:
            safety_score = calculate_borough_safety_index(boroname)
        elif ntaname:
            safety_score = calculate_ntaname_safety_index(ntaname)
        else:
            return Response({"error": "Please provide either 'boroname' or 'ntaname'."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"safety_score": safety_score}, status=status.HTTP_200_OK)

class CrimeBreakdownView(APIView):
    def get(self, request):
        neighborhood_name = request.query_params.get('ntaname', None)

        if not neighborhood_name:
            return Response({"error": "Please provide 'ntaname'."}, status=status.HTTP_400_BAD_REQUEST)

        crime_breakdown = get_crime_breakdown(neighborhood_name)
        return Response({"crime_breakdown": crime_breakdown}, status=status.HTTP_200_OK)

class CrimeTrendsView(APIView):
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
    def get(self, request):
        neighborhood_name = request.query_params.get('ntaname', None)

        if not neighborhood_name:
            return Response({"error": "Please provide 'ntaname'."}, status=status.HTTP_400_BAD_REQUEST)

        df = get_crime_data()
        crimes_in_neighborhood = df[(df['ntaname'] == neighborhood_name) & (df['crime_severity'] == 'serious')]

        crime_breakdown = crimes_in_neighborhood['ofns_desc'].value_counts()
        return Response({"serious_crimes": crime_breakdown.to_dict()}, status=status.HTTP_200_OK)