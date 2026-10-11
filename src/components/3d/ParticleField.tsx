import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  isReducedMotion?: boolean;
}

// Pure deterministic generator for the blue, white, and silver particle field.
function generateFieldData(count: number, minRadius: number, maxRadius: number, heightSpan: number, seedInit: number) {
  let seed = seedInit;
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);

  // Blue, light blue, and white particle tones.
  const blueTone = new THREE.Color('#3B82F6');
  const lightBlueTone = new THREE.Color('#93C5FD');
  const brightBlueTone = new THREE.Color('#60A5FA');
  const silverTone = new THREE.Color('#D1D5DB');
  const whiteTone = new THREE.Color('#FFFFFF');

  for (let i = 0; i < count; i++) {
    const radius = minRadius + pseudoRandom() * (maxRadius - minRadius);
    const theta = pseudoRandom() * Math.PI * 2;
    const y = (pseudoRandom() - 0.5) * heightSpan;
    const depthBias = (pseudoRandom() - 0.5) * 8;

    pos[i * 3] = radius * Math.cos(theta);
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = radius * Math.sin(theta) + depthBias;

    const t = pseudoRandom();
    let mixedColor: THREE.Color;
    if (t < 0.3) {
      mixedColor = blueTone.clone().lerp(brightBlueTone, t * 2.8);
    } else if (t < 0.58) {
      mixedColor = brightBlueTone.clone().lerp(lightBlueTone, (t - 0.3) * 2.8);
    } else if (t < 0.88) {
      mixedColor = lightBlueTone.clone().lerp(silverTone, (t - 0.58) * 3.3);
    } else {
      mixedColor = silverTone.clone().lerp(whiteTone, (t - 0.88) * 8.3);
    }

    col[i * 3] = mixedColor.r;
    col[i * 3 + 1] = mixedColor.g;
    col[i * 3 + 2] = mixedColor.b;
  }

  return { positions: pos, colors: col };
}

export function ParticleField({ isReducedMotion = false }: ParticleFieldProps) {
  const cosmicDustRef = useRef<THREE.Points>(null);
  const energyMotesRef = useRef<THREE.Points>(null);

  // Layer 1: Distant Stellar Field (1,500 particles)
  const stellarData = useMemo(() => {
    return generateFieldData(1500, 3, 24, 26, 4242);
  }, []);

  // Layer 2: Mid-field Energy Motes (650 particles closer to interactive core)
  const motesData = useMemo(() => {
    return generateFieldData(650, 1.5, 12, 14, 9876);
  }, []);

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (cosmicDustRef.current) {
      // Slow, serene planetary drift
      cosmicDustRef.current.rotation.y += delta * 0.025;
      cosmicDustRef.current.rotation.x = Math.sin(time * 0.08) * 0.04;
    }

    if (energyMotesRef.current) {
      // Counter-rotation and subtle oscillation
      energyMotesRef.current.rotation.y -= delta * 0.04;
      energyMotesRef.current.rotation.z = Math.cos(time * 0.12) * 0.06;
      energyMotesRef.current.position.y = Math.sin(time * 0.3) * 0.15;
    }
  });

  return (
    <group>
      {/* Layer 1: Distant Deep Space Particles */}
      <points ref={cosmicDustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[stellarData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[stellarData.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Layer 2: Glowing Foreground/Mid-ground Energy Motes */}
      <points ref={energyMotesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[motesData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[motesData.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}
