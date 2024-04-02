# FlickPulse

## Description
FlickPulse is a web application that allows users to discover and like movies/series. It provides a user-friendly interface to browse through a vast collection of media.

## Technology Stack and Features

- ⚡ [**FastAPI**](https://fastapi.tiangolo.com/) for the Python backend API.
    - 🧰 [SQLModel](https://sqlmodel.tiangolo.com) for the Python SQL database interactions (ORM).
    - 🔍 [Pydantic](https://docs.pydantic.dev), used by FastAPI, for the data validation and settings management.
    - 💾 [MariaDB](https://www.postgresql.org) as the SQL database.
- 🚀 [NextJS](https://nextjs.org/) for the frontend.
    - 🎨 [SaSS](https://sass-lang.com/) for the frontend style.
- 🐋 [Docker Compose](https://www.docker.com) for development and production.
- [Axios](https://axios-http.com/docs/intro) for JS requests
- 🔒 Secure password hashing by default.
- 🔑 JWT token authentication.

## Features
- Browse media by genre, release date, and popularity
- Search for movies by title or keywords
- View detailed information about each media, including cast, crew, and synopsis
- Create a watchlist of movies to watch later

## Installation for dev
1. Clone the repository: `git clone https://github.com/s3kiro23/flickpulse.git`
2. Set up `.env` in frontend/ and backend/ folder with your variables like `.env.development`
3. Install the required dependencies in frontend/ : `npm install` | `yarn`
4. Build the docker for backend/ : 
    - `cd backend/`
    - `docker-compose up -d`
5. Migrate all data from alembic migration to database : `docker exec <ID_DU_CONTENEUR> alembic upgrade head`
6. Start the frontend application: `next dev` | `yarn dev` | `npm run dev`


## Usage
Method POST only available with valid token in headers (Authentication = Bearer) on `http://localhost:8888/`.

- URL availables:
  - `/docs/`: Swagger page to test api and view all endpoints.
  - `/redoc/`: Redoc api doc.

## Documentation
For detailed documentation, please refer to the [API documentation](`http://localhost:8888/docs`).
