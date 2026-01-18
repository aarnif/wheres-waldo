import signingService from "./services/signingService";
import gameService from "./services/gameService";

import Title from "./components/Title";
import LoadingPage from "./components/Loading/LoadingPage.jsx";
import Home from "./components/Home";
import Game from "./components/Game";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";

import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useMatch } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const match = useMatch("/games/:id");

  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const [showTitle, setShowTitle] = useState(true);

  const currentGame = match
    ? games.find((game) => game.id === match.params.id)
    : null;

  useEffect(() => {
    console.log("Fetching games...");
    gameService.getAllGames().then((games) => {
      setGames(games);
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

  return (
    <>
      {showTitle && (
        <div className="absolute top-0 left-0 z-50 hidden px-4 py-4 sm:block sm:px-8">
          <Title />
        </div>
      )}
      <AnimatePresence>
        {!games.length ? (
          <LoadingPage key="loading-page" />
        ) : (
          <motion.div
            key="front-page"
            className="min-h-screen flex flex-col bg-[url('/images/4-point-stars.svg')] bg-repeat bg-[length:20px_20px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
          >
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
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/signup" element={<SignUp setUser={setUser} />} />
              <Route
                path="/games/:id"
                element={
                  <Game
                    user={user}
                    setUser={setUser}
                    currentGame={currentGame}
                    setGames={setGames}
                    setShowTitle={setShowTitle}
                  />
                }
              />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
