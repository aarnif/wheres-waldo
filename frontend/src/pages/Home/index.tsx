import { useEffect, useState } from "react";
import type { GameCardData } from "../../types";
import { getGames } from "../../services/games";
import Header from "./Header";
import GameCard from "./GameCard";
import LoginModal from "./LoginModal";

const PLACEHOLDER_COUNT = 6;

const placeholders: GameCardData[] = Array.from(
  { length: PLACEHOLDER_COUNT },
  (_, index) => ({ id: index + 1, isPlaceholder: true }),
);

const Home = () => {
  const [games, setGames] = useState<GameCardData[]>(placeholders);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"games" | "leaderboard">("games");

  useEffect(() => {
    getGames()
      .then(setGames)
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[url('/background.png')] bg-size-[auto_100%] bg-center bg-repeat-x">
      <Header
        handleOpen={handleOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="flex w-full grow justify-center">
        <div className="grid max-w-400 grow grid-cols-1 gap-8 p-8 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              showLeaderboard={activeTab === "leaderboard"}
            />
          ))}
        </div>
      </main>
      {open && <LoginModal handleClose={handleClose} />}
    </div>
  );
};

export default Home;
