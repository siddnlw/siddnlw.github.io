import { Text } from "@react-three/drei";

export function HeroSection() {
  return (
    <>
      <mesh>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial color="#5a2cff" />
      </mesh>

      <Text
        fontSize={1}
        position={[0, 0, 0]}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        React Bits
      </Text>
    </>
  );
}