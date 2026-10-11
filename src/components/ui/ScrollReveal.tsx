import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 28,
  duration = 0.65,
  className = '',
  style = {},
}: ScrollRevealProps) {
  const { isReducedMotion } = useReducedMotion();

  if (isReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialPosition(),
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
