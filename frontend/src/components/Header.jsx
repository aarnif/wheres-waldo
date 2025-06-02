import { useNavigate } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiMenu, mdiLogout } from "@mdi/js";

const Title = () => (
  <h1 className="text-center sm:text-left text-slate-50 text-2xl sm:text-3xl font-bold font-roboto-condensed tracking-wide">
    Where's Waldo
  </h1>
);

const DesktopHeaderContent = ({ user, handleLogOut }) => {
  return (
    <div className="w-full hidden sm:flex justify-between items-center">
      <Title />
      <nav className="flex items-center gap-16">
        <p className="text-white text-base font-bold">{user.username}</p>
        <button
          className="flex justify-center items-center group"
          onClick={handleLogOut}
        >
          <Icon
            path={mdiLogout}
            size={1.2}
            className="text-white fill-current group-hover:text-slate-300 transition-colors duration-200"
          />
        </button>
      </nav>
    </div>
  );
};

const MobileHeaderContent = ({ user, handleLogOut }) => {
  const iconSize = 1;
  return (
    <div className="w-full sm:hidden flex justify-center items-center">
      <nav className="w-full flex justify-between items-center gap-8">
        <button className="flex justify-center items-center group">
          <Icon
            path={mdiMenu}
            size={iconSize}
            className="text-white fill-current group-hover:text-slate-300 transition-colors duration-200"
          />
        </button>
        <Title />
        <button
          className="flex justify-center items-center group"
          onClick={handleLogOut}
        >
          <Icon
            path={mdiLogout}
            size={iconSize}
            className="text-white fill-current group-hover:text-slate-300 transition-colors duration-200"
          />
        </button>
      </nav>
    </div>
  );
};

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    console.log(`Logging out user ${user.username}`);
    window.localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  return (
    <header className="w-full">
      <DesktopHeaderContent user={user} handleLogOut={handleLogOut} />
      <MobileHeaderContent user={user} handleLogOut={handleLogOut} />
    </header>
  );
};

export default Header;
