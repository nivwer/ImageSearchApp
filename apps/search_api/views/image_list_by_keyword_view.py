import os

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError, NotFound, PermissionDenied
from dotenv import load_dotenv
import requests

# Load environment variables from .env file
load_dotenv()


class ImageListByKeywordAPIView(APIView):
    """
    API view for retrieving a paginated list of images based on a keyword.


    """

    def get(self, request, *args, **kwargs):

        keyword: str = request.GET.get("keyword")
        page: int = int(request.GET.get("page", "1"))
        per_page: int = int(request.GET.get("per_page", "10"))

        try:
            if not keyword:
                message: str = "Keyword is not provided"
                raise ValidationError({"message": message})

        except ValidationError as error:
            return Response(data=error.detail, status=status.HTTP_400_BAD_REQUEST)

        keyword: str = " ".join(keyword.split()).lower()

        API_KEY = os.getenv("UNSPLASH_API_KEY")
        API_URL = os.getenv("UNSPLASH_API_URL")
        params_url: str = f"&query={keyword}&page={page}&per_page={per_page}"

        URL: str = f"{API_URL}/search/photos/?client_id={API_KEY}{params_url}"

        try:

            response = requests.get(URL)
            response.raise_for_status()
            response = response.json()

        except ValidationError as error:
            return Response(data=error.detail, status=status.HTTP_400_BAD_REQUEST)

        except PermissionDenied as error:
            return Response(data=error.detail, status=status.HTTP_403_FORBIDDEN)

        except NotFound as error:
            return Response(data=error.detail, status=status.HTTP_404_NOT_FOUND)

        return Response(data=response, status=status.HTTP_200_OK)
