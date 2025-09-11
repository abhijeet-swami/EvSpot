# EvSpot API Reference

## Overview

The EvSpot API provides endpoints for managing electric vehicle charging stations, user accounts, ratings, and comments. This document details the available endpoints, request formats, and response structures.

**Base URL**: `/api/v1`

-----

## Authentication

Authentication is handled via a secure, **`HttpOnly` cookie** set upon successful login. API clients and browsers that support cookies will automatically include the authentication credential with subsequent requests to protected endpoints. Manual management of authorization headers is not required.

-----

## Resource Endpoints

### Authentication

#### Register User

Creates a new user account.

  * **Endpoint**: `POST /auth/register`
  * **Authentication**: None

<details\>
<summary\>View Details\</summary\>

**Request Body:**

```json
{
  "fullName": "Alex James",
  "username": "alex",
  "email": "alex@example.com",
  "password": "strongpassword123"
}
```

**Response Codes:**

| Status | Description |
| :--- | :--- |
| `201 Created` | User registered successfully. |
| `400 Bad Request` | Missing or invalid fields. |
| `409 Conflict` | Username or email already exists. |

</details\>

#### Login User

Authenticates a user and sets the session cookie.

  * **Endpoint**: `POST /auth/login`
  * **Authentication**: None

<details\>
<summary\>View Details\</summary\>

**Request Body:**

```json
{
  "username": "alex",
  "password": "strongpassword123"
}
```

**Success Response (`200 OK`):**

  * An `HttpOnly` cookie is set in the response headers.
  * The response body contains user information.

</details\>

### User

Endpoints for managing user-specific data.

#### Get Current User Profile

Retrieves the profile of the authenticated user.

  * **Endpoint**: `GET /user/me`
  * **Authentication**: Required

#### Get Favorite Stations

Retrieves a list of the authenticated user's favorite stations.

  * **Endpoint**: `GET /user/favorite`
  * **Authentication**: Required

#### Toggle Favorite Station

Adds a station to, or removes it from, the user's favorites list.

  * **Endpoint**: `POST /user/favorite`
  * **Authentication**: Required

<details\>
<summary\>View Details\</summary\>

**Request Body:**

```json
{
  "stationId": "68c10c0a4d2a2c9e670abec2"
}
```

**Success Response (`200 OK` or `201 Created`):**

  * Returns a success message indicating whether the station was added or removed.

</details\>

### Station

Endpoints for discovering and retrieving station information.

#### Find Nearby Stations

Locates stations within a specified radius of a geographic point.

  * **Endpoint**: `GET /station/nearby`
  * **Authentication**: None

<details\>
<summary\>View Details\</summary\>

**Query Parameters:**

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `lat` | Number | Yes | Latitude coordinate. |
| `lng` | Number | Yes | Longitude coordinate. |
| `radius`| Number | Yes | Search radius in meters. |

**Example:** `GET /station/nearby?lat=28.0220&lng=73.3100&radius=10000`

</details\>

#### Find Stations by City

Retrieves all stations in a specific city.

  * **Endpoint**: `GET /station`
  * **Authentication**: None

<details\>
<summary\>View Details\</summary\>

**Query Parameters:**

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `city` | String | Yes | Name of the city (case-insensitive). |

**Example:** `GET /station?city=Bikaner`

\</details\>

#### Get Station Details

Retrieves detailed information for a single station.

  * **Endpoint**: `GET /station/get/station`
  * **Authentication**: None

<details\>
<summary\>View Details\</summary\>

**Query Parameters:**

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | The unique ID of the station. |

**Example:** `GET /station/get/station?id=68c10c0a4d2a2c9e670abebf`

</details\>

### Comments

Endpoints for managing user comments on stations.

#### Add Comment

Adds a comment to a station.

  * **Endpoint**: `POST /station/add/comment`
  * **Authentication**: Required

<details\>
<summary\>View Details\</summary\>

**Request Body:**

```json
{
  "comment": "Great station with fast charging!",
  "station_id": "68c10c0a4d2a2c9e670abec1"
}
```

</details\>

#### Delete Comment

Deletes a comment owned by the user.

  * **Endpoint**: `DELETE /station/delete/comment`
  * **Authentication**: Required

<details\>
<summary\>View Details\</summary\>

**Request Body:**

```json
{
  "comment_id": "68c255ddf1913d257893da16"
}
```

</details\>

### Ratings

Endpoints for managing user ratings on stations.

#### Add Rating

Adds a new rating to a station.

  * **Endpoint**: `POST /station/add/rating`
  * **Authentication**: Required

<details\>
<summary\>View Details\</summary\>

**Request Body:**

```json
{
  "rating": 4,
  "station_id": "68c10c0a4d2a2c9e670abec1"
}
```

</details\>

#### Update Rating

Updates a rating previously submitted by the user.

  * **Endpoint**: `PUT /station/update/rating`
  * **Authentication**: Required

<details\>
<summary\>View Details\</summary\>

**Request Body:**

```json
{
  "rating": 5,
  "rating_id": "68c25726eaf0811270e8b6d6"
}
```

</details\>
