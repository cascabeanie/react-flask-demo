import { useState, useEffect } from "react";

// Credit: Yan Holtz
// Source: https://www.react-graph-gallery.com/map

export const useDimensions = () => {
  const getDimensions = () => {
    return {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    };
  };

  const [dimensions, setDimensions] = useState(getDimensions);

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
};
