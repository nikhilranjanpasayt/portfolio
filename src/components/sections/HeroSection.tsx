import { 
  ArrowRight, 
  Download, 
  Send, 
  Brain, 
  Code2, 
  BarChart3, 
  Cpu,
  ChevronDown
} from 'lucide-react';
import { HeroPortraitStage } from './HeroPortraitStage';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
  onExploreProjects: () => void;
  onConnect: () => void;
  onScrollToAbout?: () => void;
}

export function HeroSection({
  onOpenResumeModal,
  onExploreProjects,
  onConnect,
  onScrollToAbout
}: HeroSectionProps) {
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/Nikhil_Ranjan_Pasayat_Resume.pdf';
    link.download = 'Nikhil_Ranjan_Pasayat_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onOpenResumeModal();
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '110px',
        paddingBottom: '70px',
        overflow: 'hidden',
      }}
    >
      {/* Cinematic ambient blue glow background layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.16) 0%, rgba(147, 197, 253, 0.08) 45%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* 1. Eyebrow Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '9999px',
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#3B82F6',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '1rem',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.15)',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#3B82F6',
              boxShadow: '0 0 8px #3B82F6',
            }}
          />
          HELLO, I'M
        </div>

        {/* 2. Full Name in Bold Futuristic Typography */}
        <h1
          style={{
            fontSize: 'clamp(2.4rem, 5.8vw, 4.6rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            margin: '0 0 0.85rem 0',
            fontFamily: 'var(--font-heading)',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: '#FFFFFF', marginRight: '0.4em' }}>
            NIKHIL RANJAN
          </span>
          <span
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #93C5FD 50%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              textShadow: '0 0 45px rgba(59, 130, 246, 0.45)',
            }}
          >
            PASAYAT
          </span>
        </h1>

        {/* 3. Professional Tagline */}
        <div
          style={{
            fontSize: 'clamp(1.15rem, 2.3vw, 1.75rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.3,
          }}
        >
          Building{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #93C5FD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Intelligent
          </span>{' '}
          Experiences.
        </div>

        {/* 4. VISUALLY INTEGRATED CENTRAL PORTRAIT STAGE (Focal Centerpiece) */}
        <div
          style={{
            width: '100%',
            maxWidth: '740px',
            margin: '0 auto 1.5rem',
            position: 'relative',
          }}
        >
          <HeroPortraitStage />
        </div>

        {/* 5. Introduction Description */}
        <p
          style={{
            fontSize: '1.05rem',
            color: '#9CA3AF',
            lineHeight: 1.65,
            maxWidth: '680px',
            margin: '0 auto 2rem',
          }}
        >
          Undergraduate Computer Science Engineer specializing in Artificial Intelligence & Machine Learning at GIET University. Crafting intelligent systems, predictive modeling solutions, and modern software architectures.
        </p>

        {/* 6. Action Buttons (Unobstructed & Accessible) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            position: 'relative',
            zIndex: 20,
          }}
        >
          {/* Explore my work button */}
          <button
            onClick={onExploreProjects}
            id="hero-explore-work-btn"
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              padding: '13px 28px',
              fontSize: '0.98rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 0 28px rgba(59, 130, 246, 0.45)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 0 38px rgba(59, 130, 246, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 0 28px rgba(59, 130, 246, 0.45)';
            }}
          >
            <span>Explore My Work</span>
            <ArrowRight size={18} />
          </button>

          {/* Download resume button */}
          <button
            onClick={handleResumeDownload}
            id="hero-download-resume-btn"
            style={{
              background: 'rgba(25, 27, 32, 0.85)',
              color: '#FFFFFF',
              border: '1px solid rgba(59, 130, 246, 0.45)',
              borderRadius: '9999px',
              padding: '13px 26px',
              fontSize: '0.98rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#3B82F6';
              e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.12)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.45)';
              e.currentTarget.style.backgroundColor = 'rgba(25, 27, 32, 0.85)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Download size={18} color="#3B82F6" />
            <span>Download Resume</span>
          </button>

          {/* Let's Connect Button */}
          <button
            onClick={onConnect}
            id="hero-lets-connect-btn"
            style={{
              background: 'rgba(25, 27, 32, 0.85)',
              color: '#93C5FD',
              border: '1px solid rgba(147, 197, 253, 0.4)',
              borderRadius: '9999px',
              padding: '13px 26px',
              fontSize: '0.98rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#93C5FD';
              e.currentTarget.style.backgroundColor = 'rgba(147, 197, 253, 0.12)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(147, 197, 253, 0.4)';
              e.currentTarget.style.backgroundColor = 'rgba(25, 27, 32, 0.85)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Send size={17} />
            <span>Let's Connect</span>
          </button>
        </div>

        {/* 7. Compact Technical Role Indicators Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '1.75rem',
          }}
        >
          {[
            { label: 'AI & Machine Learning', icon: <Brain size={15} color="#3B82F6" /> },
            { label: 'Software Development', icon: <Code2 size={15} color="#93C5FD" /> },
            { label: 'Data Analytics & SQL', icon: <BarChart3 size={15} color="#60A5FA" /> },
            { label: 'Smart Systems & IoT', icon: <Cpu size={15} color="#93C5FD" /> },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'rgba(25, 27, 32, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                fontSize: '0.84rem',
                fontFamily: 'var(--font-mono)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* 8. Quick Academic / Project Metrics Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            width: '100%',
            maxWidth: '680px',
            margin: '0 auto',
            padding: '16px 20px',
            background: 'rgba(25, 27, 32, 0.65)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '16px',
            backdropFilter: 'blur(14px)',
          }}
        >
          {[
            { value: '4+', label: 'Core Projects' },
            { value: '14+', label: 'Technical Skills' },
            { value: 'AI & ML', label: 'Specialization' },
            { value: 'B.Tech', label: 'GIET University' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#3B82F6',
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: '#9CA3AF',
                  marginTop: '4px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Cue Indicator */}
        {onScrollToAbout && (
          <button
            onClick={onScrollToAbout}
            className="hero-scroll-cue"
            aria-label="Scroll down to About section"
            style={{
              background: 'none',
              border: 'none',
              color: '#3B82F6',
              cursor: 'pointer',
              marginTop: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              opacity: 0.75,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.75'; }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em' }}>
              SCROLL DOWN
            </span>
            <ChevronDown size={18} className="scroll-dot-anim" />
          </button>
        )}
      </div>
    </section>
  );
}
