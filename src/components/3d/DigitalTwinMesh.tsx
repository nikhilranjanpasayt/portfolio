import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DigitalTwinMeshProps {
  isReducedMotion?: boolean;
  position?: [number, number, number];
  scale?: number;
}

export function DigitalTwinMesh({
  isReducedMotion = false,
  position = [0.6, 0.4, -0.6],
  scale = 1.3,
}: DigitalTwinMeshProps) {
  const twinGroupRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);
  const headMeshRef = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);

  // Generate neural network constellation vertices for the holographic digital twin silhouette
  const nodePoints = useMemo(() => {
    const pts: [number, number, number][] = [];
    // Head oval cluster
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2;
      const r = 0.52 + Math.sin(i * 3) * 0.08;
      pts.push([Math.cos(angle) * r, 0.95 + Math.sin(angle) * (r * 1.25), (Math.sin(i * 2) * 0.15)]);
    }
    // Face feature nodes (eyes, nose, jawline)
    pts.push([-0.18, 1.05, 0.22]);
    pts.push([0.18, 1.05, 0.22]);
    pts.push([0, 0.88, 0.25]);
    pts.push([-0.15, 0.72, 0.2]);
    pts.push([0.15, 0.72, 0.2]);
    pts.push([0, 0.62, 0.22]);

    // Shoulders & neck cluster
    for (let i = -7; i <= 7; i++) {
      const x = (i / 7) * 1.35;
      const y = 0.25 - (Math.abs(x) * 0.22);
      const z = (Math.cos(i) * 0.2);
      pts.push([x, y, z]);
    }
    return pts;
  }, []);

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (twinGroupRef.current) {
      // Gentle floating breathing animation
      twinGroupRef.current.position.y = position[1] + Math.sin(time * 0.9) * 0.08;
      twinGroupRef.current.rotation.y = Math.sin(time * 0.4) * 0.06;
    }

    if (scanLineRef.current) {
      // Vertical holographic laser scan sweep
      scanLineRef.current.position.y = 0.8 + Math.sin(time * 1.6) * 0.9;
    }

    if (headMeshRef.current) {
      headMeshRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={twinGroupRef} position={position} scale={scale}>
      {/* 1. Holographic Digital Twin Head / Silhouette Form */}
      <mesh ref={headMeshRef} position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.55, 20, 20]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#1D4ED8"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.38}
        />
      </mesh>

      {/* 2. Bust / Shoulders Wireframe Geometry */}
      <mesh position={[0, 0.15, 0]}>
        <coneGeometry args={[1.2, 0.9, 16, 4, true]} />
        <meshStandardMaterial
          color="#93C5FD"
          emissive="#1D4ED8"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>

      {/* 3. Neural Constellation Nodes */}
      <group ref={nodesGroupRef}>
        {nodePoints.map((pt, idx) => (
          <mesh key={idx} position={pt}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshBasicMaterial
              color={idx % 2 === 0 ? '#3B82F6' : '#93C5FD'}
            />
          </mesh>
        ))}
      </group>

      {/* 4. Scanning Laser Sweep Bar */}
      <mesh ref={scanLineRef} position={[0, 0.8, 0.1]}>
        <boxGeometry args={[1.6, 0.02, 0.02]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* 5. Glowing Silhouette Rim Aura Light */}
      <pointLight position={[0.8, 1.2, 0.4]} color="#3B82F6" intensity={3.0} distance={6} />
      <pointLight position={[-0.8, 0.6, 0.3]} color="#93C5FD" intensity={2.8} distance={6} />
    </group>
  );
}
