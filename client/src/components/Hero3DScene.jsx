import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function CeramicMug({ pointer }) {
  const group = useRef(null);
  const profile = useMemo(
    () => [
      new THREE.Vector2(0.34, -0.66),
      new THREE.Vector2(0.46, -0.64),
      new THREE.Vector2(0.55, -0.46),
      new THREE.Vector2(0.62, 0.18),
      new THREE.Vector2(0.64, 0.48),
      new THREE.Vector2(0.61, 0.58),
      new THREE.Vector2(0.54, 0.58),
      new THREE.Vector2(0.50, 0.45),
      new THREE.Vector2(0.46, -0.34),
      new THREE.Vector2(0.37, -0.48),
      new THREE.Vector2(0, -0.50),
    ],
    []
  );
  const mugGeometry = useMemo(() => new THREE.LatheGeometry(profile, 96), [profile]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pointer.current.x * 0.58 + Math.sin(state.clock.elapsedTime * 0.28) * 0.08,
      4,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -pointer.current.y * 0.18,
      4,
      delta
    );
  });

  return (
    <group ref={group} rotation={[0.02, -0.45, 0]} scale={1.12}>
      <mesh geometry={mugGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#c77e55"
          roughness={0.25}
          metalness={0.01}
          clearcoat={0.42}
          clearcoatRoughness={0.2}
        />
      </mesh>
      <mesh position={[0.61, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.34, 0.09, 24, 64]} />
        <meshPhysicalMaterial color="#b96f49" roughness={0.26} clearcoat={0.32} />
      </mesh>
      <mesh position={[0, -0.66, 0]} scale={[0.46, 0.035, 0.46]} receiveShadow>
        <sphereGeometry args={[1, 48, 24]} />
        <meshStandardMaterial color="#a96240" roughness={0.36} />
      </mesh>
      {Array.from({ length: 32 }, (_, index) => {
        const angle = index * 2.39996;
        const y = -0.40 + ((index * 37) % 76) / 100;
        const radius = 0.566 - Math.max(0, y) * 0.04;
        const size = 0.008 + (index % 3) * 0.003;
        return (
          <mesh
            key={index}
            position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]}
            scale={size}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#f2d8bd" roughness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

function SceneContents({ pointer }) {
  return (
    <>
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} castShadow />
      <spotLight position={[-4, 4, 1]} intensity={80} angle={0.42} penumbra={1} color="#ffd4ad" />
      <Float speed={1.15} rotationIntensity={0.06} floatIntensity={0.2}>
        <CeramicMug pointer={pointer} />
      </Float>
      <mesh position={[0, -1.05, 0]} receiveShadow>
        <cylinderGeometry args={[1.45, 1.55, 0.18, 96]} />
        <meshPhysicalMaterial color="#ead9c5" roughness={0.34} clearcoat={0.25} />
      </mesh>
      <ContactShadows position={[0, -1.15, 0]} opacity={0.32} scale={5} blur={2.5} far={2.8} />
      <Environment preset="studio" />
    </>
  );
}

export default function Hero3DScene() {
  const pointer = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  return (
    <div
      className="hero-3d-canvas"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
          y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
        };
      }}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 };
      }}
      aria-label="Interactive three-dimensional ceramic mug. Move your pointer to rotate it."
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [3.2, 2.2, 5.8], fov: 34 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
      >
        <SceneContents pointer={pointer} />
      </Canvas>
      {!ready && <div className="hero-3d-loading">Preparing the studio piece…</div>}
      <div className="hero-3d-orbit" aria-hidden="true" />
    </div>
  );
}
