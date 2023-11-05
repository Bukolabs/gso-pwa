import { useEffect, useState } from "react";

// Define a custom hook to detect screen size
function useScreenSize() {
  const DESCKTOP_WIDTH = 768;
  let isMobile = window.innerWidth < DESCKTOP_WIDTH;

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile,
  });

  useEffect(() => {
    const handleResize = () => {
      const updatedIsMobile = window.innerWidth < DESCKTOP_WIDTH;
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: updatedIsMobile,
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
