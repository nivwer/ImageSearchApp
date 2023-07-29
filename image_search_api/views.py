import os
import requests
import json
from django.http import JsonResponse
from datetime import datetime
from bson import json_util
from pymongo import MongoClient, errors, DESCENDING
from dotenv import load_dotenv

# Load the virtual environment.
load_dotenv()


# Connection to MongoDB.
def connection_mongodb(origin):
    # Environment variable for MongoDB databases.
    MONGO_URI = os.getenv('MONGO_URI')
    # Timestamp in the format: [day/month/year hour:minute:second].
    dtn = datetime.now().strftime("[%d/%b/%Y %H:%M:%S]")

    # Try to connect to the MongoDB databases.
    try:
        client = MongoClient(MONGO_URI)
        # If the connection is seccessful.
        print(f'{dtn} "MongoDB connection successful ({origin})"')
        return client

    except errors.ConnectionError as e:
        # Handle MongoDB connection error.
        print(f'{dtn} MongoDB connection error: {e}')

    except errors.ServerSelectionTimeoutError as e:
        # Handle MongoDB server selection timeout error.
        print(f'{dtn} MongoDB server selection timeout error: {e}')


# Function to log search queries in the SearchArchive database.
def log_search(query):
    # If the query is invalid.
    if not query:
        return JsonResponse({'error': 'Invalid query'})

    # If the query is valid, try save the query in the searches collection.
    try:
        # Connection to MongoDB databases.
        client = connection_mongodb('views.log_search')
        db = client['SearchArchive']
        collection = db['searches']

        # Find the query.
        result = collection.find_one({'query': query})

        if result:
            # If the query is found, count +1 ( Searches ).
            collection.update_one(result, {'$inc': {'count': 1}})
        else:
            # If the query is not found, log the query into the searches collection.
            collection.insert_one({'query': query, 'count': 1})

        # If the logged is seccessfully, return this message.
        return JsonResponse({'message': 'Search query logged successfully'})

    except errors.WriteError as e:
        # Handle MongoDB write error.
        print(f'MongoDB write error: {e}')

    except Exception as e:
        # Handle other general exceptions.
        print(f'Error: {e}')


# Create your views here.

# Function for handling search queries and image search results from Unsplash API.
def search_results(request):
    # Environment variable for Unsplash API.
    API_KEY = os.getenv('API_KEY_UNSPLASH')

    # Get parameters.
    # Remove spaces.
    query = ' '.join(request.GET.get('query', '').split()).lower()
    page = request.GET.get('page', '')

    # If query or page is invalid.
    if not query or not page.isdigit():
        return JsonResponse({'error': 'Invalid query or page'})

    # If query and page is valid, try to save the query in the SearchArchive database.
    log_search(query)

    # URL Unsplash API.
    URL = f'https://api.unsplash.com/search/photos/?client_id={API_KEY}&query={query}&page={page}&per_page=29'

    # If query and page is valid, try to get the Images Data.
    try:
        # Get the response.
        res = requests.get(URL)
        res.raise_for_status()  # Raise an exception for HTTP errors.
        json_data = res.json()  # Converted to JSON response.

        # If response is seccessfully, return Images Data in the JSON response.
        return JsonResponse(json_data, safe=False)

    except requests.exceptions.HTTPError as e:
        # Handle HTTP errors by returning an error JSON response.
        return JsonResponse({'error': f'HTTP error: {e}', 'status_code': res.status_code})

    except requests.exceptions.JSONDecodeError as e:
        # Handle JSON decoding errors by returning an error JSON response.
        return JsonResponse({'error': f'JSON decoding error: {e}'})

    except requests.exceptions.RequestException as e:
        # Handle general request exceptions by returning an error JSON response.
        return JsonResponse({'error': f'Request exception: {e}'})


# Function to get the popular searches.
def get_popular_searches(request):
    # Get the limit parameter.
    limit = request.GET.get('limit')

    # Validation of the Limit parameter.
    if not limit or limit == 'undefined':
        limit = 10
    else:
        limit = int(limit)

    # Try to get the popular searches.
    try:
        # Connection to MongoDB databases.
        client = connection_mongodb('views.get_popular_searches')
        db = client['SearchArchive']
        collection = db['searches']

        # Find the queries ( Popular searches ) in descending order.
        popular_searches = collection.find(
            {}, {'query': 1, 'count': 1, '_id': 1}).sort('count', DESCENDING).limit(limit)

        # Convert the BSON response to a JSON response.
        res = {'popular_searches': json.loads(
            json_util.dumps(list(popular_searches)))}

        # If response is seccessfully, return the Popular Searches in a JSON response.
        return JsonResponse(res, safe=False)

    except Exception as e:
        # Handle other general exceptions.
        print(f'Error: {e}')
