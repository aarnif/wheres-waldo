# Where's Waldo (A Photo Tagging App)

This is a photo tagging app where users must find Waldo and other characters from a crowd of people.
The project is part of the [The Odin Project's](https://www.theodinproject.com/) Full Stack JavaScript path.

## Features

- Users can/must create an account and sign in (<strong>Currently no play without an account!</strong>).
- Users can view all the games.
- Users can play a game and record their time.

## Live Preview

- [Where's Waldo UI](https://wheres-waldo-aarnif.netlify.app/login)
- [Where's Waldo API](https://wheres-waldo-api-rln6.onrender.com/)

## Technologies

- Node.js
- Express
- MongoDB
- Vite + React
- Tailwind CSS
- HTML

## Icons

- [Material Design Icons](https://pictogrammers.com/library/mdi/)
- [Font Awesome](https://fontawesome.com/)

## Warning!

<strong>This project is for personal use only!</strong>
I do not hold any rights to the characters/images used in this project.
Where's Waldo (originally Where's Wally) is a brand created by Martin Handford.

## Images

![Where's Waldo](/frontend/public/images/sign-in.png)
Sign In Page
<br>

![Where's Waldo](/frontend/public/images/games.png)
Games Page
<br>

![Where's Waldo](/frontend/public/images/game-view.png)
Game View
<br>

Below are all the routes that the api supports.

```
- GET /api
- GET /api/games
- GET /api/games/:gameId
- GET /api/games/:gameId/image
- GET /api/games/:gameId/characters
- GET /api/games/:gameId/characters/:characterId
- GET /api/games/:gameId/characters/:characterId/image
- GET /api/games/:gameId/leaderboard
- POST /api/games/:gameId
- GET /api/users
- GET /api/users/:userId
- POST /api/users
- POST /api/login
```

## Instructions

```
HTTPS - git clone https://github.com/aarnif/wheres-waldo-view.git

SSH - git clone git@github.com:aarnif/wheres-waldo-view.git

cd wheres-waldo-view

npm install

npm run dev:server # Start the server in development mode

npm run dev:ui # Start the ui in development mode

npm run prod:server # Start the server in production mode

npm run build:ui # Build the ui

npm run prod:ui # Start the ui in production mode

```
