import type { ReactNode } from 'react';

interface NeonBadgeProps {
  children: ReactNode;
  variant?: 'blue' | 'light-blue' | 'deep-blue' | 'gray' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export function NeonBadge({
  children,
  variant = 'blue',
  size = 'md',
  className = '',
  dot = false
}: NeonBadgeProps) {
  const variantStyles: Record<NonNullable<NeonBadgeProps['variant']>, { bg: string; text: string; border: string; dotColor: string; shadow: string }> = {
    blue: {
      bg: 'rgba(59, 130, 246, 0.12)',
      text: '#3B82F6',
      border: 'rgba(59, 130, 246, 0.35)',
      dotColor: '#3B82F6',
      shadow: '0 0 10px rgba(59, 130, 246, 0.25)'
    },
    'light-blue': {
      bg: 'rgba(147, 197, 253, 0.12)',
      text: '#93C5FD',
      border: 'rgba(147, 197, 253, 0.35)',
      dotColor: '#93C5FD',
      shadow: '0 0 10px rgba(147, 197, 253, 0.22)'
    },
    'deep-blue': {
      bg: 'rgba(29, 78, 216, 0.14)',
      text: '#93C5FD',
      border: 'rgba(59, 130, 246, 0.35)',
      dotColor: '#1D4ED8',
      shadow: '0 0 10px rgba(29, 78, 216, 0.22)'
    },
    gray: {
      bg: 'rgba(156, 163, 175, 0.12)',
      text: '#D1D5DB',
      border: 'rgba(156, 163, 175, 0.28)',
      dotColor: '#9CA3AF',
      shadow: 'none'
    },
    slate: {
      bg: 'rgba(166, 168, 175, 0.12)',
      text: '#9CA3AF',
      border: 'rgba(166, 168, 175, 0.28)',
      dotColor: '#9CA3AF',
      shadow: 'none'
    }
  };

  const current = variantStyles[variant];
  const isSm = size === 'sm';

  return (
    <span
      className={`neon-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: isSm ? '3px 8px' : '5px 12px',
        fontSize: isSm ? '0.72rem' : '0.82rem',
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.04em',
        borderRadius: '9999px',
        backgroundColor: current.bg,
        color: current.text,
        border: `1px solid ${current.border}`,
        boxShadow: current.shadow,
        textTransform: 'uppercase'
      }}
    >
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: current.dotColor,
            boxShadow: `0 0 6px ${current.dotColor}`,
            display: 'inline-block'
          }}
        />
      )}
      {children}
    </span>
  );
}
