"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function RotatingEarth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.position.x += (mouse.x * 0.2 - meshRef.current.position.x) * 0.02;
      meshRef.current.position.y += (-mouse.y * 0.2 - meshRef.current.position.y) * 0.02;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1.2, 48, 48]}>
        <MeshDistortMaterial
          color="#10b981"
          distort={0.15}
          speed={1}
          roughness={0.3}
          metalness={0.6}
          emissive="#10b981"
          emissiveIntensity={0.15}
        />
      </Sphere>

      <mesh ref={glowRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#10b981"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.8, 24, 24]} />
        <meshBasicMaterial
          color="#10b981"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>
    </group>
  );
}

export function Earth3D() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#10b981" />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#34d399" />
        <RotatingEarth />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
