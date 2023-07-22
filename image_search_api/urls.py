from django.urls import path
from . import views

urlpatterns = [
    path('api/v1/search/', views.search_results ),
    path('hello/', views.hello )
]