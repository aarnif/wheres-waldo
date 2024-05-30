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

  console.log("Games:", games);

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route
          path="/"
          element={
            user ? <Home games={games} /> : <Navigate replace to="/login" />
          }
        />
        <Route path="/games/:id" element={<Game game={game} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
