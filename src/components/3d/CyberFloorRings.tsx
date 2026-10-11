import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CyberFloorRingsProps {
  isReducedMotion?: boolean;
  position?: [number, number, number];
}

export function CyberFloorRings({
  isReducedMotion = false,
  position = [0, -2.8, -1.8],
}: CyberFloorRingsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z -= delta * 0.05;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z += delta * 0.07;
    }

    if (ring3Ref.current) {
      const s = 1.0 + Math.sin(time * 2.2) * 0.04;
      ring3Ref.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={position} rotation={[-Math.PI / 2.3, 0, 0]}>
      {/* Outer blue console glow ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.2, 0.016, 16, 90]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.65} />
      </mesh>

      {/* Mid light-blue ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.4, 0.02, 16, 80]} />
        <meshBasicMaterial color="#93C5FD" transparent opacity={0.6} />
      </mesh>

      {/* Inner silver-blue ring */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.5, 0.022, 16, 64]} />
        <meshBasicMaterial color="#D1D5DB" transparent opacity={0.55} />
      </mesh>

      {/* Translucent floor grid reflection circle */}
      <mesh position={[0, 0, -0.02]}>
        <circleGeometry args={[3.5, 48]} />
        <meshBasicMaterial
          color="#15171d"
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
