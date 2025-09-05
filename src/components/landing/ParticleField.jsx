import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function ParticleCloud({ count = 1200, radius = 4 }) {
  const ref = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      const phi = Math.acos(u);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      arr.set([x, y, z], i * 3);
    }
    return arr;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.08;
    ref.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        sizeAttenuation
        color="#93c5fd"
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export default function ParticleField({ zIndexClass = "z-0" }) {
  return (
    <div
      className={`absolute inset-0 w-full h-full ${zIndexClass}`}
      style={{ pointerEvents: "none" }}                // don’t block clicks
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%", display: "block" }}  // force fill
      >
        <ambientLight intensity={0.5} />
        <ParticleCloud />
      </Canvas>
    </div>
  );
}
