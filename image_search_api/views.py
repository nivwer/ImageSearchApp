# Standard.
import os
from datetime import datetime
# Virtualenv.
from dotenv import load_dotenv
# Django.
from django.http import JsonResponse, HttpResponseServerError
# MongoDB connection.
from utils.mongo_connection import MongoDBSingleton
# MongoDB.
from pymongo import errors, DESCENDING
import json
from bson import json_util
# Others.
import requests

# Load the virtual environment.
load_dotenv()

# Helpers.

# Function to log search queries in the SearchArchive database.
async def log_search(query):
    # If the query is invalid.
    if not query:
        return JsonResponse({'error': 'Invalid query'})

    # If the query is valid, try save the query in the searches collection.
    try:
        # Connection to MongoDB databases.
        mongo_connection = MongoDBSingleton()
        client = mongo_connection.client
        db = client['SearchArchive']
        collection = db['searches']

        # Find the query.
        result = await collection.find_one({'query': query})

        if result:
            # If the query is found, count +1 ( Searches ).
            await collection.update_one(result, {'$inc': {'count': 1}})
        else:
            # If the query is not found, log the query into the searches collection.
            await collection.insert_one({'query': query, 'count': 1})

        # If the logged is seccessfully, return this message.
        return JsonResponse({'message': 'Search query logged successfully'})

    except errors.WriteError as e:
        # Handle MongoDB write error.
        print(f'MongoDB write error: {e}')
        return JsonResponse({'error': 'Failed to log search query'})

    except Exception as e:
        # Handle other general exceptions.
        print(f'Error: {e}')
        return JsonResponse({'error': 'An unexpected error occurred'})


# Views.

# Function for handling search queries and image search results from Unsplash API.
async def search_results(request):
    # Environment variable for Unsplash API.
    API_KEY = os.getenv('API_KEY_UNSPLASH')

    # Get parameters and remote spaces.
    query = ' '.join(request.GET.get('query', '').split()).lower()
    page = request.GET.get('page', '')

    # If query or page is invalid.
    if not query or not page.isdigit():
        return JsonResponse({'error': 'Invalid query or page'})

    # URL Unsplash API.
    URL = f'https://api.unsplash.com/search/photos/?client_id={API_KEY}&query={query}&page={page}&per_page=29'

    # If query and page is valid, try to get the Images Data.
    try:
        # Get the response.
        res = requests.get(URL)
        res.raise_for_status()  # Raise an exception for HTTP errors.
        json_data = res.json()  # Converted to JSON response.

        # If query and page is valid, try to save the query in the SearchArchive database.
        if json_data and len(json_data) != 0:
            await log_search(query)

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
async def get_popular_searches(request):
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
        mongo_connection = MongoDBSingleton()
        client = mongo_connection.client
        db = client['SearchArchive']
        collection = db['searches']

        # Find the queries ( Popular searches ) in descending order.
        popular_searches = await collection.find(
            {}, {'query': 1, 'count': 1, '_id': 1}).sort('count', DESCENDING).limit(limit)

        # Convert the BSON response to a JSON response.
        res = {'popular_searches': json.loads(json_util.dumps(list(popular_searches)))}

        # If response is seccessfully, return the Popular Searches in a JSON response.
        return JsonResponse(res, safe=False)

    except Exception as e:
        # Handle other general exceptions.
        print(f'Error: {e}')
        return HttpResponseServerError("An error occurred while processing the request.")
