from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'review_text', 'star', 'boroname', 'ntaname', 'created_at']  # Include 'created_at'

    def validate_star(self, value):
        if value < 0 or value > 5:
            raise serializers.ValidationError("Star rating must be between 0 and 5.")
        return value