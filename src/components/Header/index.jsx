import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";

const Header = ({ user }) => {
  const navigate = useNavigate();
  const { scrollY, scrollYProgress } = useScroll();
  const [showHeader, setShowHeader] = useState(0);
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

  return (
    <motion.header
      className="z-10 fixed w-full flex flex-col justify-center items-center shadow-lg bg-red-600 text-white"
      style={{
        height: headerHeightInPixels,
        translateY: showHeader,
      }}
    >
      <div className="w-full flex-grow basis-3/5 flex justify-center items-center border-b border-b-slate-300">
        <div className="flex-grow flex justify-around items-center">
          <h1 className="flex-grow basis-2/3 text-center font-title text-2xl font-bold">
            Where's Waldo
          </h1>
          {user && (
            <div className="flex-grow basis-1/3 flex justify-around items-center">
              <h2 className="text-center font-title text-lg font-bold">
                Logged in as: {user.username}
              </h2>
              <button
                onClick={handleLogOut}
                className="flex-grow max-w-[200px] h-[60px] bg-red-700 rounded-xl text-xl font-bold text-white
                hover:bg-red-800 active:scale-95 transition"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
