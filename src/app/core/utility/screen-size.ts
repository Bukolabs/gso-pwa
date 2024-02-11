import { useEffect, useState } from "react";

// Define a custom hook to detect screen size
function useScreenSize() {
  const DESKTOP_WIDTH = 768;
  const MIN_CONTENT_WIDTH = 1500;
  let isMobileMode = window.innerWidth < DESKTOP_WIDTH;
  let isBelowContentWidth = window.innerWidth < MIN_CONTENT_WIDTH;

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobileMode,
    isBelowContentWidth
  });

  useEffect(() => {
    const handleResize = () => {
      const updatedIsMobile = window.innerWidth < DESKTOP_WIDTH;
      const updatedIsBelowContentWidth = window.innerWidth < MIN_CONTENT_WIDTH;
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobileMode: updatedIsMobile,
        isBelowContentWidth: updatedIsBelowContentWidth
      });
    };

    // Add a resize event listener to update screen size on window resize
    window.addEventListener("resize", handleResize);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // The empty dependency array ensures the effect runs once after the initial render.

  return screenSize;
}

export default useScreenSize;
