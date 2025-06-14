import { useNavigate } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiMenu, mdiLogout } from "@mdi/js";

import Title from "./Title";

const DesktopHeaderContent = ({ user, handleLogOut }) => {
  return (
    <div className="w-full hidden sm:flex justify-between items-center">
      <Title />
      <nav className="flex items-center gap-16">
        <p className="text-white text-base font-bold">{user.username}</p>
        <button
          data-testid="desktop-sign-out-button"
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

const MobileHeaderContent = ({ handleLogOut }) => {
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
          data-testid="mobile-sign-out-button"
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
      <MobileHeaderContent handleLogOut={handleLogOut} />
    </header>
  );
};

export default Header;
