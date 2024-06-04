import Header from "./Header/index.jsx";
import Hero from "./Hero.jsx";
import Games from "./Games/index.jsx";
import Footer from "./Footer/index.jsx";

import { useState } from "react";

const Home = ({ user, games }) => {
  const [randomGameId, setRandomGameId] = useState(
    games[Math.floor(Math.random() * games.length)].id
  );
  return (
    <>
      <Header user={user} games={games} />
      <Hero randomGameId={randomGameId} />
      <div
        style={{
          backgroundColor: games[0].colorTheme.gameCanvas,
        }}
        className="w-full flex-grow flex flex-col justify-center items-center"
      >
        <Games user={user} games={games} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
