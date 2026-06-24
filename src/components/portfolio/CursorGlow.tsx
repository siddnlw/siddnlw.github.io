import { useLight } from "@/Context/LightContext";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function MouseLight() {
  const lightRef = useRef<THREE.SpotLight>(null);
  const { setLightPosition } = useLight();

  useFrame(({ mouse, viewport }) => {
    if (!lightRef.current) return;

    lightRef.current.position.x = mouse.x * viewport.width * 0.5;
    lightRef.current.position.y = mouse.y * viewport.height * 0.5;
    lightRef.current.position.z = 5;
  });

  useFrame(({ mouse }) => {
    const x = ((mouse.x + 1) / 2) * 100;
    const y = ((mouse.y + 1) / 2) * 100;

    setLightPosition({
      x,
      y,
    });

    lightRef.current.position.x = mouse.x * 5;
    lightRef.current.position.y = mouse.y * 5;
  });

  return (
    <spotLight
      ref={lightRef}
      intensity={50}
      angle={0.3}
      penumbra={1}
      position={[0, 0, 5]}
    />
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 0] }}
    className="-z-1"
     style={{
    position: "fixed",
    inset: 0,
    width: "100dvw",
    height: "100dvh",
    pointerEvents: "none",
  }}>
      {/* <ambientLight intensity={0.3} /> */}

      <MouseLight />

      {/* <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh> */}
    </Canvas>
  );
}
