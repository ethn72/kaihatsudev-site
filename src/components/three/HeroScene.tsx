"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Points as ThreePoints } from "three";

/** Deterministic PRNG (mulberry32) — pure, so positions are stable across renders. */
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function ParticleField({ count }: { count: number }) {
  const ref = useRef<ThreePoints>(null);

  // Stable random cloud — generated once.
  const positions = useMemo(() => {
    const rng = makeRng(1337);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rng() - 0.5) * 12;
      arr[i * 3 + 1] = (rng() - 0.5) * 12;
      arr[i * 3 + 2] = (rng() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    // Slow constant drift.
    pts.rotation.y += delta * 0.03;
    pts.rotation.x += delta * 0.008;
    // Subtle mouse parallax — ease the cloud toward the pointer.
    const targetX = state.pointer.x * 0.4;
    const targetY = -state.pointer.y * 0.4;
    pts.position.x += (targetX - pts.position.x) * 0.03;
    pts.position.y += (targetY - pts.position.y) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        sizeAttenuation
        color="#F5F3EE"
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

function BeniAccent() {
  const ref = useRef<ThreePoints>(null);
  const positions = useMemo(() => {
    const rng = makeRng(7331);
    const arr = new Float32Array(40 * 3);
    for (let i = 0; i < 40; i++) {
      arr[i * 3] = (rng() - 0.5) * 10;
      arr[i * 3 + 1] = (rng() - 0.5) * 10;
      arr[i * 3 + 2] = (rng() - 0.5) * 6;
    }
    return arr;
  }, []);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        color="#C84B31"
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene() {
  const isMobile = useIsMobile();
  const count = isMobile ? 500 : 2000;

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="always"
    >
      <ParticleField count={count} />
      {!isMobile && <BeniAccent />}
    </Canvas>
  );
}
