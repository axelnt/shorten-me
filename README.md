# shorten-me API

## Description

shorten-me API is a simple URL shortener API that allows you to shorten URLs. It also comes with a administration routes to manage the shortened URLs along with the statistics of the shortened URLs. The API is built with [NestJS](https://nestjs.com/), uses [MongoDB](https://www.mongodb.com/) as the database and [Mongoose](https://mongoosejs.com/) as an ODM.

The API also does not include characters that are ambiguous such as `l`, `1`, `I`, `O`, `0` and `o` to avoid confusion when reading the shortened URL.

## Installation

To install the API, you need to have [Node.js](https://nodejs.org/en/) installed on your machine. After installing Node.js, you can clone the repository and run the following commands:

1. Clone the repository

```bash
git clone https://github.com/axelnt/shorten-me.git
```

2. Navigate to the project directory

```bash
cd shorten-me
```

3. Install the dependencies

```bash
npm install
```

4. Create a `.env` file: You can copy the `.env.example` file and rename it to `.env` with the following command:

```bash
cp .env.example .env
```

5. Start the API

5.1. Start the API in development mode

```bash
npm run start:dev
```

5.2. Start the API in production mode

5.2.1. First, build the project

```bash
npm run build
```

5.2.2. Start the API

```bash
npm run start:prod
```

Now you can access the API on `http://localhost:3000`.

## API Routes

## Creating a shortened URL

### Request

`POST /shorten`

    curl -i -X POST -H 'Content-Type: application/json' -d '{"url": "https://www.example.com"}' http://localhost:3000/shorten

### Response

    HTTP/1.1 201 Created
    {
      "status": "success",
      "timestamp": 1720620704542,
      "data": {
        "url": "https://example.com",
        "code": "fmr7j",
      }
    }

## Using the shortened URL

### Request

`GET /:shortenedUrl`

    curl -i http://localhost:3000/fmr7j

### Response

    HTTP/1.1 302 Found
    Location: https://example.com

## Getting all shortened URLs

-   Requires `Authorization` header with a valid JWT token.
-   Requires the user to have the `admin` role.

### Request

`GET /api/url`

    curl -i -H 'Authoriztion: Bearer <token>' http://localhost:3000/api/url

### Response

    HTTP/1.1 200 OK
    {
      "status": "success",
      "timestamp": 1720620704542,
      "data": [
        {
          "url": "https://example.com",
          "code": "fmr7j",
          "deleted": false,
          "visits": 0,
          "createdAt": "2024-07-10T12:25:40.535Z"
        }
      ]
    }

## Getting a shortened URL by code

-   Requires `Authorization` header with a valid JWT token.
-   Requires the user to have the `admin` role.

Using `GET /:shortenedUrl` will redirect to the original URL however, if you want to get the details of the shortened URL, you can use the following route:

### Request

`GET /api/url/:code`

    curl -i -H 'Authorizaion: Bearer <token>' http://localhost:3000/api/url/fmr7j

### Response

    HTTP/1.1 200 OK
    {
      "status": "success",
      "timestamp": 1720620704542,
      "data": {
        "url": "https://example.com",
        "code": "fmr7j",
        "deleted": false,
        "visits": 0,
        "createdAt": "2024-07-10T12:25:40.535Z"
      }
    }

## Soft Deleting a shortened URL

-   Requires `Authorization` header with a valid JWT token.
-   Requires the user to have the `admin` role.

This route will soft delete a shortened URL. The shortened URL will still be in the database but it will be marked as deleted.

### Request

`DELETE /api/url/:code`

    curl -i -X DELETE -H 'Authorizaion: Bearer <token>' http://localhost:3000/api/url/fmr7j

### Response

    HTTP/1.1 200 OK
    {
    "status": "success",
    "timestamp": 1720620825992
    }

## Hard Deleting a shortened URL

-   Requires `Authorization` header with a valid JWT token.
-   Requires the user to have the `admin` role.

This route will hard delete a shortened URL. The shortened URL will be removed from the database.

### Request

`DELETE /api/url/:code/hard`

    curl -i -X DELETE -H 'Authorizaion: Bearer <token>' http://localhost:3000/api/url/fmr7j/hard

### Response

    HTTP/1.1 200 OK
    {
    "status": "success",
    "timestamp": 1720620825992
    }

## Restoring a shortened URL

-   Requires `Authorization` header with a valid JWT token.
-   Requires the user to have the `admin` role.

This route will restore a soft deleted shortened URL.

### Request

`PATCH /api/url/:code/restore`

    curl -i -X PATCH -H 'Authorization: Bearer <token>' http://localhost:3000/api/url/fmr7j/restore

### Response

    HTTP/1.1 200 OK
    {
    "status": "success",
    "timestamp": 1720620825992
    }

## Login

This route will log in a user and return a JWT token.

### Request

`POST /api/auth/login`

    curl -i -X POST -H 'Content-Type: application/json' -d '{"username": "example", "password": "password"}' http://localhost:3000/api/auth/login

### Response

    HTTP/1.1 200 OK
    {
      "status": "success",
      "timestamp": 1720620825992,
      "data": {
        "token": "<token>"
      }
    }

## Registration

This route will register a user.

### Request

`POST /api/auth/register`

    curl -i -X POST -H 'Content-Type: application/json' -d '{"username": "example", "password": "password"}' http://localhost:3000/api/auth/register

### Response

    HTTP/1.1 201 Created
    {
      "status": "success",
      "timestamp": 1720620825992,
      "data": {
        "username": "example"
      }
    }

## Creating a user with a role

-   Requires `Authorization` header with a valid JWT token.
-   Requires the user to have the `admin` role.

This route will create a user with a role.

### Request

`POST /api/auth/`

    curl -i -X POST -H 'Authorization: Bearer <token>' -d '{"username": "example", "password": "password", "role": "admin"}' http://localhost:3000/api/auth/

### Response

    HTTP/1.1 201 Created
    {
      "status": "success",
      "timestamp": 1720620825992,
      "data": {
        "username": "example",
        "role": "admin"
      }
    }
