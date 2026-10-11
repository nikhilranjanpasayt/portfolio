import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingGeometricObjectsProps {
  isReducedMotion?: boolean;
}

interface FloatingItem {
  id: number;
  initialPos: [number, number, number];
  rotSpeed: [number, number, number];
  floatSpeed: number;
  floatAmplitude: number;
  floatOffset: number;
  scale: number;
  type: 'octahedron' | 'tetrahedron' | 'icosahedron' | 'torus' | 'dodecahedron' | 'box' | 'sphere';
  color: string;
  wireframe: boolean;
}

export function FloatingGeometricObjects({ isReducedMotion = false }: FloatingGeometricObjectsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Pre-generate deterministic floating objects across depth layers.
  const items: FloatingItem[] = useMemo(() => [
    // Floating Metallic Sphere (Upper Right Mid-ground)
    {
      id: 0,
      initialPos: [3.4, 2.6, -1.8],
      rotSpeed: [0.2, 0.3, 0.1],
      floatSpeed: 0.9,
      floatAmplitude: 0.25,
      floatOffset: 0.5,
      scale: 0.45,
      type: 'sphere',
      color: '#3B82F6',
      wireframe: false,
    },
    // Floating Metallic Sphere (Lower Left Foreground)
    {
      id: 1,
      initialPos: [-3.6, -1.8, -1.4],
      rotSpeed: [0.15, -0.25, 0.1],
      floatSpeed: 1.1,
      floatAmplitude: 0.22,
      floatOffset: 2.1,
      scale: 0.4,
      type: 'sphere',
      color: '#D1D5DB',
      wireframe: false,
    },
    // Floating 3D Cube (Upper Left Foreground)
    {
      id: 2,
      initialPos: [-3.8, 2.8, -1.2],
      rotSpeed: [0.35, 0.45, 0.2],
      floatSpeed: 0.95,
      floatAmplitude: 0.28,
      floatOffset: 0.3,
      scale: 0.48,
      type: 'box',
      color: '#3B82F6',
      wireframe: true,
    },
    // Floating 3D Cube (Mid Right Foreground)
    {
      id: 3,
      initialPos: [4.2, 0.8, -1.5],
      rotSpeed: [-0.3, 0.4, 0.25],
      floatSpeed: 1.05,
      floatAmplitude: 0.26,
      floatOffset: 1.5,
      scale: 0.44,
      type: 'box',
      color: '#D1D5DB',
      wireframe: true,
    },
    // Floating 3D Torus Ring (Upper Center Mid-depth)
    {
      id: 4,
      initialPos: [0.8, 3.8, -2.2],
      rotSpeed: [-0.3, 0.25, 0.2],
      floatSpeed: 1.1,
      floatAmplitude: 0.28,
      floatOffset: 0.8,
      scale: 0.52,
      type: 'torus',
      color: '#93C5FD',
      wireframe: true,
    },
    // Floating 3D Solid Translucent Cube (Bottom Left)
    {
      id: 5,
      initialPos: [-4.6, -2.4, -2.0],
      rotSpeed: [0.25, -0.3, 0.2],
      floatSpeed: 0.85,
      floatAmplitude: 0.22,
      floatOffset: 2.8,
      scale: 0.42,
      type: 'box',
      color: '#9CA3AF',
      wireframe: false,
    },
    // Top-left foreground / mid-ground octahedron
    {
      id: 6,
      initialPos: [-5.8, 3.4, -2.2],
      rotSpeed: [0.3, 0.4, 0.2],
      floatSpeed: 0.9,
      floatAmplitude: 0.25,
      floatOffset: 0,
      scale: 0.55,
      type: 'octahedron',
      color: '#3B82F6',
      wireframe: true,
    },
    // Left mid-depth icosahedron
    {
      id: 7,
      initialPos: [-6.8, -1.5, -3.5],
      rotSpeed: [-0.2, 0.3, 0.15],
      floatSpeed: 0.7,
      floatAmplitude: 0.3,
      floatOffset: 1.2,
      scale: 0.7,
      type: 'icosahedron',
      color: '#93C5FD',
      wireframe: true,
    },
    // Deep background top-center dodecahedron
    {
      id: 8,
      initialPos: [-1.5, 4.2, -5.5],
      rotSpeed: [0.15, -0.2, 0.25],
      floatSpeed: 0.6,
      floatAmplitude: 0.2,
      floatOffset: 2.5,
      scale: 0.85,
      type: 'dodecahedron',
      color: '#60A5FA',
      wireframe: true,
    },
    // Bottom-left subtle float tetrahedron
    {
      id: 9,
      initialPos: [-3.2, -4.0, -2.5],
      rotSpeed: [0.25, 0.35, -0.1],
      floatSpeed: 0.8,
      floatAmplitude: 0.22,
      floatOffset: 3.1,
      scale: 0.45,
      type: 'tetrahedron',
      color: '#3B82F6',
      wireframe: false,
    },
    // Right deep background octahedron
    {
      id: 10,
      initialPos: [6.5, -0.8, -4.8],
      rotSpeed: [0.2, -0.3, 0.15],
      floatSpeed: 0.65,
      floatAmplitude: 0.35,
      floatOffset: 4.2,
      scale: 0.8,
      type: 'octahedron',
      color: '#1D4ED8',
      wireframe: true,
    },
    // Bottom-right foreground tetrahedron
    {
      id: 11,
      initialPos: [3.8, -3.6, -1.2],
      rotSpeed: [0.35, 0.2, -0.25],
      floatSpeed: 0.85,
      floatAmplitude: 0.2,
      floatOffset: 1.9,
      scale: 0.4,
      type: 'tetrahedron',
      color: '#93C5FD',
      wireframe: false,
    },
    // Deep center-bottom horizon icosahedron
    {
      id: 12,
      initialPos: [0.5, -4.5, -6.0],
      rotSpeed: [0.1, 0.15, 0.1],
      floatSpeed: 0.5,
      floatAmplitude: 0.18,
      floatOffset: 5.0,
      scale: 0.9,
      type: 'icosahedron',
      color: '#3B82F6',
      wireframe: true,
    },
  ], []);

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    const time = state.clock.getElapsedTime();

    items.forEach((item, index) => {
      const mesh = meshRefs.current[index];
      if (!mesh) return;

      // Sinusoidal floating levitation
      const newY = item.initialPos[1] + Math.sin(time * item.floatSpeed + item.floatOffset) * item.floatAmplitude;
      mesh.position.y = newY;

      // Gentle continuous rotation
      mesh.rotation.x += delta * item.rotSpeed[0];
      mesh.rotation.y += delta * item.rotSpeed[1];
      mesh.rotation.z += delta * item.rotSpeed[2];
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, index) => (
        <mesh
          key={item.id}
          ref={(el) => { meshRefs.current[index] = el; }}
          position={item.initialPos}
          scale={item.scale}
        >
          {item.type === 'sphere' && <sphereGeometry args={[0.7, 32, 32]} />}
          {item.type === 'box' && <boxGeometry args={[1, 1, 1]} />}
          {item.type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
          {item.type === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
          {item.type === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
          {item.type === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
          {item.type === 'torus' && <torusGeometry args={[0.9, 0.2, 16, 32]} />}

          {item.wireframe ? (
            <meshStandardMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.5}
              wireframe
              transparent
              opacity={0.65}
            />
          ) : (
            <meshStandardMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.8}
              roughness={0.25}
              metalness={0.85}
              transparent
              opacity={0.75}
            />
          )}
        </mesh>
      ))}
    </group>
  );
}
