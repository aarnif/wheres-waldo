import signingService from "./services/signingService";
import gameService from "./services/gameService";

import Header from "./components/Header";
import LoadingIcon from "./LoadingIcon.jsx";
import Footer from "./components/Footer/index.jsx";
import Home from "./components/Home";
import Game from "./components/Game";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";

import ScrollToHashElement from "./ScrollToHashElement.jsx";

import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useMatch } from "react-router-dom";

const App = () => {
  const match = useMatch("/games/:id");

  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const [randomGameId, setRandomGameId] = useState(null);

  const currentGame = match
    ? games.find((game) => game.id === match.params.id)
    : null;

  useEffect(() => {
    console.log("Fetching games...");
    gameService.getAllGames().then((games) => {
      setGames(games);
      setRandomGameId(games[Math.floor(Math.random() * games.length)].id);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      signingService.setToken(user.token);
    }
  }, []);

  console.log("User:", user);
  console.log("Games:", games);

  if (!games.length) {
    return (
      <div className="min-h-screen flex flex-col bg-zinc-600">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <LoadingIcon />
        </div>
        <Footer />
      </div>
    );
  }

  console.log("Random game ID:", randomGameId);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-600">
      <ScrollToHashElement />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Home user={user} games={games} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/games/:id"
          element={
            <Game
              user={user}
              setUser={setUser}
              currentGame={currentGame}
              setGames={setGames}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setUser={setUser} randomGameId={randomGameId} />}
        />
        <Route
          path="/signup"
          element={<SignUp setUser={setUser} randomGameId={randomGameId} />}
        />
      </Routes>
    </div>
  );
};

export default App;
