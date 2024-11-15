import { useNavigate, Link } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    console.log(`Logging out user ${user.username}`);
    window.localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <header className="absolute z-10 h-[90px] w-full flex flex-col justify-center items-center shadow-lg bg-zinc-700 bg-opacity-90 text-white">
      <div className="w-full flex-grow basis-3/5 flex justify-center items-center">
        <div className="flex-grow flex justify-around items-center">
          {user && (
            <div className="flex-grow basis-1/3 flex justify-around items-center">
              <h2 className="text-center font-title text-lg font-bold">
                Dashboard: {user.username}
              </h2>
            </div>
          )}
          <h1 className="flex-grow basis-2/3 text-center font-title text-2xl font-bold">
            <Link to="/#hero">Where's Waldo</Link>
          </h1>
          {user && (
            <div className="flex-grow basis-1/3 flex justify-center items-center">
              <ul className="flex-grow flex">
                <li>
                  <button
                    onClick={handleLogOut}
                    data-testid="sign-out-button"
                    className="flex-grow ml-2 min-w-[200px] h-[60px] bg-zinc-600 rounded-xl text-xl font-bold text-white
                hover:bg-zinc-800 active:scale-95 transition"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
