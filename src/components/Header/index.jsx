import GameDropDownMenu from "./GameDropDownMenu";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";

const Header = ({ user, games }) => {
  const navigate = useNavigate();
  const { scrollY, scrollYProgress } = useScroll();
  const [showHeader, setShowHeader] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const headerHeightInPixels = 80;
  const headerBufferPixels = 5;
  const headerScrollAmount = 10;

  useMotionValueEvent(scrollY, "change", () => {
    console.log("Show header:", showHeader);
    console.log("Scroll Y:", scrollY.current);
    console.log("Scroll Y progress:", scrollYProgress.current.toFixed(2));

    if (scrollY.current <= 60) {
      console.log("Page at near top");
      setShowHeader(0);
    } else if (scrollYProgress.current.toFixed(2) >= 0.95) {
      console.log("Page at near bottom");
      setShowHeader(-headerHeightInPixels);
    } else if (
      scrollY.current > scrollY.prev &&
      showHeader > -headerHeightInPixels - headerBufferPixels // Make sure that header is totally hidden by using headerBufferPixels as buffer
    ) {
      console.log("Page scrolling down");
      setShowHeader((prevState) => prevState - headerScrollAmount);
    } else if (showHeader < 0) {
      console.log("Page scrolling up");
      setShowHeader((prevState) => prevState + headerScrollAmount);
    }
  });

  const handleLogOut = () => {
    console.log(`Logging out user ${user.username}`);
    window.localStorage.removeItem("loggedUser");
    navigate("/login");
  };

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <motion.header
      className="z-10 fixed w-full flex flex-col justify-center items-center shadow-lg bg-zinc-700 bg-opacity-90 text-white"
      style={{
        height: headerHeightInPixels,
        translateY: showHeader,
      }}
    >
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
                    onClick={handleShowDropdown}
                    className="flex-grow mr-2 min-w-[200px] h-[60px] bg-zinc-600 rounded-xl text-xl font-bold text-white
                hover:bg-zinc-800 active:scale-95 transition"
                  >
                    Games
                  </button>
                  {showDropdown && (
                    <GameDropDownMenu
                      games={games}
                      setShowDropdown={setShowDropdown}
                    />
                  )}
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
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
    </motion.header>
  );
};

export default Header;
