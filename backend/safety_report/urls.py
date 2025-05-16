from django.urls import path
from .views import SafetyScoreView, CrimeBreakdownView, CrimeTrendsView, SeriousCrimesView, NeighborhoodsView, MixedSafetyScoresView, SafetyIndexDictView

urlpatterns = [
    path('safety-score/', SafetyScoreView.as_view(), name='safety-score'),
    path('crime-breakdown/', CrimeBreakdownView.as_view(), name='crime-breakdown'),
    path('crime-trends/', CrimeTrendsView.as_view(), name='crime-trends'),
    path('serious-crimes/', SeriousCrimesView.as_view(), name='serious-crimes'),
    path('neighborhoods/', NeighborhoodsView.as_view(), name='neighborhoods'),
    path('mixed-safety-scores/', MixedSafetyScoresView.as_view(), name='mixed-safety-scores'),  # New endpoint
    path('all-neighborhoods-scores/', SafetyIndexDictView.as_view(), name='all-neighborhoods-scores'),  # New endpoint
]