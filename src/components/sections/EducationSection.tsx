import { GlowingCard } from '../ui/GlowingCard';
import { SectionHeading } from '../ui/SectionHeading';
import { NeonBadge } from '../ui/NeonBadge';
import { ScrollReveal } from '../ui/ScrollReveal';
import { EDUCATION_LIST } from '../../data/portfolioData';
import { GraduationCap, BookOpen, School, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export function EducationSection() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'graduation':
        return <GraduationCap size={22} color="#3B82F6" />;
      case 'book':
        return <BookOpen size={22} color="#93C5FD" />;
      default:
        return <School size={22} color="#93C5FD" />;
    }
  };

  return (
    <section
      id="education"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '5rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}
    >
      <SectionHeading
        tag="Academic Path"
        title="Education &"
        highlightTitle="Foundations"
        subtitle="Chronological academic journey developing rigorous analytical thinking and specializing in Machine Learning."
      />

      <div
        style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >
        {/* Blue glowing timeline spine */}
        <div
          className="timeline-spine"
          style={{
            position: 'absolute',
            top: '20px',
            bottom: '20px',
            left: '28px',
            width: '2px',
            background: 'linear-gradient(180deg, #3B82F6 0%, #93C5FD 50%, #60A5FA 100%)',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.45)'
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem'
          }}
        >
          {EDUCATION_LIST.map((edu, index) => {
            const isCurrent = edu.status === 'Currently Pursuing';
            return (
              <ScrollReveal key={edu.id} delay={index * 0.1} distance={18}>
                <div
                  style={{
                    position: 'relative',
                    paddingLeft: '70px'
                  }}
                >
                {/* Timeline Node Ring */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '15px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isCurrent ? '#3B82F6' : '#191B20',
                    border: `2px solid ${isCurrent ? '#3B82F6' : '#93C5FD'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isCurrent
                      ? '0 0 20px #3B82F6'
                      : '0 0 10px rgba(147, 197, 253, 0.4)',
                    zIndex: 2
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: isCurrent ? '#101114' : '#93C5FD'
                    }}
                  />
                </div>

                {/* Timeline Card */}
                <GlowingCard
                  glowColor={isCurrent ? 'blue' : index === 1 ? 'light-blue' : 'gray'}
                  style={{ padding: '2rem' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {getIcon(edu.icon)}
                      </div>
                      <div>
                        <h3
                          style={{
                            margin: 0,
                            fontSize: '1.35rem',
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-heading)'
                          }}
                        >
                          {edu.institution}
                        </h3>
                        <div
                          style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: isCurrent ? '#3B82F6' : '#D1D5DB',
                            marginTop: '2px'
                          }}
                        >
                          {edu.degreeOrStage}
                        </div>
                      </div>
                    </div>

                    <NeonBadge
                      variant={isCurrent ? 'blue' : 'gray'}
                      dot={isCurrent}
                      size="sm"
                    >
                      {edu.status}
                    </NeonBadge>
                  </div>

                  {edu.specialization && (
                    <div
                      style={{
                        display: 'inline-block',
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.25)',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        color: '#93C5FD',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      Specialization: {edu.specialization}
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '1.25rem',
                      fontSize: '0.85rem',
                      color: '#9CA3AF',
                      marginBottom: '1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={15} color="#3B82F6" />
                      <span>{edu.period}</span>
                    </div>
                    {edu.location && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={15} color="#93C5FD" />
                        <span>{edu.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Highlights list */}
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    {edu.highlights.map((h, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          color: '#D1D5DB',
                          fontSize: '0.92rem',
                          lineHeight: 1.5
                        }}
                      >
                        <CheckCircle2
                          size={16}
                          color={isCurrent ? '#3B82F6' : '#93C5FD'}
                          style={{ flexShrink: 0, marginTop: '3px' }}
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </GlowingCard>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
