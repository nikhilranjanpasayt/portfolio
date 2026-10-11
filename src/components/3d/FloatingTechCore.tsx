import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingTechCoreProps {
  isReducedMotion?: boolean;
  position?: [number, number, number];
}

export function FloatingTechCore({ isReducedMotion = false, position = [0, -1.8, -2] }: FloatingTechCoreProps) {
  const coreRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerWireRef = useRef<THREE.Mesh>(null);
  const sat1Ref = useRef<THREE.Mesh>(null);
  const sat2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(time * 0.8) * 0.2;
    }

    if (outerWireRef.current) {
      outerWireRef.current.rotation.x += delta * 0.2;
      outerWireRef.current.rotation.y += delta * 0.25;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.3;
      innerRef.current.rotation.z += delta * 0.25;
      const scale = 0.9 + Math.sin(time * 2) * 0.08;
      innerRef.current.scale.set(scale, scale, scale);
    }

    if (sat1Ref.current) {
      const radius = 2.4;
      sat1Ref.current.position.x = Math.cos(time * 0.7) * radius;
      sat1Ref.current.position.z = Math.sin(time * 0.7) * radius;
      sat1Ref.current.position.y = Math.sin(time * 1.4) * 0.5;
      sat1Ref.current.rotation.x += delta * 1.5;
      sat1Ref.current.rotation.y += delta * 1.2;
    }

    if (sat2Ref.current) {
      const radius = 2.0;
      sat2Ref.current.position.x = Math.cos(time * -0.5 + Math.PI) * radius;
      sat2Ref.current.position.z = Math.sin(time * -0.5 + Math.PI) * radius;
      sat2Ref.current.position.y = Math.cos(time * 1.1) * 0.6;
      sat2Ref.current.rotation.z += delta * 1.3;
    }
  });

  return (
    <group ref={coreRef} position={position}>
      {/* Outer polyhedral wireframe */}
      <mesh ref={outerWireRef}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial
          color="#D1D5DB"
          emissive="#1D4ED8"
          emissiveIntensity={0.65}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Inner glowing crystal core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#1D4ED8"
          emissiveIntensity={1.3}
          roughness={0.2}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Orbiting satellite one */}
      <mesh ref={sat1Ref}>
        <tetrahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting satellite two */}
      <mesh ref={sat2Ref}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial
          color="#93C5FD"
          emissive="#1D4ED8"
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}
