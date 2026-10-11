import { GlowingCard } from '../ui/GlowingCard';
import { SectionHeading } from '../ui/SectionHeading';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Brain, Code2, Cpu, Sparkles, MapPin, University } from 'lucide-react';

export function AboutSection() {
  const pillars = [
    {
      icon: <Brain size={24} color="#3B82F6" />,
      title: 'Artificial Intelligence & ML',
      description: 'Designing predictive models, computer vision pipelines, and deep learning algorithms tailored for practical automation and decision support.',
      glow: 'blue' as const,
    },
    {
      icon: <Code2 size={24} color="#93C5FD" />,
      title: 'Software Development',
      description: 'Building end-to-end applications with clean architectures, relational database integrity (SQL/DBMS), and modern responsive web standards.',
      glow: 'light-blue' as const,
    },
    {
      icon: <Cpu size={24} color="#93C5FD" />,
      title: 'Smart Systems & Edge IoT',
      description: 'Bridging the physical and digital with embedded sensors, energy-efficient micro-grid nodes, and real-time telemetry analytics.',
      glow: 'gray' as const,
    }
  ];

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '5rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}
    >
      <SectionHeading
        tag="Core Profile"
        title="Engineering With Purpose,"
        highlightTitle="Driven By AI"
        subtitle="Bridging algorithmic theory with practical software engineering to construct responsive, dependable digital systems."
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'stretch',
          marginBottom: '3rem'
        }}
      >
        {/* Main Biography Card */}
        <GlowingCard glowColor="blue" style={{ padding: '2.25rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '1.25rem'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(59, 130, 246, 0.12)',
                border: '1px solid rgba(59, 130, 246, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3B82F6'
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                About Me
              </h3>
              <div
                style={{
                  fontSize: '0.8rem',
                  color: '#9CA3AF',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                Undergraduate Engineer
              </div>
            </div>
          </div>

          <p
            style={{
              color: '#D1D5DB',
              fontSize: '1rem',
              lineHeight: 1.75,
              marginBottom: '1.5rem'
            }}
          >
            {PERSONAL_INFO.bio}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#9CA3AF',
                fontSize: '0.88rem'
              }}
            >
              <University size={16} color="#3B82F6" />
              <span>{PERSONAL_INFO.currentUniversity}</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#9CA3AF',
                fontSize: '0.88rem'
              }}
            >
              <MapPin size={16} color="#93C5FD" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>
        </GlowingCard>

        {/* Stats Grid Card */}
        <GlowingCard glowColor="light-blue" style={{ padding: '2.25rem' }}>
          <h3
            style={{
              margin: '0 0 1.5rem 0',
              fontSize: '1.25rem',
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)'
            }}
          >
            Key Capabilities & Metrics
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.25rem'
            }}
          >
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  textAlign: 'center',
                  transition: 'all 0.25s ease'
                }}
              >
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-heading)',
                    background: idx % 2 === 0
                      ? 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)'
                      : 'linear-gradient(135deg, #93C5FD 0%, #60A5FA 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '4px'
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: '#9CA3AF',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '1.75rem',
              padding: '1rem',
              borderRadius: '10px',
              background: 'rgba(59, 130, 246, 0.05)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              color: '#9CA3AF',
              fontSize: '0.88rem',
              lineHeight: 1.5
            }}
          >
            <span style={{ color: '#3B82F6', fontWeight: 600 }}>Objective:</span> To collaborate on forward-looking engineering projects where machine intelligence, robust logic, and impactful software solve human challenges.
          </div>
        </GlowingCard>
      </div>

      {/* 3 Engineering Pillars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {pillars.map((pillar, idx) => (
          <GlowingCard
            key={idx}
            glowColor={pillar.glow}
            style={{ padding: '1.75rem' }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}
            >
              {pillar.icon}
            </div>

            <h4
              style={{
                margin: '0 0 0.5rem 0',
                fontSize: '1.1rem',
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading)'
              }}
            >
              {pillar.title}
            </h4>

            <p
              style={{
                margin: 0,
                fontSize: '0.9rem',
                color: '#9CA3AF',
                lineHeight: 1.6
              }}
            >
              {pillar.description}
            </p>
          </GlowingCard>
        ))}
      </div>
    </section>
  );
}
