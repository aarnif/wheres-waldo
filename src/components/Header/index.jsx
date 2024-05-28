import { useState } from "react";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";

const Header = () => {
  // const navigate = useNavigate();
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

  const handleClickHeader = () => {
    console.log("Header title clicked");
  };

  return (
    <motion.header
      className="z-10 fixed w-full flex flex-col justify-center items-center shadow-lg bg-red-600 text-white"
      style={{
        height: headerHeightInPixels,
        translateY: showHeader,
      }}
    >
      <div className="w-full flex-grow basis-3/5 flex justify-around items-center border-b border-b-slate-300">
        <button className="flex-grow" onClick={handleClickHeader}>
          <h1 className="text-center font-title text-2xl font-bold">
            Where's Waldo
          </h1>
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
