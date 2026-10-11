import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DigitalTwinMesh } from './DigitalTwinMesh';

interface DigitalAvatarProps {
  isReducedMotion?: boolean;
  position?: [number, number, number];
  scale?: number;
}

// Generate an advanced procedural holographic fallback texture if photo is empty or missing
function createHolographicPlaceholderTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Deep holographic background
    const grad = ctx.createLinearGradient(0, 0, 0, 640);
    grad.addColorStop(0, '#191B20');
    grad.addColorStop(0.5, '#20232A');
    grad.addColorStop(1, '#101114');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 640);

    // Cyber grid lines
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.18)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 512; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 640);
      ctx.stroke();
    }
    for (let y = 0; y <= 640; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Outer HUD frame
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 472, 600);

    // Corner brackets
    ctx.strokeStyle = '#93C5FD';
    ctx.lineWidth = 5;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(10, 50);
    ctx.lineTo(10, 10);
    ctx.lineTo(50, 10);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(462, 10);
    ctx.lineTo(502, 10);
    ctx.lineTo(502, 50);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(10, 590);
    ctx.lineTo(10, 630);
    ctx.lineTo(50, 630);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(462, 630);
    ctx.lineTo(502, 630);
    ctx.lineTo(502, 590);
    ctx.stroke();

    // Center circular avatar frame
    ctx.beginPath();
    ctx.arc(256, 250, 110, 0, Math.PI * 2);
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(256, 250, 118, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(147, 197, 253, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Silhouette head
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.beginPath();
    ctx.arc(256, 210, 50, 0, Math.PI * 2);
    ctx.fill();

    // Silhouette shoulders
    ctx.beginPath();
    ctx.arc(256, 345, 90, Math.PI, 0, false);
    ctx.fill();

    // Text labels
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText('NIKHIL RANJAN PASAYAT', 256, 425);

    ctx.font = '16px monospace';
    ctx.fillStyle = '#3B82F6';
    ctx.fillText('PORTRAIT HOLOGRAPHIC NODE', 256, 465);

    ctx.font = '13px monospace';
    ctx.fillStyle = '#9CA3AF';
    ctx.fillText('GIET UNIVERSITY // CSE (AI & ML)', 256, 500);

    ctx.fillStyle = '#3B82F6';
    ctx.fillText('[ STATUS: LIVE HUD TELEMETRY ]', 256, 535);

    ctx.fillStyle = '#93C5FD';
    ctx.font = '12px monospace';
    ctx.fillText('nikhil-profile.png LOADED', 256, 570);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function DigitalAvatar({
  isReducedMotion = false,
  position = [0, 0, -1],
  scale = 1
}: DigitalAvatarProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const portraitMeshRef = useRef<THREE.Mesh>(null);
  const scannerBarRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const sat1Ref = useRef<THREE.Mesh>(null);
  const sat2Ref = useRef<THREE.Mesh>(null);

  const [activeTexture, setActiveTexture] = useState<THREE.Texture>(() => {
    return createHolographicPlaceholderTexture();
  });

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/images/nikhil-profile.png',
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        setActiveTexture(tex);
      },
      undefined,
      () => {
        // Keeps fallback
      }
    );
  }, []);

  useFrame((state, delta) => {
    if (isReducedMotion) return;
    const time = state.clock.getElapsedTime();

    if (rootGroupRef.current) {
      rootGroupRef.current.position.y = position[1] + Math.sin(time * 0.9) * 0.08;
    }

    if (scannerBarRef.current) {
      scannerBarRef.current.position.y = Math.sin(time * 2.2) * 1.35;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
      ringRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    }

    if (sat1Ref.current) {
      const radius = 1.9;
      sat1Ref.current.position.x = Math.cos(time * 1.1) * radius;
      sat1Ref.current.position.y = Math.sin(time * 1.1) * radius;
      sat1Ref.current.rotation.x += delta * 1.4;
    }

    if (sat2Ref.current) {
      const radius = 2.2;
      sat2Ref.current.position.x = Math.cos(time * -0.8 + Math.PI) * radius;
      sat2Ref.current.position.y = Math.sin(time * -0.8 + Math.PI) * (radius * 0.6);
      sat2Ref.current.rotation.y += delta * 1.6;
    }
  });

  return (
    <group ref={rootGroupRef} position={position} scale={scale}>
      {/* 1. Holographic Character/Photo Surface */}
      <mesh ref={portraitMeshRef} position={[0, 0, 0]}>
        <planeGeometry args={[2.2, 2.75]} />
        <meshBasicMaterial
          map={activeTexture}
          transparent
          opacity={0.92}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. Scanning Laser Bar */}
      <mesh ref={scannerBarRef} position={[0, 0, 0.02]}>
        <planeGeometry args={[2.3, 0.035]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* 3. Orbiting Holographic Rings */}
      <group ref={ringRef} position={[0, 0, -0.05]}>
        <mesh>
          <ringGeometry args={[1.7, 1.72, 64]} />
          <meshBasicMaterial
            color="#3B82F6"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh rotation={[0.4, 0.4, 0]}>
          <ringGeometry args={[1.9, 1.92, 48]} />
          <meshBasicMaterial
            color="#93C5FD"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* 4. Orbiting Satellites */}
      <mesh ref={sat1Ref} position={[1.9, 0, 0.1]}>
        <octahedronGeometry args={[0.08, 0]} />
        <meshBasicMaterial color="#3B82F6" />
      </mesh>

      <mesh ref={sat2Ref} position={[-2.2, 0, 0.1]}>
        <tetrahedronGeometry args={[0.09, 0]} />
        <meshBasicMaterial color="#93C5FD" />
      </mesh>

      {/* 5. Holographic Digital Twin Mesh Node */}
      <DigitalTwinMesh isReducedMotion={isReducedMotion} position={[1.4, 0, -0.2]} scale={0.75} />
    </group>
  );
}
