import { useMouseStore } from "@/Context/MouseContext";
import { useEffect } from "react";

export default function GlobalMouseTracker() {
  const setPosition = useMouseStore((state) => state.setPosition);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition(
        (e.clientX / window.innerWidth) * 100,
        (e.clientY / window.innerHeight) * 100
      );
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [setPosition]);

  return null;
}