import * as THREE from "three";

export function RoundedRect({ width, height, radius }: any) {
  const shape = new THREE.Shape();

  const w = width / 2;
  const h = height / 2;
  const r = radius;

  shape.moveTo(-w + r, -h);
  shape.lineTo(w - r, -h);
  shape.quadraticCurveTo(w, -h, w, -h + r);
  shape.lineTo(w, h - r);
  shape.quadraticCurveTo(w, h, w - r, h);
  shape.lineTo(-w + r, h);
  shape.quadraticCurveTo(-w, h, -w, h - r);
  shape.lineTo(-w, -h + r);
  shape.quadraticCurveTo(-w, -h, -w + r, -h);

  return <shapeGeometry args={[shape]} />;
}