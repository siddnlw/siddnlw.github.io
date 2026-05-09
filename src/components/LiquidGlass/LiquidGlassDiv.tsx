import { MeshTransmissionMaterial, useGLTF, useTexture } from "@react-three/drei";
import { useGlass } from "./GlassContext";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { RoundedRect } from "./RoundedRect";
import * as THREE from 'three';

const glb = "/assets/3d/cube.glb";
const geometryKey = "Cube";

export function LiquidGlassDiv({
  width = 3,
  height = 1.5,
  radius = 0.3,
  position = [0, 0, 1],
  children
}: any) {
  const ref = useRef<THREE.Mesh>(null!);
  const { texture } = useGlass();
  const group = useRef<any>(null);
  const sweepRef = useRef<any>(null);
  const { pointer } = useThree();
  const { nodes } = useGLTF(glb);
  const geoWidthRef = useRef<number>(1);
  const { viewport: vp } = useThree();


    useEffect(() => {
      const geo = (nodes[geometryKey] as THREE.Mesh)?.geometry;
      geo.computeBoundingBox();
      geoWidthRef.current = geo.boundingBox!.max.x - geo.boundingBox!.min.x || 1;
    }, [nodes, geometryKey]);

  useFrame(() => {
    if (!group.current) return;

    // 🧠 Mouse parallax
    group.current.rotation.x = pointer.y * 0.1;
    group.current.rotation.y = pointer.x * 0.1;

    // ✨ Light sweep
    if (sweepRef.current) {
      sweepRef.current.position.x += 0.01;
      if (sweepRef.current.position.x > width) {
        sweepRef.current.position.x = -width;
      }
    }
  });

  const noise = useTexture("/noise.png");

  return (
    <group ref={group} position={position}>
      {/* Glass */}
      <mesh
        ref={ref}
        scale={0.5}
        rotation-y={Math.PI / 2.25}
        rotation-x={Math.PI / 2.25}
        geometry={(nodes[geometryKey] as THREE.Mesh)?.geometry}
      >
        <RoundedRect width={width} height={height} radius={radius} />
        <MeshTransmissionMaterial
          buffer={texture}
          transmission={1}
          roughness={0.25}
          thickness={0.6}
          ior={1.02}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0.05}
          distortionScale={0.1}
        />
      </mesh>

      {/* <mesh scale={[vp.width, vp.height, 1]}> */}
      {/* <planeGeometry /> */}
      {/* <meshBasicMaterial map={texture} transparent /> */}
      {/* </mesh> */}
      <mesh position={[0, 0, 0.05]}>
        <RoundedRect width={width} height={height} radius={radius} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>

      {/* Noise */}
      {/* <mesh position={[0, 0, 0.02]}>
        <RoundedRect width={width} height={height} radius={radius} />
        <meshBasicMaterial map={noise} transparent opacity={0.08} />
      </mesh> */}

      {/* Light sweep */}
      {/* <mesh ref={sweepRef} position={[-width, 0, 0.03]}>
        <planeGeometry args={[width * 0.3, height]} />
        <meshBasicMaterial color="white" transparent opacity={0.08} />
      </mesh> */}

      {/* Edge highlight */}
      {/* <mesh position={[0, 0, 0.04]}>
        <RoundedRect width={width} height={height} radius={radius} />
        <meshBasicMaterial color="white" transparent opacity={0.12} />
      </mesh> */}

      {/* Content */}
      <group position={[0, 0, 0.1]}>{children}</group>
    </group>
  );
}