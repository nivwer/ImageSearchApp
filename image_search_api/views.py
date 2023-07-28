import os
import requests
import json
from django.http import JsonResponse, HttpResponse
from datetime import datetime
from bson import json_util
from pymongo import MongoClient, errors, DESCENDING
from dotenv import load_dotenv

load_dotenv()


# Connection to MongoDB
def connection_mongodb(origin):
    MONGO_URI = os.getenv('MONGO_URI')
    dtn = datetime.now().strftime("[%d/%b/%Y %H:%M:%S]")
    try:
        client = MongoClient(MONGO_URI)
        print(f'{dtn} "MongoDB connection successful ({origin})"')
        return client
    except errors.ConnectionError as e:
        # Handle MongoDB connection error
        print(f'{dtn} MongoDB connection error: {e}')
    except errors.ServerSelectionTimeoutError as e:
        # Handle MongoDB server selection timeout error
        print(f'{dtn} MongoDB server selection timeout error: {e}')



# Function to log search queries in the database
def log_search(query):
    if not query:
        return JsonResponse({'error': 'Invalid query'})

    try:
        client = connection_mongodb('views.log_search')
        db = client['SearchArchive']
        collection = db['searches']

        result = collection.find_one({'query': query})

        if result:
            collection.update_one(result, {'$inc': {'count': 1}})
        else:
            collection.insert_one({'query': query, 'count': 1})

        return JsonResponse({'message': 'Search query logged successfully'})
    except errors.WriteError as e:
        # Handle MongoDB write error
        print(f'MongoDB write error: {e}')
    except Exception as e:
        # Handle other general exceptions
        print(f'Error: {e}')


# Create your views here.

# Function for handling search queries and image search results from Unsplash API.
def search_results(request):
    API_KEY = os.getenv('API_KEY_UNSPLASH')
    query = ' '.join(request.GET.get('query', '').split()).lower()
    page = request.GET.get('page', '')


    # Invalid input
    if not query or not page.isdigit():
        return JsonResponse({'error': 'Invalid query or page'})
    
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


# Function to get the popular searches
def get_popular_searches(request):
    limit = request.GET.get('limit')

    if not limit or limit == 'undefined':
        limit = 10
    else:
        limit = int(limit)

    try:
        client = connection_mongodb('views.get_popular_searches')
        db = client['SearchArchive']
        collection = db['searches']

        popular_searches = collection.find({}, {'query': 1, 'count': 1, '_id': 1}).sort('count', DESCENDING).limit(limit)

        res = {'popular_searches': json.loads(json_util.dumps(list(popular_searches)))}

        return JsonResponse(res, safe=False)
    except Exception as e:
        # Handle other general exceptions
        print(f'Error: {e}')


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
