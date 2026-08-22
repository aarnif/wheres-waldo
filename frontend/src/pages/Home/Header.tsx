import { Link } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { clearToken } from "../../helpers/token";

const Header = ({
  handleOpen,
  activeTab,
  setActiveTab,
}: {
  handleOpen: () => void;
  activeTab: "games" | "leaderboard";
  setActiveTab: React.Dispatch<React.SetStateAction<"games" | "leaderboard">>;
}) => {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    clearToken();
    setUser(null);
  };

  const toggleButtons = [
    {
      name: "Games",
      onClick: () => setActiveTab("games"),
    },
    {
      name: "Leaderboard",
      onClick: () => setActiveTab("leaderboard"),
    },
  ];

  return (
    <header className="font-body flex items-center justify-between p-4">
      <h1 className="font-title text-3xl font-bold text-red-600 sm:text-4xl">
        Where's Waldo
      </h1>
      <div className="fixed right-2 bottom-2 z-10 flex items-center gap-2 rounded-full border border-slate-600/40 bg-slate-600/20 p-1 shadow-lg backdrop-blur-xl sm:static sm:backdrop-blur-sm">
        {toggleButtons.map(({ name, onClick }) => {
          const isActive = name.toLocaleLowerCase() === activeTab;
          return (
            <button
              key={name}
              onClick={onClick}
              className={`relative cursor-pointer rounded-full px-2.25 py-1.5 text-xs font-bold sm:px-3 sm:py-2 sm:text-sm ${isActive ? "text-white" : "text-slate-300"} transition-colors duration-300 ease-in-out hover:text-slate-100`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-button"
                  className="absolute inset-0 -z-1 rounded-full bg-slate-500"
                />
              )}
              {name}
            </button>
          );
        })}
      </div>
      <nav className="flex items-center gap-4 text-white sm:gap-8">
        {user ? (
          <>
            <span className="text-sm font-bold sm:text-base">
              {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="cursor-pointer rounded-lg bg-slate-500 px-2.25 py-1.5 text-sm font-bold shadow-[3px_3px_0px_0px] shadow-slate-950 transition-all duration-300 hover:bg-slate-600 active:translate-x-0.75 active:translate-y-0.75 active:shadow-none sm:px-3 sm:py-2 sm:text-base"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/sign-up"
              className="rounded-lg bg-red-600 px-2.25 py-1.5 text-sm font-bold shadow-[3px_3px_0px_0px] shadow-slate-950 transition-all duration-300 hover:bg-red-700 active:translate-x-0.75 active:translate-y-0.75 active:shadow-none sm:px-3 sm:py-2 sm:text-base"
            >
              Sign Up
            </Link>
            <button
              onClick={handleOpen}
              className="cursor-pointer rounded-lg bg-slate-500 px-2.25 py-1.5 text-sm font-bold shadow-[3px_3px_0px_0px] shadow-slate-950 transition-all duration-300 hover:bg-slate-600 active:translate-x-0.75 active:translate-y-0.75 active:shadow-none sm:px-3 sm:py-2 sm:text-base"
            >
              Log In
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
