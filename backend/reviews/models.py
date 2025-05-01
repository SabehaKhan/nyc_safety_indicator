from django.db import models
from django.conf import settings

class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    review_text = models.TextField()
    star = models.PositiveSmallIntegerField()  # Ensure values are between 0-5
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    boroname = models.TextField(null=True, blank=True)  # Replace lat, long, zipcode
    ntaname = models.TextField(null=True, blank=True)  # Replace lat, long, zipcode


    def __str__(self):
        return f"{self.user.username} - {self.star} Stars"