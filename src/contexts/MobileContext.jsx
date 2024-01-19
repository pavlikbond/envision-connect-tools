import { useState, useContext, createContext, useEffect } from "react";

const MobileContext = createContext();

export function useMobile() {
  return useContext(MobileContext);
}

export function MobileProvider({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 768);
    });
  }, []);

  return <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>;
}
