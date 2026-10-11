import { Brain, BarChart3, Globe, Wifi, Lightbulb, type LucideIcon } from 'lucide-react';

interface PanelData {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  desktopStyle: React.CSSProperties;
  animClass: string;
}

const PANELS: PanelData[] = [
  {
    id: 'ai-ml',
    title: 'AI & ML',
    subtitle: 'Build • Innovate',
    icon: Brain,
    desktopStyle: { top: '6%', left: '-2%' },
    animClass: 'float-anim-1',
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    subtitle: 'Full-Stack Engineering',
    icon: Globe,
    desktopStyle: { top: '6%', right: '-2%' },
    animClass: 'float-anim-3',
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    subtitle: 'Predictive Insights',
    icon: BarChart3,
    desktopStyle: { top: '50%', left: '-6%' },
    animClass: 'float-anim-2',
  },
  {
    id: 'edge-iot',
    title: 'Edge & IoT',
    subtitle: 'Smart Systems',
    icon: Wifi,
    desktopStyle: { top: '50%', right: '-6%' },
    animClass: 'float-anim-1',
  },
  {
    id: 'ideas-to-code',
    title: 'Ideas to Code',
    subtitle: 'Engineering Focus',
    icon: Lightbulb,
    desktopStyle: { bottom: '2%', left: '50%', transform: 'translateX(-50%)' },
    animClass: 'float-anim-2',
  },
];

export function HeroFloatingCards() {
  return (
    <>
      {/* 1. DESKTOP VIEW: Five Floating Information Panels Arranged Around Portrait */}
      <div
        className="desktop-floating-panels"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 25,
        }}
      >
        {PANELS.map((panel) => {
          const Icon = panel.icon;
          return (
            <div
              key={panel.id}
              className={`hero-float-card ${panel.animClass}`}
              style={{
                position: 'absolute',
                ...panel.desktopStyle,
                background: 'rgba(25, 27, 32, 0.88)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '16px',
                padding: '10px 16px',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.75), 0 0 22px rgba(59, 130, 246, 0.22)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                pointerEvents: 'auto',
                minWidth: '150px',
                transition: 'all 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid #3B82F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3B82F6',
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      lineHeight: 1.2,
                    }}
                  >
                    {panel.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: '#93C5FD',
                      fontFamily: 'var(--font-mono)',
                      marginTop: '2px',
                    }}
                  >
                    {panel.subtitle}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. MOBILE VIEW: Responsive Grid of the Five Information Panels */}
      <div
        className="mobile-floating-panels"
        style={{
          width: '100%',
        }}
      >
        {PANELS.map((panel) => {
          const Icon = panel.icon;
          return (
            <div
              key={panel.id}
              style={{
                background: 'rgba(25, 27, 32, 0.85)',
                border: '1px solid rgba(59, 130, 246, 0.35)',
                borderRadius: '14px',
                padding: '10px 14px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.65), 0 0 16px rgba(59, 130, 246, 0.15)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(59, 130, 246, 0.15)',
                  border: '1px solid #3B82F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3B82F6',
                  flexShrink: 0,
                }}
              >
                <Icon size={17} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                  }}
                >
                  {panel.title}
                </div>
                <div
                  style={{
                    fontSize: '0.68rem',
                    color: '#93C5FD',
                    fontFamily: 'var(--font-mono)',
                    marginTop: '2px',
                  }}
                >
                  {panel.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
