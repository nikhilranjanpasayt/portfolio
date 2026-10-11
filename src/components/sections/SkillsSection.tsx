import { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlowingCard } from '../ui/GlowingCard';
import { NeonBadge } from '../ui/NeonBadge';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SKILLS_LIST } from '../../data/portfolioData';
import type { SkillCategory } from '../../types/portfolio';
import { Terminal, Code, Database, Brain, Sparkles } from 'lucide-react';

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: { label: string; icon: React.ReactNode }[] = [
    { label: 'All', icon: <Sparkles size={15} /> },
    { label: 'Languages', icon: <Terminal size={15} /> },
    { label: 'Web & Frontend', icon: <Code size={15} /> },
    { label: 'Database', icon: <Database size={15} /> },
    { label: 'AI & ML', icon: <Brain size={15} /> }
  ];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_LIST
    : SKILLS_LIST.filter((s) => s.category === (selectedCategory as SkillCategory));

  return (
    <section
      id="skills"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '5rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}
    >
      <SectionHeading
        tag="Core Competencies"
        title="Technical Stack &"
        highlightTitle="Tooling"
        subtitle="Foundational programming languages, relational data management, and cutting-edge artificial intelligence frameworks."
      />

      {/* Filter tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '3rem'
        }}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.label)}
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.22), rgba(147, 197, 253, 0.15))'
                  : 'rgba(25, 27, 32, 0.8)',
                border: isSelected
                  ? '1px solid #3B82F6'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                color: isSelected ? '#3B82F6' : '#9CA3AF',
                boxShadow: isSelected ? '0 0 15px rgba(59, 130, 246, 0.25)' : 'none',
                padding: '9px 18px',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-heading)'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                  e.currentTarget.style.background = 'rgba(25, 27, 32, 0.95)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.color = '#9CA3AF';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.background = 'rgba(25, 27, 32, 0.8)';
                }
              }}
            >
              {cat.icon}
              <span>{cat.label}</span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: isSelected ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                  color: isSelected ? '#FFFFFF' : '#6B7280'
                }}
              >
                {cat.label === 'All'
                  ? SKILLS_LIST.length
                  : SKILLS_LIST.filter((s) => s.category === cat.label).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {filteredSkills.map((skill, index) => {
          const isAI = skill.category === 'AI & ML';
          const isLang = skill.category === 'Languages';
          const isDB = skill.category === 'Database';
          const badgeVariant = isAI ? 'blue' : isLang ? 'light-blue' : isDB ? 'gray' : 'blue';

          return (
            <ScrollReveal key={skill.name} delay={index * 0.04} distance={16} style={{ height: '100%' }}>
              <GlowingCard
                glowColor={isAI ? 'blue' : isLang ? 'light-blue' : 'gray'}
                style={{ padding: '1.5rem', height: '100%' }}
              >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(59, 130, 246, 0.08)',
                      border: '1px solid rgba(59, 130, 246, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isAI ? '#3B82F6' : isLang ? '#93C5FD' : '#93C5FD',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem'
                    }}
                  >
                    {skill.name.substring(0, 2)}
                  </div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-heading)'
                    }}
                  >
                    {skill.name}
                  </h4>
                </div>

                <NeonBadge variant={badgeVariant} size="sm">
                  {skill.badge}
                </NeonBadge>
              </div>

              {/* Category label & proficiency percentage */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.82rem',
                  color: '#9CA3AF',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '8px'
                }}
              >
                <span>{skill.category}</span>
                <span style={{ color: isAI ? '#3B82F6' : '#93C5FD', fontWeight: 600 }}>
                  {skill.level}%
                </span>
              </div>

              {/* Animated Progress Meter */}
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: `${skill.level}%`,
                    height: '100%',
                    background: isAI
                      ? 'linear-gradient(90deg, #3B82F6, #93C5FD)'
                      : isLang
                      ? 'linear-gradient(90deg, #1D4ED8, #60A5FA)'
                      : 'linear-gradient(90deg, #1D4ED8, #93C5FD)',
                    borderRadius: '9999px',
                    boxShadow: isAI
                      ? '0 0 10px rgba(59, 130, 246, 0.6)'
                      : '0 0 10px rgba(147, 197, 253, 0.6)',
                    transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              </div>
              </GlowingCard>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
