# CouchCat

While consumers now have access to more streaming services than ever, this can make it more difficult to find a specific title or browse across multiple streaming service subscriptions. CouchCat streamlines the process of finding a movie to watch by allowing the user to search across streaming service catalogues, filtering results by categories like genre, director, and cast. The website also allows the user to create an account, which they can use to add movies to their watchlist and rate movies they have watched. These features help the user spend less time browsing and more time watching, and maximize the value they receive from their streaming subscriptions.

---

## API documentation

### UserController - receive/input information about users

#### Register a new user and add to database at /user/register (POST)

Example JSON request:
```
{
    "firstName": "erin",
    "lastName": "muzughi",
    "email": "erinmuzughi@gmail.com",
    "password": "testing321*"
}
```

#### Login a user at /user/login (POST)
(Note that for this application email = username)

Example JSON request:
```
{
    "email": "erinmuzughi@gmail.com",
    "password": "testing321*"
}
```
Response will include header, with Set-Cookie and the sessionId

Example response:
```
Key: Set-Cookie; Value: sessionId=9461a81a-0771-4cd1-99a9-bf31cae30c51; Path=/; Secure; HttpOnly;

```


#### Logout a user using the sessionId set when they login at /user/logout (POST)
Request (includes header with Cookie and the sessionId= + the sessionId as the value)

Example request
```
Headers:
Key: Cookie, Value: sessionId=a9f9ccab-0e62-492c-ae71-5c76c0f70632;

```

### MovieController - receive/input information about movies

#### Return all movies in database at /movies (GET)

Example output:
```
[
    {
        "id": 1,
        "title": "The Favourite",
        "year": 2015,
        "description": "intrigue",
        "director": "Yorgos Lanthimos",
        "cast": "Rachel Weisz and Olivia Colman",
        "rating": 5.0,
        "poster": "placeholder string"
    },
    {
        "id": 2,
        "title": "The Boy and the Heron",
        "year": 2023,
        "description": "animation",
        "director": "Hayao Miyazaki",
        "cast": "Robert Pattinson",
        "rating": 4.0,
        "poster": "placeholder string"
    }
]
```
#### Return one movie by ID at /movies/{id} (GET)

Example output:
```
{
    "id": 1,
    "title": "The Favourite",
    "year": 2015,
    "description": "intrigue",
    "director": "Yorgos Lanthimos",
    "cast": "Rachel Weisz and Olivia Colman",
    "rating": 5.0,
    "poster": "placeholder string"
}
```
#### Add movie to database at /movies/save (POST)

Example JSON request:
```
{
    "id": 3,
    "title": "Killers of the Flower Moon",
    "year": 2023,
    "description": "placeholder description",
    "director": "Martin Scorsese",
    "cast": "Lily Gladstone, Leonardo DiCaprio",
    "rating": 5.0,
    "poster": "placeholder string"
}
```
#### Delete one movie from database at /movies/{id} (DELETE)

---

### WatchlistController - manage user watchlist

#### Return all movies on a user's watchlist at /watchlist/{userId} (GET)
Outputs same data format as /movies

#### Save movie to watchlist at /watchlist/save (POST)

*Note: previous version took a User object and a Movie object, but when testing with Postman this can overwrite the User watchlist when new movies are added.*

Example JSON request (takes a userId and a Movie object):

```
{
  "userId": 1,
  "movie": {
    "id": 12,
    "title": "The Favourite",
    "year": 2018,
    "description": "placeholder description",
    "director": "Yorgos Lanthimos",
    "cast": "Rachel Weisz and Olivia Colman",
    "rating": 5.0,
    "poster": "placeholder string"
	}
}
```

#### Delete movie from watchlist at /watchlist (DELETE)

Example JSON request (takes a user ID and a movie ID):

```
{
        "userId": 1,
        "movieId": 12
}
```
---

### LogController - manage user movie log

#### Return all of a user's logged movies at /log/{userId} (GET)

Example output:
```
[
    {
        "id": {
            "userId": 1,
            "movieId": 2
        },
        "movie": {
            "id": 2,
            "title": "The Boy and the Heron",
            "year": 2023,
            "description": "animation",
            "director": "Hayao Miyazaki",
            "cast": "Robert Pattinson",
            "rating": 4.0,
            "poster": "placeholder string"
        },
        "userRating": 4,
        "dateAdded": "2023-12-22T19:59:26.111+00:00"
    },
    {
        "id": {
            "userId": 1,
            "movieId": 21
        },
        "movie": {
            "id": 21,
            "title": "Doom Generation",
            "year": 1995,
            "description": "placeholder description",
            "director": "Gregg Araki",
            "cast": "James Duvall",
            "rating": 5.0,
            "poster": "placeholder string"
        },
        "userRating": 5,
        "dateAdded": "2023-12-23T21:49:24.980+00:00"
    }
]
```
#### Log a movie at /log/save (POST)

Example JSON request (takes a user ID and a movie ID):


```
{
  "userId": 1,
  "movie": {
            "id": 2,
            "title": "The Boy and the Heron",
            "year": 2023,
            "description": "animation",
            "director": "Hayao Miyazaki",
            "cast": "Robert Pattinson",
            "rating": 4.0,
            "poster": "placeholder string"
        },
  "userRating": 5
}
```

#### Change star rating for a logged movie at /log/rate (POST)

Example JSON request: takes
+ a userMovieLogId made up of userId and movieId
+ a new rating for the movie

```
{
  "userMovieLogId": {
    "userId": 102,
    "movieId": 1
  },
  "newRating": 3
}
```

#### Delete movie from log at /log (DELETE)

Pass in a userId and movieId to delete that user's log for that movie. Note: this does NOT delete the movie from the database.

```
{
  "userId": 102,
  "movieId": 1
}
```
