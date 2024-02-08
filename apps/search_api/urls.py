from django.urls import path

from .views.image_list_by_keyword_view import ImageListByKeywordAPIView


urlpatterns = [
    path(
        route="images/",
        view=ImageListByKeywordAPIView.as_view(),
        name="image_list_by_keyword",
    ),
]
