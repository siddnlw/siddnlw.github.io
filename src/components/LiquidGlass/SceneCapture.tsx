import { useFBO } from "@react-three/drei";
import { useFrame, useThree, createPortal } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";
import GlassContext from "./GlassContext";

export function SceneCapture({ children }: any) {
  const buffer = useFBO();
  const [scene] = useState(() => new THREE.Scene());
  const { gl, camera } = useThree();

  useFrame(() => {
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <GlassContext.Provider value={{ texture: buffer.texture }}>
      {createPortal(children, scene)}
      {children}
    </GlassContext.Provider>
  );
}