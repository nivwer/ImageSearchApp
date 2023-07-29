from django.urls import path
from . import views

urlpatterns = [
    # Get Images results.
    path('api/v1/search/', views.search_results),
    # Get Popular Searches.
    path('api/v1/searches/popular/', views.get_popular_searches),
]
