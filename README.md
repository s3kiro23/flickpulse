# FlickPulse

## Description
FlickPulse is a web application that allows users to discover and like movies/series. It provides a user-friendly interface to browse through a vast collection of media.
We used NextJs for Frontend app and FastApi for backend.

## Features
- Browse movies by genre, release date, and popularity
- Search for movies by title or keywords
- View detailed information about each movie, including cast, crew, and synopsis
- Rate and review movies
- Create a watchlist of movies to watch later

## Installation for dev
1. Clone the repository: `git clone https://github.com/sekiro23/my-movie-app.git`
2. Set up `.env` in frontend/ and backend/ folder with your variables like `.env.development`
3. Install the required dependencies in frontend/ : `npm install` | `yarn`
4. Build the docker for backend/ : `docker-compose up -d`
5. Migrate all data from alembic migration to database : `docker exec <ID_DU_CONTENEUR> alembic upgrade head`
6. Start the frontend application: `next dev` | `yarn dev` | `npm run dev`

## Technologies Used
- Nextjs
- Fastapi
- Axios
- SaSS

## Usage
Method POST only available with valid token in headers (Authentication = Bearer) on `http://localhost:8888/`.

- URL availables:
  - `/docs/`: Swagger page to test api and view all endpoints.
  - `/redoc/`: Redoc api doc.

## Documentation
For detailed documentation, please refer to the [API documentation](`http://localhost:8888/docs`).
