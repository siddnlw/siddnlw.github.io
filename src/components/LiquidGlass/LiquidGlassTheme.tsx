import { Canvas } from "@react-three/fiber";
import { SceneCapture } from "./SceneCapture";

export default function LiquidGlassTheme({ children }: any) {
  return (
    <div style={{ height: "100dvh", width: "100%" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 25 }}>
        <SceneCapture>
          {children}
        </SceneCapture>
      </Canvas>
    </div>
  );
}