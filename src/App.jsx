import gameService from "./services/gameService";

import Header from "./components/Header";
import Hero from "./Hero";
import Games from "./components/Games/index.jsx";
import Footer from "./components/Footer";

import { useState, useEffect } from "react";

const App = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    console.log("Fetching games...");
    gameService.getAllGames().then((games) => setGames(games));
  }, []);

  console.log("Games:", games);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <div className="w-full flex-grow flex justify-center items-center">
        <Games games={games} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
