# Where's Waldo (A Photo Tagging App)

This is a photo tagging app where users must find Waldo and other characters from a crowd of people.
The project is part of [The Odin Project's](https://www.theodinproject.com/) Full Stack JavaScript path.

## Disclaimer

**This is a personal, non-commercial project.**
The code is MIT-licensed, but the characters and images are not covered by that license, and I do not own any rights to them.
Where's Waldo (originally Where's Wally) was created by Martin Handford. All rights belong to their respective owners.

## Requirements

- Node.js (v24 or newer)
- Docker and Docker Compose (for the local database)
- npm

## Development

1. Clone the repository

   HTTPS:

   ```bash
   git clone https://github.com/aarnif/wheres-waldo.git
   ```

   SSH:

   ```bash
   git clone git@github.com:aarnif/wheres-waldo.git
   ```

2. Go to the project root directory

   ```bash
   cd wheres-waldo
   ```

3. Install all dependencies

   ```bash
   npm install
   ```

4. Set up the backend environment variables

   Create a `.env` file in the `backend` directory with the following variables:

   ```bash
   DATABASE_URL=YOUR_DATABASE_URL_HERE
   JWT_SECRET=YOUR_JWT_SECRET_HERE
   ```

   **Option A: Docker PostgreSQL (recommended for development)**

   If you use the Docker container, the environment variables should be:

   ```bash
   DATABASE_URL=postgres://postgres:mysecretpassword@localhost:5432/postgres
   JWT_SECRET=your-development-secret-key
   ```

   Start the database in a Docker container in a new terminal (leave it running):

   ```bash
   npm run backend:db:start
   ```

   **Option B: Your own PostgreSQL**

   Point `DATABASE_URL` to your own database.

5. Set up the frontend environment variables

   Create `.env.development` and `.env.production` files in the `frontend` directory (the latter for previewing the production build locally) with the following content:

   `.env.development`:

   ```bash
   VITE_API_URL=http://localhost:3000
   ```

   `.env.production`:

   ```bash
   VITE_API_URL=http://localhost:3000
   ```

6. Set up the database with migrations and seed data (deletes existing app data)

   ```bash
   npm run backend:db:populate
   ```

7. Start the backend in development mode (in a new terminal)

   ```bash
   npm run backend:dev
   ```

8. Start the frontend in development mode (in a new terminal)

   ```bash
   npm run frontend:dev
   ```

   The app is now running at http://localhost:5173.

## Running the app in a Docker container

1. Set up environment variables

   **Backend**

   Use the following variables in the `.env` file in the `backend` directory:

   ```bash
   NODE_ENV=production
   DATABASE_URL=postgres://postgres:mysecretpassword@host.docker.internal:5432/postgres
   JWT_SECRET=your-development-secret-key
   ```

   The database must be running and contain the tables and seed data (see steps 4 and 6 under [Development](#development)).

2. Build the production Docker image

   ```bash
   docker build -t wheres-waldo .
   ```

3. Start the app in a Docker container

   ```bash
   docker run --env-file backend/.env -p 3000:3000 wheres-waldo
   ```

   The backend also serves the frontend, so the app is running at http://localhost:3000.

## npm commands

### General

- `npm install` - Install all app dependencies

### Database

- `npm run backend:db:start` - Start PostgreSQL in a Docker container
- `npm run backend:db:populate` - Run the migrations, delete existing app data and add seed data

### Backend

- `npm run backend:dev` - Start the backend in development mode
- `npm run backend:start` - Start the backend without watching for file changes
- `npm run backend:build` - Build the backend for production
- `npm run backend:test` - Run the backend tests
- `npm run backend:lint` - Lint the backend code

### Frontend

- `npm run frontend:dev` - Start the frontend in development mode
- `npm run frontend:build` - Build the frontend for production
- `npm run frontend:start` - Preview the production build locally
- `npm run frontend:test` - Run the frontend tests
- `npm run frontend:lint` - Lint the frontend code

### End-to-end testing

- `npm run e2e:test` - Run the Playwright end-to-end tests
- `npm run e2e:report` - Open the latest Playwright test report
