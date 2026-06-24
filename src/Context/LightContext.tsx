import { createContext, useContext, useState } from "react";

const LightContext = createContext(null);

export function LightProvider({ children }) {
  const [lightPosition, setLightPosition] = useState({
    x: 50,
    y: 50,
  });

  return (
    <LightContext.Provider
      value={{
        lightPosition,
        setLightPosition,
      }}
    >
      {children}
    </LightContext.Provider>
  );
}

export const useLight = () => useContext(LightContext);