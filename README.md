# Image Search App

Documentation for Image Search App, a web application developed in Django and Django Rest Framework, with a Next.js client using Typescript langueage. This application allows search images based a keyword.

## Installation

```shell
# Clone the repository
git clone https://github.com/nivwer/ImageSearchApp
cd ImageSearchApp

# Install Django dependencies
poetry install

# Django initial setup
python manage.py collectstatic --no-input

# Install Next.js dependencies
cd client
npm install

```

## Environment Configuration

Set up the necessary environment variables for the project. Copy the `.env.example` file and rename it to `.env`, then modify the variables according to your needs.

## Django Server

To run the Django Server:

```shell
cd VotingApp

# WSGI server
gunicorn base.wsgi:application
```

The App will be available at `http://localhost:8000`.

## API Unsplash

This app utilizes [Unsplash API](https://api.unsplash.com) to fetch images.

## Next.js Client

The Next.js client delivers an interactive user interface for end-users and communicates with the server to fetch and display images.

To run the client:

```shell
cd client

# Development
npm run dev
```

The client will be available at `http://localhost:3000`.

For detailed information about the Next.js client, refer to the [Client Documentation](/client/README.md).

## License

Copyright © 2024 [nivwer](https://github.com/nivwer).  
This package is licensed under the [MIT License](/LICENSE). 
