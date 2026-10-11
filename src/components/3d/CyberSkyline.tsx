import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CyberSkylineProps {
  isReducedMotion?: boolean;
  position?: [number, number, number];
}

interface Building {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  color: string;
  beaconColor: string;
  hasBeacon: boolean;
}

export function CyberSkyline({
  isReducedMotion = false,
  position = [0, -3.0, -6.5],
}: CyberSkylineProps) {
  const beaconGroupRef = useRef<THREE.Group>(null);

  // Generate a charcoal skyline with blue and silver accents.
  const buildings = useMemo(() => {
    const list: Building[] = [];
    const count = 38;
    const colors = ['#121318', '#181a20', '#1c1e26', '#22252e'];
    const beaconColors = ['#3B82F6', '#93C5FD', '#60A5FA', '#D1D5DB'];

    for (let i = 0; i < count; i++) {
      const x = -14 + (i / count) * 28 + (Math.sin(i * 3.7) * 0.4);
      const height = 1.0 + Math.abs(Math.sin(i * 1.8)) * 2.6 + (i % 5 === 0 ? 1.2 : 0);
      const width = 0.5 + Math.abs(Math.cos(i * 2.3)) * 0.5;
      const depth = 0.6 + Math.abs(Math.sin(i * 4.1)) * 0.6;
      const z = (Math.sin(i * 1.5) * 1.5);
      const color = colors[i % colors.length];
      const hasBeacon = i % 3 === 0 || height > 2.8;
      const beaconColor = beaconColors[i % beaconColors.length];

      list.push({
        x,
        y: height / 2,
        z,
        width,
        height,
        depth,
        color,
        beaconColor,
        hasBeacon,
      });
    }
    return list;
  }, []);

  useFrame((state) => {
    if (isReducedMotion || !beaconGroupRef.current) return;
    const time = state.clock.getElapsedTime();
    // Subtle pulsing on beacon lights
    const scale = 0.8 + Math.sin(time * 3) * 0.3;
    beaconGroupRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group position={position}>
      {/* City Skyline Buildings in Charcoal */}
      {buildings.map((b, i) => (
        <group key={i} position={[b.x, b.y, b.z]}>
          {/* Main Skyscraper Body */}
          <mesh>
            <boxGeometry args={[b.width, b.height, b.depth]} />
            <meshStandardMaterial
              color={b.color}
              roughness={0.65}
              metalness={0.4}
              emissive="#111318"
              emissiveIntensity={0.25}
            />
          </mesh>

          {/* Blue edge and window wireframe */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(b.width, b.height, b.depth)]} />
            <lineBasicMaterial
              color={i % 2 === 0 ? '#3B82F6' : '#93C5FD'}
              transparent
              opacity={0.35}
            />
          </lineSegments>

          {/* Rooftop Antenna & Beacon Light */}
          {b.hasBeacon && (
            <group position={[0, b.height / 2, 0]}>
              <mesh position={[0, 0.2, 0]}>
                <cylinderGeometry args={[0.015, 0.02, 0.4, 8]} />
                <meshBasicMaterial color="#3B82F6" />
              </mesh>
              <mesh position={[0, 0.42, 0]}>
                <sphereGeometry args={[0.045, 8, 8]} />
                <meshBasicMaterial color={b.beaconColor} />
              </mesh>
            </group>
          )}
        </group>
      ))}

      {/* Blue horizon glow stripe */}
      <mesh position={[0, 0.2, 0]}>
        <planeGeometry args={[32, 0.08]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.1, 0.1]}>
        <planeGeometry args={[32, 0.4]} />
        <meshBasicMaterial
          color="#93C5FD"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
