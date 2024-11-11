import baseUrl from "../../baseUrl.js";

import Header from "./Header/index.jsx";
import Games from "./Games/index.jsx";
import Footer from "./Footer/index.jsx";

import { useState } from "react";

const Home = ({ user, games }) => {
  const [randomGameId, setRandomGameId] = useState(
    games[Math.floor(Math.random() * games.length)].id
  );

  return (
    <>
      <Header user={user} />
      <div
        style={{
          backgroundImage: `url(${baseUrl}/games/${randomGameId}/image)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
