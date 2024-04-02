# FlickPulse

## Description
FlickPulse is a web application that allows users to discover and like movies/series. It provides a user-friendly interface to browse through a vast collection of media retrieve from TMDB API.

## Technology Stack and Features

- 🚀 [NextJS](https://nextjs.org/) for the frontend.
    - 🎨 [SaSS](https://sass-lang.com/) for the frontend style.
- [Axios](https://axios-http.com/docs/intro) for JS requests
- 💾 [PostgreSQL](https://www.postgresql.org) as the SQL database from Vercel.
- 🔒 Secure password hashing by default.
- 🔑 Next-auth JWT token authentication.

## Features
- Browse media by genre, release date, and popularity
- Search for movies by title or keywords
- View detailed information about each media, including cast, crew, and synopsis
- Create a watchlist of movies to watch later

## Installation for dev
1. Clone the repository: `git clone https://github.com/s3kiro23/flickpulse.git`
2. Set up `.env` with your variables like `.env.development`
3. Install the required dependencies in frontend/ : `npm install` | `yarn`
4. Start the frontend application: `next dev` | `yarn dev` | `npm run dev`
