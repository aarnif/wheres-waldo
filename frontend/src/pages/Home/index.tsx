import { useRef, useEffect, useState } from "react";
import type { GameCardData } from "../../types";
import { getGames, syncGameScores } from "../../services/games";
import { clearGameScores, getGameScores } from "../../helpers/localGameScores";
import useAuth from "../../hooks/useAuth";
import useNotify from "../../hooks/useNotify";
import Header from "./Header";
import GameCard from "./GameCard";
import LoginModal from "./LoginModal";
import SyncScoresModal from "./SyncScoresModal";

const PLACEHOLDER_COUNT = 6;

const placeholders: GameCardData[] = Array.from(
  { length: PLACEHOLDER_COUNT },
  (_, index) => ({ id: index + 1, isPlaceholder: true }),
);

const Home = () => {
  const { user } = useAuth();
  const { notify } = useNotify();
  const previousUserRef = useRef(user);
  const [games, setGames] = useState<GameCardData[]>(placeholders);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"games" | "leaderboard">("games");
  const [showSyncModal, setShowSyncModal] = useState(false);

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    const justLoggedIn = !previousUserRef.current && user;
    if (justLoggedIn && getGameScores().length > 0) {
      setShowSyncModal(true);
    }
    previousUserRef.current = user;
  }, [user]);

  const fetchGames = () => {
    getGames()
      .then(setGames)
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSync = async () => {
    try {
      await syncGameScores(getGameScores());
      clearGameScores();
      notify("Scores saved successfully!", "success");
    } catch (error) {
      console.error(error);
      notify("Failed to save scores", "error");
    } finally {
      fetchGames();
      setShowSyncModal(false);
    }
  };

  const handleDismiss = () => {
    setShowSyncModal(false);
  };

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
      {showSyncModal && (
        <SyncScoresModal
          handleSync={handleSync}
          handleDismiss={handleDismiss}
        />
      )}
    </div>
  );
};

export default Home;
