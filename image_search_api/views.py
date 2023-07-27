import os
from django.http import JsonResponse, HttpResponse
import requests
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()


# Create your views here.

def search_results(request):
    API_KEY = os.getenv('API_KEY_UNSPLASH')
    query = request.GET.get('query', '')
    page = request.GET.get('page', '')

    

    if query and page:

        MONGO_URI = os.getenv('MONGO_URI')
        client = MongoClient(MONGO_URI)
        db = client["searches"]


        

        URL = f'https://api.unsplash.com/search/photos/?client_id={API_KEY}&query={query}&page={page}&per_page=29'

        try:
            res = requests.get(URL)
            res.raise_for_status()
            json_data = res.json()
            return JsonResponse(json_data, safe=False)
        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': str(e)})
    else:
        return JsonResponse({'error': 'Invalid URL'})


def hello(request):
    return JsonResponse({
        'res': [
            {
                'id': '123',
                'res': 'hello',
                'pais': 'eeuu'
            },
            {
                'id': '1234',
                'res': 'hola',
                'pais': 'arg'
            },
            {
                'id': '433112',
                'res': 'hello',
                'pais': 'eeuu'
            },
            {
                'id': '546456',
                'res': 'hol',
                'pais': 'arg'
            },
            {
                'id': '123452',
                'res': 'helasdaso',
                'pais': 'eeuu'
            },
            {
                'id': '3235',
                'res': 'holasda',
                'pais': 'arasdg'
            },
        ]
    })
