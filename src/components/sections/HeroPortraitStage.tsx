import { useEffect, useRef, useState, useCallback } from 'react';
import { HeroFloatingCards } from './HeroFloatingCards';

export interface HeroPortraitStageProps {
  initialMode?: string;
  gltfModelPath?: string;
}

// 3D Holographic Cube Component
function Floating3DCube({
  size = 32,
  top,
  left,
  right,
  bottom,
  colorScheme = 'blue',
  slow = true,
  bobClass = 'cube-bob-1',
}: {
  size?: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  colorScheme?: 'blue' | 'light-blue';
  slow?: boolean;
  bobClass?: string;
}) {
  const half = size / 2;
  const isLightBlue = colorScheme === 'light-blue';
  const faceClass = `cube-face ${isLightBlue ? 'cube-face-light-blue' : ''}`;

  return (
    <div
      className={`cube-container ${bobClass}`}
      style={{
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
      }}
    >
      <div
        className={`cube-3d ${slow ? 'cube-3d-slow' : 'cube-3d-rev'}`}
        style={{ width: size, height: size }}
      >
        <div className={faceClass} style={{ width: size, height: size, transform: `translateZ(${half}px)` }} />
        <div className={faceClass} style={{ width: size, height: size, transform: `rotateY(180deg) translateZ(${half}px)` }} />
        <div className={faceClass} style={{ width: size, height: size, transform: `rotateY(90deg) translateZ(${half}px)` }} />
        <div className={faceClass} style={{ width: size, height: size, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
        <div className={faceClass} style={{ width: size, height: size, transform: `rotateX(90deg) translateZ(${half}px)` }} />
        <div className={faceClass} style={{ width: size, height: size, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
      </div>
    </div>
  );
}

// Floating Metallic Sphere Component
function FloatingMetallicSphere({
  size = 28,
  top,
  left,
  right,
  bottom,
  color = 'blue',
  animClass = 'float-anim-2',
}: {
  size?: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  color?: 'blue' | 'light-blue';
  animClass?: string;
}) {
  const gradient =
    color === 'light-blue'
      ? 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #93C5FD 35%, #1D4ED8 70%, #111318 100%)'
      : 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #3B82F6 35%, #1D4ED8 70%, #111318 100%)';

  return (
    <div
      className={animClass}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        borderRadius: '50%',
        background: gradient,
        boxShadow: `0 0 16px rgba(59, 130, 246, 0.45), 0 8px 18px rgba(0, 0, 0, 0.75)`,
        pointerEvents: 'none',
        zIndex: 14,
      }}
    />
  );
}

// Orbiting geometric items around the orbital path
const ORBIT_PARTICLES = [
  { angle: 0,   r: 130, size: 5, color: '#3B82F6' },
  { angle: 55,  r: 130, size: 3, color: '#93C5FD' },
  { angle: 115, r: 130, size: 4, color: '#60A5FA' },
  { angle: 175, r: 130, size: 3, color: '#3B82F6' },
  { angle: 235, r: 130, size: 5, color: '#93C5FD' },
  { angle: 295, r: 130, size: 3, color: '#60A5FA' },
  { angle: 30,  r: 155, size: 4, color: '#93C5FD' },
  { angle: 90,  r: 155, size: 3, color: '#3B82F6' },
  { angle: 150, r: 155, size: 4, color: '#60A5FA' },
  { angle: 210, r: 155, size: 3, color: '#93C5FD' },
  { angle: 270, r: 155, size: 4, color: '#3B82F6' },
  { angle: 330, r: 155, size: 3, color: '#93C5FD' },
];

const ORBIT_GEMS = [
  { angle: 0,   r: 142, color: '#3B82F6', shape: '◈' },
  { angle: 120, r: 142, color: '#93C5FD', shape: '◆' },
  { angle: 240, r: 142, color: '#60A5FA', shape: '⬡' },
  { angle: 60,  r: 168, color: '#93C5FD', shape: '◇' },
  { angle: 180, r: 168, color: '#3B82F6', shape: '⟁' },
  { angle: 300, r: 168, color: '#60A5FA', shape: '◈' },
];

export function HeroPortraitStage() {
  // Mouse parallax refs (directly update DOM style to avoid React state re-renders)
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const rafRef = useRef<number | null>(null);

  const [isReducedMotion] = useState(
    () =>
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false
  );

  // Pre-validate personal photograph
  useEffect(() => {
    const imgPhoto = new Image();
    imgPhoto.src = '/images/nikhil-profile.png';
  }, []);

  // Smooth mouse parallax tilt loop without React state lag
  useEffect(() => {
    if (isReducedMotion) return;

    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      mouse.current.x += (mouse.current.tx - mouse.current.x) * Math.min(dt * 4, 0.2);
      mouse.current.y += (mouse.current.ty - mouse.current.y) * Math.min(dt * 4, 0.2);

      if (frameRef.current) {
        const rx = mouse.current.y * 6;
        const ry = mouse.current.x * 8;
        frameRef.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isReducedMotion]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouse.current.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouse.current.ty = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }, []);

  const onMouseLeave = useCallback(() => {
    mouse.current.tx = 0;
    mouse.current.ty = 0;
  }, []);

  // Polar coordinates to percentage positioning helper
  const polar = (angleDeg: number, radiusPx: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: 50 + (radiusPx / 340) * 50 * Math.cos(rad),
      y: 50 + (radiusPx / 340) * 50 * Math.sin(rad),
    };
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '740px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 1. Perspective Frame Wrapper */}
      <div
        ref={frameRef}
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: isReducedMotion ? 'none' : 'transform 0.05s linear',
          willChange: 'transform',
          zIndex: 10,
        }}
      >
        {/* Five Floating Information Panels Arranged Around Portrait on Desktop */}
        <HeroFloatingCards />

        {/* 2. Central Portrait Arena */}
        <div
          className="hero-orbit-arena"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '520px',
            height: '420px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Deep-blue glow backdrop */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.22) 0%, rgba(147, 197, 253, 0.1) 45%, transparent 70%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* LAYER 1: Outer holographic ring */}
          <svg
            aria-hidden="true"
            className="orbital-ring-outer"
            style={{
              position: 'absolute',
              inset: '-45px',
              width: 'calc(100% + 90px)',
              height: 'calc(100% + 90px)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
            viewBox="0 0 540 540"
            fill="none"
          >
            <defs>
              <linearGradient id="ringGradOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                <stop offset="35%" stopColor="#3B82F6" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#93C5FD" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
              </linearGradient>
              <filter id="bloomFilter">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <ellipse
              cx="270"
              cy="270"
              rx="245"
              ry="110"
              stroke="url(#ringGradOuter)"
              strokeWidth="2.2"
              filter="url(#bloomFilter)"
              transform="rotate(-20, 270, 270)"
            />
            <ellipse
              cx="270"
              cy="270"
              rx="235"
              ry="98"
              stroke="#3B82F6"
              strokeWidth="0.75"
              strokeDasharray="6 14"
              strokeOpacity="0.45"
              transform="rotate(-20, 270, 270)"
            />
          </svg>

          {/* LAYER 2: Concentric mid ring */}
          <svg
            aria-hidden="true"
            className="orbital-ring-mid"
            style={{
              position: 'absolute',
              inset: '-20px',
              width: 'calc(100% + 40px)',
              height: 'calc(100% + 40px)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
            viewBox="0 0 460 460"
            fill="none"
          >
            <defs>
              <linearGradient id="ringGradMid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93C5FD" stopOpacity="0" />
                <stop offset="45%" stopColor="#93C5FD" stopOpacity="0.8" />
                <stop offset="75%" stopColor="#60A5FA" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <ellipse
              cx="230"
              cy="230"
              rx="195"
              ry="86"
              stroke="url(#ringGradMid)"
              strokeWidth="1.6"
              transform="rotate(16, 230, 230)"
            />
            <ellipse
              cx="230"
              cy="230"
              rx="185"
              ry="76"
              stroke="#93C5FD"
              strokeWidth="0.6"
              strokeDasharray="4 12"
              strokeOpacity="0.5"
              transform="rotate(16, 230, 230)"
            />
          </svg>

          {/* LAYER 3: Inner Fast Ring (Clockwise Spin) */}
          <svg
            aria-hidden="true"
            className="orbital-ring-inner"
            style={{
              position: 'absolute',
              inset: '10px',
              width: 'calc(100% - 20px)',
              height: 'calc(100% - 20px)',
              pointerEvents: 'none',
              zIndex: 3,
            }}
            viewBox="0 0 400 400"
            fill="none"
          >
            <defs>
              <linearGradient id="ringGradInner" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
              </linearGradient>
            </defs>
            <ellipse
              cx="200"
              cy="200"
              rx="160"
              ry="65"
              stroke="url(#ringGradInner)"
              strokeWidth="1.5"
              transform="rotate(34, 200, 200)"
            />
          </svg>

          {/* LAYER 4: Orbiting Particles Container */}
          <div
            aria-hidden="true"
            className="orbital-ring-outer"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 4,
            }}
          >
            {ORBIT_PARTICLES.map((p, i) => {
              const pos = polar(p.angle, p.r);
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    borderRadius: '50%',
                    background: p.color,
                    boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                    opacity: 0.85,
                  }}
                />
              );
            })}
          </div>

          {/* LAYER 5: Orbiting Geometric Glyphs (Counter-Clockwise) */}
          <div
            aria-hidden="true"
            className="orbital-ring-mid"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 4,
            }}
          >
            {ORBIT_GEMS.map((g, i) => {
              const pos = polar(g.angle, g.r);
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    fontSize: '12px',
                    color: g.color,
                    textShadow: `0 0 8px ${g.color}`,
                    opacity: 0.85,
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  {g.shape}
                </div>
              );
            })}
          </div>

          {/* LAYER 6: FLOATING 3D HOLOGRAPHIC CUBES */}
          <Floating3DCube size={34} top="8%" left="-18px" colorScheme="blue" slow bobClass="cube-bob-1" />
          <Floating3DCube size={30} bottom="14%" right="-20px" colorScheme="light-blue" slow={false} bobClass="cube-bob-2" />

          {/* LAYER 7: FLOATING METALLIC SPHERES */}
          <FloatingMetallicSphere size={30} top="12%" right="18px" color="blue" animClass="float-anim-2" />
          <FloatingMetallicSphere size={24} bottom="18%" left="22px" color="light-blue" animClass="float-anim-1" />
          <FloatingMetallicSphere size={16} top="54%" left="-28px" color="light-blue" animClass="float-anim-3" />

          {/* LAYER 8: FLOATING TORUS RING (Isometric wireframe accent) */}
          <div
            aria-hidden="true"
            className="float-anim-3"
            style={{
              position: 'absolute',
              top: '4%',
              left: '52%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              zIndex: 8,
              opacity: 0.65,
            }}
          >
            <svg width="48" height="28" viewBox="0 0 48 28" fill="none">
              <ellipse cx="24" cy="14" rx="22" ry="11" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="3 6" />
              <ellipse cx="24" cy="14" rx="14" ry="7" stroke="#93C5FD" strokeWidth="1" />
            </svg>
          </div>

          {/* LAYER 9: VISUALLY INTEGRATED CENTRAL PORTRAIT FRAME */}
          <div
            className="character-float-anim"
            style={{
              position: 'relative',
              zIndex: 10,
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: '#101114',
              border: '3px solid rgba(59, 130, 246, 0.85)',
              boxShadow:
                '0 0 40px rgba(59, 130, 246, 0.55), 0 0 80px rgba(59, 130, 246, 0.22), inset 0 0 30px rgba(59, 130, 246, 0.4), 0 25px 60px rgba(0, 0, 0, 0.95)',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.025)';
              e.currentTarget.style.boxShadow =
                '0 0 50px rgba(59, 130, 246, 0.75), 0 0 100px rgba(59, 130, 246, 0.35), inset 0 0 35px rgba(59, 130, 246, 0.5), 0 30px 70px rgba(0, 0, 0, 0.98)';
              e.currentTarget.style.borderColor = '#3B82F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow =
                '0 0 40px rgba(59, 130, 246, 0.55), 0 0 80px rgba(59, 130, 246, 0.22), inset 0 0 30px rgba(59, 130, 246, 0.4), 0 25px 60px rgba(0, 0, 0, 0.95)';
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.85)';
            }}
          >
            {/* Concentric Inner Neon Accent Ring */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '2px',
                borderRadius: '50%',
                border: '1px dashed rgba(147, 197, 253, 0.65)',
                pointerEvents: 'none',
                zIndex: 4,
              }}
            />

            {/* Polished Inner Aperture with Real Personal Photograph */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                background:
                  'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.25) 0%, rgba(16, 17, 20, 0.9) 75%)',
              }}
            >
              {/* Backlight Glow Disc */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 50% 35%, rgba(59, 130, 246, 0.35) 0%, rgba(147, 197, 253, 0.18) 50%, transparent 75%)',
                  filter: 'blur(16px)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* Real Personal Photograph of Nikhil Ranjan Pasayat */}
              <img
                src="/images/nikhil-profile.png"
                alt="Nikhil Ranjan Pasayat"
                draggable={false}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 18%',
                  filter:
                    'drop-shadow(0 0 16px rgba(59, 130, 246, 0.35)) contrast(1.06) saturate(1.06)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />

              {/* Blue rim light and depth vignette overlay */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: `
                    radial-gradient(circle at 50% 50%, transparent 60%, rgba(16, 17, 20, 0.45) 85%, rgba(59, 130, 246, 0.4) 100%),
                    linear-gradient(to top, rgba(16, 17, 20, 0.65) 0%, transparent 40%)
                  `,
                  pointerEvents: 'none',
                  zIndex: 3,
                }}
              />
            </div>

            {/* Glowing Corner Notches / Bezel Accents */}
            {[0, 90, 180, 270].map((deg) => (
              <div
                key={deg}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#3B82F6',
                  boxShadow: '0 0 8px #3B82F6',
                  transform: `translate(-50%, -50%) rotate(${deg}deg) translate(145px) rotate(-${deg}deg)`,
                  pointerEvents: 'none',
                  zIndex: 5,
                }}
              />
            ))}
          </div>
          {/* end central portrait frame */}
        </div>
      </div>
    </div>
  );
}
