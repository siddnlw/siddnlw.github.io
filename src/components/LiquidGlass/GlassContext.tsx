import { createContext, useContext } from "react";

const GlassContext = createContext<any>(null);

export const useGlass = () => useContext(GlassContext);

export default GlassContext;