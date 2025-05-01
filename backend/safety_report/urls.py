from django.urls import path
from .views import SafetyScoreView, CrimeBreakdownView, CrimeTrendsView, SeriousCrimesView

urlpatterns = [
    path('safety-score/', SafetyScoreView.as_view(), name='safety-score'),
    path('crime-breakdown/', CrimeBreakdownView.as_view(), name='crime-breakdown'),
    path('crime-trends/', CrimeTrendsView.as_view(), name='crime-trends'),
    path('serious-crimes/', SeriousCrimesView.as_view(), name='serious-crimes'),
]