import { GlowingCard } from '../ui/GlowingCard';
import { SectionHeading } from '../ui/SectionHeading';
import { NeonBadge } from '../ui/NeonBadge';
import { ScrollReveal } from '../ui/ScrollReveal';
import { ACHIEVEMENTS_LIST } from '../../data/portfolioData';
import { Award, Trophy, Compass, PlusCircle } from 'lucide-react';

export function ExperienceSection() {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Academic':
        return <NeonBadge variant="blue" size="sm">Academic</NeonBadge>;
      case 'Hackathon':
        return <NeonBadge variant="light-blue" size="sm">Hackathon</NeonBadge>;
      case 'Initiative':
        return <NeonBadge variant="gray" size="sm">Initiative</NeonBadge>;
      default:
        return <NeonBadge variant="light-blue" size="sm">{type}</NeonBadge>;
    }
  };

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '5rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}
    >
      <SectionHeading
        tag="Milestones & Track Record"
        title="Experience &"
        highlightTitle="Achievements"
        subtitle="Academic milestones, technical projects, and active development roadmap."
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {ACHIEVEMENTS_LIST.map((item, idx) => (
          <ScrollReveal key={item.id} delay={idx * 0.07} distance={18}>
            <GlowingCard
              glowColor={idx % 2 === 0 ? 'blue' : 'light-blue'}
              style={{ padding: '1.75rem', height: '100%' }}
            >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3B82F6'
                }}
              >
                {item.type === 'Academic' ? (
                  <Award size={20} />
                ) : item.type === 'Initiative' ? (
                  <Compass size={20} />
                ) : (
                  <Trophy size={20} />
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: '#9CA3AF'
                  }}
                >
                  {item.year}
                </span>
                {getTypeBadge(item.type)}
              </div>
            </div>

            <h3
              style={{
                margin: '0 0 0.4rem 0',
                fontSize: '1.15rem',
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600
              }}
            >
              {item.title}
            </h3>

            <div
              style={{
                fontSize: '0.82rem',
                color: '#3B82F6',
                fontFamily: 'var(--font-mono)',
                marginBottom: '0.75rem'
              }}
            >
              {item.organization}
            </div>

            <p
              style={{
                margin: 0,
                fontSize: '0.88rem',
                color: '#9CA3AF',
                lineHeight: 1.6
              }}
            >
              {item.description}
            </p>
            </GlowingCard>
          </ScrollReveal>
        ))}

        {/* Future Opportunities Card */}
        <div
          style={{
            position: 'relative',
            borderRadius: '16px',
            border: '2px dashed rgba(59, 130, 246, 0.35)',
            background: 'rgba(59, 130, 246, 0.04)',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '190px'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3B82F6',
              marginBottom: '0.75rem'
            }}
          >
            <PlusCircle size={24} />
          </div>

          <h3
            style={{
              margin: '0 0 0.35rem 0',
              fontSize: '1.1rem',
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)'
            }}
          >
            Next Internship / Experience
          </h3>

          <p
            style={{
              margin: 0,
              fontSize: '0.85rem',
              color: '#9CA3AF',
              maxWidth: '280px',
              lineHeight: 1.5
            }}
          >
            Open for AI/ML and software engineering internship opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
