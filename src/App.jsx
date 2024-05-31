import loggingService from "./services/loggingService";
import gameService from "./services/gameService";

import Home from "./components/Home";
import Game from "./components/Game";
import Login from "./components/Auth/Login";

import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useMatch } from "react-router-dom";

const App = () => {
  const match = useMatch("/games/:id");

  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);

  const game = match ? games.find((game) => game.id === match.params.id) : null;

  useEffect(() => {
    console.log("Fetching games...");
    gameService.getAllGames().then((games) => setGames(games));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      loggingService.setToken(user.token);
    }
  }, []);

  console.log("User:", user);
  console.log("Games:", games);

  if (!games.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
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
        <Route path="/games/:id" element={<Game game={game} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </div>
  );
};

export default App;
