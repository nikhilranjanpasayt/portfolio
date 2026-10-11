import type { ReactNode, CSSProperties } from 'react';

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'light-blue' | 'deep-blue' | 'gray';
  hoverEffect?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
}

export function GlowingCard({
  children,
  className = '',
  glowColor = 'blue',
  hoverEffect = true,
  style = {},
  onClick
}: GlowingCardProps) {
  const glowMap = {
    blue: '0 0 24px rgba(59, 130, 246, 0.22)',
    'light-blue': '0 0 24px rgba(147, 197, 253, 0.2)',
    'deep-blue': '0 0 24px rgba(29, 78, 216, 0.22)',
    gray: '0 0 24px rgba(156, 163, 175, 0.16)'
  };

  const borderMap = {
    blue: 'rgba(59, 130, 246, 0.25)',
    'light-blue': 'rgba(147, 197, 253, 0.25)',
    'deep-blue': 'rgba(29, 78, 216, 0.3)',
    gray: 'rgba(156, 163, 175, 0.22)'
  };

  const accentLineMap = {
    blue: '#3B82F6',
    'light-blue': '#93C5FD',
    'deep-blue': '#1D4ED8',
    gray: '#9CA3AF'
  };

  return (
    <div
      onClick={onClick}
      className={`cyber-card ${hoverEffect ? 'hover-elevate' : ''} ${className}`}
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(17, 19, 24, 0.92) 0%, rgba(8, 11, 16, 0.96) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '16px',
        border: `1px solid ${borderMap[glowColor]}`,
        boxShadow: `0 10px 32px 0 rgba(0, 0, 0, 0.6), ${glowMap[glowColor]}`,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    >
      {/* Subtle blue accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '24px',
          right: '24px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${accentLineMap[glowColor]}, transparent)`,
          opacity: 0.55
        }}
      />
      {children}
    </div>
  );
}
