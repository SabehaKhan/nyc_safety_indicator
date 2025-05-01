from django.contrib import admin
from .models import *
from reviews.models import Review
# Register your models here.
admin.site.register(CustomUser)
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'star', 'created_at', 'boroname', 'ntaname')  # Display these fields in the admin list view
    search_fields = ('user__username', 'review_text', 'boroname', 'ntaname')  # Add search functionality
    list_filter = ('star', 'created_at')  # Add filters for easier navigation