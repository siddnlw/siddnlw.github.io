import { create } from "zustand";

interface MouseStore {
  x: number;
  y: number;
  setPosition: (x: number, y: number) => void;
}

export const useMouseStore = create<MouseStore>((set) => ({
  x: 50,
  y: 50,
  setPosition: (x, y) => set({ x, y }),
}));