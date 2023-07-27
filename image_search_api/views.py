import os
from django.http import JsonResponse, HttpResponse
import requests
from pymongo import MongoClient, errors
from dotenv import load_dotenv

load_dotenv()

# Create your views here.


# Function to log search queries in the database
def log_search(query):
    MONGO_URI = os.getenv('MONGO_URI')
    try:
        client = MongoClient(MONGO_URI)
        db = client['SearchArchive']
        collection = db['searches']

        result = collection.find_one({'query': query})

        if result:
            collection.update_one(result, {'$inc': {'total': 1}})
        else:
            collection.insert_one({'query': query, 'total': 1})
    except errors.ConnectionError as e:
        # Handle MongoDB connection error
        print(f'MongoDB connection error: {e}')
    except errors.ServerSelectionTimeoutError as e:
        # Handle MongoDB server selection timeout error
        print(f'MongoDB server selection timeout error: {e}')
    except errors.WriteError as e:
        # Handle MongoDB write error
        print(f'MongoDB write error: {e}')
    except Exception as e:
        # Handle other general exceptions
        print(f'Error: {e}')


# Function for handling search queries and image search results from Unsplash API.
def search_results(request):
    API_KEY = os.getenv('API_KEY_UNSPLASH')
    query = request.GET.get('query', '').stript()
    page = request.GET.get('page', '')

    # Invalid input
    if not query or not page.isdigit():
        return JsonResponse({'error': 'Invalid query or page'})

    # Log the search query in the database
    log_search(query)

    URL = f'https://api.unsplash.com/search/photos/?client_id={API_KEY}&query={query}&page={page}&per_page=29'

    try:
        res = requests.get(URL)
        res.raise_for_status()  # Raise an exception for HTTP errors
        json_data = res.json()
        return JsonResponse(json_data, safe=False)
    except requests.exceptions.HTTPError as e:
        # Handle HTTP errors by returning an error JSON response
        return JsonResponse({'error': f'HTTP error: {e}', 'status_code': res.status_code})
    except requests.exceptions.JSONDecodeError as e:
        # Handle JSON decoding errors by returning an error JSON response
        return JsonResponse({'error': f'JSON decoding error: {e}'})
    except requests.exceptions.RequestException as e:
        # Handle general request exceptions by returning an error JSON response
        return JsonResponse({'error': f'Request exception: {e}'})


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
