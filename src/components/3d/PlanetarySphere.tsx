import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetarySphereProps {
  isReducedMotion?: boolean;
  position?: [number, number, number];
  scale?: number;
}

export function PlanetarySphere({
  isReducedMotion = false,
  position = [0, 0.5, -5.0],
  scale = 1.0,
}: PlanetarySphereProps) {
  const planetGroupRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const gridSphereRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (planetGroupRef.current) {
      // Very slow, serene planetary axial rotation
      planetGroupRef.current.rotation.y += delta * 0.04;
    }

    if (gridSphereRef.current) {
      gridSphereRef.current.rotation.y += delta * 0.06;
      gridSphereRef.current.rotation.x = Math.sin(time * 0.1) * 0.08;
    }

    if (atmosphereRef.current) {
      // Subtle atmospheric pulsation
      const s = 1.0 + Math.sin(time * 0.8) * 0.015;
      atmosphereRef.current.scale.set(s, s, s);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.05;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.035;
    }
  });

  const planetRadius = 2.4;

  return (
    <group position={position} scale={scale}>
      {/* Planetary Body Group */}
      <group ref={planetGroupRef}>
        {/* Core Dark Charcoal Sphere */}
        <mesh>
          <sphereGeometry args={[planetRadius, 48, 48]} />
          <meshStandardMaterial
            color="#14151a"
            roughness={0.7}
            metalness={0.4}
            emissive="#111318"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Luminous blue cyber coordinate grid */}
        <mesh ref={gridSphereRef}>
          <sphereGeometry args={[planetRadius + 0.015, 32, 24]} />
          <meshBasicMaterial
            color="#3B82F6"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>

        {/* Silver-blue continental data clusters */}
        <mesh rotation={[0.4, 0.6, 0]}>
          <sphereGeometry args={[planetRadius + 0.03, 18, 14]} />
          <meshBasicMaterial
            color="#D1D5DB"
            wireframe
            transparent
            opacity={0.16}
          />
        </mesh>

        {/* Blue atmospheric halo shell */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[planetRadius + 0.12, 40, 40]} />
          <meshBasicMaterial
            color="#3B82F6"
            transparent
            opacity={0.12}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Tilted planetary orbital ring */}
      <group ref={ring1Ref} rotation={[Math.PI / 3, 0.3, -Math.PI / 6]}>
        <mesh>
          <torusGeometry args={[planetRadius * 1.55, 0.02, 16, 120]} />
          <meshBasicMaterial
            color="#3B82F6"
            transparent
            opacity={0.6}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[planetRadius * 1.48, planetRadius * 1.62, 64]} />
          <meshBasicMaterial
            color="#60A5FA"
            transparent
            opacity={0.16}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Outer tilted planetary ring */}
      <group ref={ring2Ref} rotation={[Math.PI / 3.4, -0.4, -Math.PI / 5]}>
        <mesh>
          <torusGeometry args={[planetRadius * 1.85, 0.015, 16, 100]} />
          <meshBasicMaterial
            color="#93C5FD"
            transparent
            opacity={0.45}
          />
        </mesh>
      </group>

      {/* Planetary Rim Lights */}
      <pointLight position={[-planetRadius * 1.2, planetRadius * 0.8, planetRadius * 0.5]} color="#3B82F6" intensity={3.5} distance={10} />
      <pointLight position={[planetRadius * 1.4, -planetRadius * 0.5, planetRadius * 0.5]} color="#93C5FD" intensity={2.8} distance={10} />
    </group>
  );
}
