import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { clearToken } from "../../helpers/token";

const Header = ({ handleOpen }: { handleOpen: () => void }) => {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <header className="font-body flex items-center justify-between p-4">
      <h1 className="font-title text-3xl font-bold text-red-600 sm:text-4xl">
        Where's Waldo
      </h1>
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
              to="/signup"
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
