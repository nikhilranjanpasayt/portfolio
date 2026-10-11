import { useState } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrollSpyRailProps {
  onNavigate: (id: string) => void;
}

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Milestones' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export function ScrollSpyRail({ onNavigate }: ScrollSpyRailProps) {
  const { isReducedMotion } = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeSection = useActiveSection(
    SECTIONS.map((s) => s.id),
    'hero'
  );

  return (
    <nav
      aria-label="Section navigation rail"
      className="scroll-spy-rail"
      style={{
        position: 'fixed',
        right: '22px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 45,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 6px',
        background: 'rgba(25, 27, 32, 0.65)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        borderRadius: '9999px',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(59, 130, 246, 0.08)',
      }}
    >
      {/* Subtle vertical indicator line */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '16px',
          bottom: '16px',
          width: '1px',
          background: 'rgba(255, 255, 255, 0.08)',
          zIndex: 0,
        }}
      />

      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredId === sec.id;

        return (
          <div
            key={sec.id}
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            onMouseEnter={() => setHoveredId(sec.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Tooltip Label on Left */}
            {(isHovered || (isActive && !isReducedMotion)) && (
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  right: '28px',
                  whiteSpace: 'nowrap',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(16, 17, 20, 0.94)',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  color: isActive ? '#3B82F6' : '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.8), 0 0 10px rgba(59, 130, 246, 0.2)',
                  pointerEvents: 'none',
                  animation: 'fadeIn 0.15s ease',
                  zIndex: 10,
                }}
              >
                {sec.label}
              </div>
            )}

            {/* Indicator Dot Button */}
            <button
              onClick={() => onNavigate(sec.id)}
              aria-label={`Jump to ${sec.label} section`}
              aria-current={isActive ? 'true' : undefined}
              style={{
                position: 'relative',
                zIndex: 2,
                width: isActive ? '12px' : '8px',
                height: isActive ? '20px' : '8px',
                borderRadius: '9999px',
                border: 'none',
                background: isActive
                  ? 'linear-gradient(180deg, #3B82F6 0%, #93C5FD 100%)'
                  : isHovered
                  ? '#3B82F6'
                  : 'rgba(255, 255, 255, 0.25)',
                boxShadow: isActive
                  ? '0 0 10px #3B82F6, 0 0 4px #93C5FD'
                  : isHovered
                  ? '0 0 6px #3B82F6'
                  : 'none',
                cursor: 'pointer',
                padding: 0,
                transition: isReducedMotion ? 'none' : 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
        );
      })}
    </nav>
  );
}
