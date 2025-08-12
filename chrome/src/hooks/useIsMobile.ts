import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    mediaQuery.addEventListener("change", (e) => {
      setIsMobile(e.matches);
    });

    setIsMobile(window.innerWidth <= 768);
    return () => {
      mediaQuery.removeEventListener("change", () => {});
    };
  }, []);

  return isMobile;
};
