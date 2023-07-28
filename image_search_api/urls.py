from django.urls import path
from . import views

urlpatterns = [
    path('api/v1/search/', views.search_results),
    path('api/v1/searches/popular/', views.get_popular_searches),
    path('hello/', views.hello)
]
