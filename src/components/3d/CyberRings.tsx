import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CyberRingsProps {
  isReducedMotion?: boolean;
  position?: [number, number, number];
}

export function CyberRings({ isReducedMotion = false, position = [0, -1.8, -2] }: CyberRingsProps) {
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const haloRingRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.sin(time * 0.18) * 0.35;
      ring1Ref.current.rotation.y += delta * 0.18;
      ring1Ref.current.rotation.z += delta * 0.05;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.12;
      ring2Ref.current.rotation.y = Math.cos(time * 0.22) * 0.45;
      ring2Ref.current.rotation.z -= delta * 0.14;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.08;
      ring3Ref.current.rotation.y += delta * 0.1;
      ring3Ref.current.rotation.z = Math.sin(time * 0.25) * 0.25;
    }

    if (haloRingRef.current) {
      haloRingRef.current.rotation.z += delta * 0.06;
      haloRingRef.current.rotation.x = Math.sin(time * 0.15) * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Outer blue orbital ring */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[3.2, 0.02, 16, 120]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.65} />
        </mesh>
      </group>

      {/* Mid silver-blue gimbal ring */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[2.5, 0.022, 16, 90]} />
          <meshBasicMaterial color="#93C5FD" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Inner light-blue ring */}
      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[1.8, 0.018, 16, 75]} />
          <meshBasicMaterial color="#D1D5DB" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Equatorial Outer Halo Ring */}
      <group ref={haloRingRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.6, 3.63, 64]} />
          <meshBasicMaterial
            color="#3B82F6"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}
