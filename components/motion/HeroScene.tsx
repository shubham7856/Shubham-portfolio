"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

const COUNT = 160;
const RADIUS = 2.6;
const LINK = 0.82;
const ACCENT = new THREE.Color("#d4b06a");
const NODE = new THREE.Color("#7fa7d9");

type Pointer = { x: number; y: number };

function Network({ pointer }: { pointer: RefObject<Pointer> }) {
  const group = useRef<THREE.Group>(null);

  const { positions, colors, segments } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < COUNT; i++) {
      // Fibonacci sphere with a little radial jitter so it reads as organic, not a ball.
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * 2.399963;
      const jitter = 0.82 + Math.random() * 0.36;
      points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS * jitter));
    }

    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    points.forEach((p, i) => {
      p.toArray(positions, i * 3);
      (Math.random() < 0.14 ? ACCENT : NODE).toArray(colors, i * 3);
    });

    const seg: number[] = [];
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        if (points[i].distanceTo(points[j]) < LINK) seg.push(...points[i].toArray(), ...points[j].toArray());
      }
    }
    return { positions, colors, segments: new Float32Array(seg) };
  }, []);

  // Round sprite so nodes render as dots rather than the default squares.
  const dot = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const p = pointer.current;
    g.rotation.y += delta * 0.07;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, p.y * 0.4, 2.5, delta);
    g.position.x = THREE.MathUtils.damp(g.position.x, p.x * 0.3, 2.5, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, p.y * 0.15, 2.5, delta);
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial map={dot} alphaTest={0.5} size={0.075} vertexColors sizeAttenuation transparent opacity={0.95} depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[segments, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#4f6e99" transparent opacity={0.32} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move);

    // Stop rendering once the hero scrolls away, so the scene costs nothing further down.
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (wrap.current) io.observe(wrap.current);

    return () => {
      window.removeEventListener("pointermove", move);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        frameloop={reduce || !visible ? "demand" : "always"}
      >
        <Network pointer={pointer} />
      </Canvas>
    </div>
  );
}
