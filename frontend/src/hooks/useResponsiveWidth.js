import { useState, useEffect } from "react";

// Based on this article: https://www.dhiwise.com/post/react-get-screen-width-everything-you-need-to-know
const useResponsiveWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, height };
};

export default useResponsiveWidth;
