import { useRef, useEffect, useState, Component, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ParticleField } from './ParticleField';
import { CyberRings } from './CyberRings';
import { FloatingTechCore } from './FloatingTechCore';
import { FloatingGeometricObjects } from './FloatingGeometricObjects';
import { PlanetarySphere } from './PlanetarySphere';
import { CyberSkyline } from './CyberSkyline';
import { CyberFloorRings } from './CyberFloorRings';

interface SceneContainerProps {
  isReducedMotion?: boolean;
}

// Inner group managing pointer parallax and 3-layer differential scroll parallax
function ParallaxSceneGroup({ isReducedMotion }: { isReducedMotion: boolean }) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const foregroundRef = useRef<THREE.Group>(null);
  const midgroundRef = useRef<THREE.Group>(null);
  const deepBgRef = useRef<THREE.Group>(null);

  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scroll = useRef({ y: 0, targetY: 0 });
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1200);
      scroll.current.targetY = (window.scrollY / maxScroll) * 4.0;
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useFrame((_, delta) => {
    if (!masterGroupRef.current || isReducedMotion) return;

    // Smooth lerp for pointer parallax
    const mouseLerp = Math.min(delta * 3.5, 0.2);
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * mouseLerp;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * mouseLerp;

    // Smooth lerp for scroll progression
    const scrollLerp = Math.min(delta * 3.0, 0.18);
    scroll.current.y += (scroll.current.targetY - scroll.current.y) * scrollLerp;

    // Subtle pointer parallax tilt on master group
    masterGroupRef.current.rotation.y = mouse.current.x * 0.1;
    masterGroupRef.current.rotation.x = -mouse.current.y * 0.06;

    // Multi-Layer Parallax: Distinct speeds for deep, mid, and foreground layers
    if (deepBgRef.current) {
      // Background layer moves slowly for vast cosmic distance
      deepBgRef.current.position.y = scroll.current.y * 0.45;
    }

    if (midgroundRef.current) {
      // Midground layer moves at medium velocity
      midgroundRef.current.position.y = scroll.current.y * 0.95;
      midgroundRef.current.rotation.y = scroll.current.y * 0.08;
    }

    if (foregroundRef.current) {
      // Foreground floating geometry glides faster, giving close-up depth
      foregroundRef.current.position.y = scroll.current.y * 1.6;
      foregroundRef.current.rotation.z = scroll.current.y * 0.06;
    }
  });

  const planetPosition: [number, number, number] = isMobile ? [0, 0.8, -5.5] : [0, 0.5, -5.0];
  const corePosition: [number, number, number] = isMobile ? [0, -2.6, -3.8] : [0, -2.2, -3.2];
  const floorPosition: [number, number, number] = isMobile ? [0, -3.0, -2.0] : [0, -2.8, -1.8];

  return (
    <group ref={masterGroupRef}>
      {/* LAYER 1: Deep Cosmic Background (Slow Parallax) */}
      <group ref={deepBgRef}>
        <PlanetarySphere
          isReducedMotion={isReducedMotion}
          position={planetPosition}
          scale={isMobile ? 0.9 : 1.25}
        />
        <CyberSkyline
          isReducedMotion={isReducedMotion}
          position={[0, -3.0, -6.5]}
        />
        <ParticleField isReducedMotion={isReducedMotion} />
      </group>

      {/* LAYER 2: Midground Tech Core & Floor Console Rings (Medium Parallax) */}
      <group ref={midgroundRef}>
        <CyberFloorRings
          isReducedMotion={isReducedMotion}
          position={floorPosition}
        />
        <CyberRings isReducedMotion={isReducedMotion} position={corePosition} />
        <FloatingTechCore isReducedMotion={isReducedMotion} position={corePosition} />
      </group>

      {/* LAYER 3: Foreground Floating 3D Geometric Objects (Fast Parallax) */}
      <group ref={foregroundRef}>
        <FloatingGeometricObjects isReducedMotion={isReducedMotion} />
      </group>
    </group>
  );
}

// Safe Error Boundary for WebGL devices
class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function FuturisticScene({ isReducedMotion = false }: SceneContainerProps) {
  return (
    <div 
      className="scene-canvas-wrapper" 
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#101114',
      }}
    >
      <WebGLErrorBoundary
        fallback={
          <div className="canvas-fallback-grid" />
        }
      >
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Volumetric Cosmic Fog for deep charcoal perspective */}
          <fog attach="fog" args={['#101114', 4, 30]} />

          {/* Cinematic blue and silver lighting system */}
          <ambientLight color="#191B20" intensity={1.1} />
          {/* Blue key light */}
          <pointLight position={[5, 4, 3]} color="#3B82F6" intensity={4.5} distance={26} />
          {/* Light-blue fill light */}
          <pointLight position={[-5, -3, 2]} color="#93C5FD" intensity={3.8} distance={24} />
          {/* Deep-blue rim light */}
          <pointLight position={[0, 5, -2]} color="#1D4ED8" intensity={2.2} distance={20} />
          {/* Soft blue top-down directional light */}
          <directionalLight position={[-2, 6, 4]} color="#60A5FA" intensity={0.9} />

          <ParallaxSceneGroup isReducedMotion={isReducedMotion} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
