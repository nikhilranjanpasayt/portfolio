import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function ScrollProgressBar() {
  const { isReducedMotion } = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Smooth spring physics for fluid progress feedback
  const smoothedScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });
  const scaleX = isReducedMotion ? scrollYProgress : smoothedScaleX;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 100,
        pointerEvents: 'none',
        background: 'rgba(59, 130, 246, 0.12)',
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          scaleX,
          transformOrigin: '0%',
          background: 'linear-gradient(90deg, #3B82F6 0%, #93C5FD 50%, #60A5FA 100%)',
          boxShadow: '0 0 12px rgba(59, 130, 246, 0.85), 0 0 4px #93C5FD',
        }}
      />
    </div>
  );
}
