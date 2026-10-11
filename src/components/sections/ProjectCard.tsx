import { useState } from 'react';
import type { ProjectItem } from '../../types/portfolio';
import { GlowingCard } from '../ui/GlowingCard';
import { NeonBadge } from '../ui/NeonBadge';
import { GithubIcon } from '../ui/Icons';
import { 
  ExternalLink, 
  Info, 
  Brain, 
  Globe, 
  BarChart3, 
  Wifi, 
  Terminal, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Category icon and banner accents follow the global blue palette.
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'AI / Machine Learning':
        return {
          icon: <Brain size={26} color="#3B82F6" />,
          gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.18) 0%, rgba(147, 197, 253, 0.12) 100%)',
          borderColor: 'rgba(59, 130, 246, 0.35)',
          glowColor: 'blue' as const,
        };
      case 'Web Development':
        return {
          icon: <Globe size={26} color="#93C5FD" />,
          gradient: 'linear-gradient(135deg, rgba(147, 197, 253, 0.18) 0%, rgba(59, 130, 246, 0.12) 100%)',
          borderColor: 'rgba(147, 197, 253, 0.35)',
          glowColor: 'light-blue' as const,
        };
      case 'Data Science / Analytics':
        return {
          icon: <BarChart3 size={26} color="#60A5FA" />,
          gradient: 'linear-gradient(135deg, rgba(96, 165, 250, 0.18) 0%, rgba(59, 130, 246, 0.12) 100%)',
          borderColor: 'rgba(96, 165, 250, 0.35)',
          glowColor: 'blue' as const,
        };
      case 'IoT':
        return {
          icon: <Wifi size={26} color="#93C5FD" />,
          gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.18) 0%, rgba(147, 197, 253, 0.12) 100%)',
          borderColor: 'rgba(59, 130, 246, 0.35)',
          glowColor: 'gray' as const,
        };
      default:
        return {
          icon: <Terminal size={26} color="#93C5FD" />,
          gradient: 'linear-gradient(135deg, rgba(147, 197, 253, 0.18) 0%, rgba(25, 27, 32, 0.4) 100%)',
          borderColor: 'rgba(147, 197, 253, 0.35)',
          glowColor: 'light-blue' as const,
        };
    }
  };

  const theme = getCategoryTheme(project.category);
  const glowColor = theme.glowColor;

  const hasValidGithub = Boolean(project.githubUrl && project.githubUrl.trim().length > 0 && project.githubUrl !== '#');
  const hasValidDemo = Boolean(project.demoUrl && project.demoUrl.trim().length > 0 && project.demoUrl !== '#');

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <GlowingCard
        glowColor={glowColor}
        style={{
          padding: '1.75rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(25, 27, 32, 0.82)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          transform: isHovered
            ? 'perspective(900px) rotateX(1deg) rotateY(-1deg) translateY(-5px)'
            : 'perspective(900px) rotateX(0) rotateY(0) translateY(0)',
          outline: isHovered ? '1px solid rgba(59, 130, 246, 0.45)' : '1px solid transparent',
          outlineOffset: '-1px',
          boxShadow: isHovered
            ? '0 20px 45px rgba(0, 0, 0, 0.8), 0 0 30px rgba(59, 130, 246, 0.22)'
            : '0 10px 30px rgba(0, 0, 0, 0.5)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), outline 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div>
          {/* Card Visual Banner Header */}
          <div
            style={{
              position: 'relative',
              height: '96px',
              borderRadius: '12px',
              background: theme.gradient,
              border: `1px solid ${theme.borderColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 1.25rem',
              marginBottom: '1.25rem',
              overflow: 'hidden',
            }}
          >
            {/* Ambient Background Grid Lines */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                pointerEvents: 'none',
              }}
            />

            {/* Category Icon */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                background: 'rgba(20, 22, 27, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
              }}
            >
              {theme.icon}
            </div>

            {/* Development Status Badge */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <NeonBadge
                variant={project.statusColor}
                dot
                size="sm"
              >
                {project.status}
              </NeonBadge>
            </div>
          </div>

          {/* Category Eyebrow */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#3B82F6',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '6px',
            }}
          >
            {project.category}
          </div>

          {/* Project Title */}
          <h3
            style={{
              margin: '0 0 0.85rem 0',
              fontSize: '1.22rem',
              fontWeight: 700,
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </h3>

          {/* Short Description */}
          <p
            style={{
              color: '#9CA3AF',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              marginBottom: '1.25rem',
            }}
          >
            {project.shortDescription}
          </p>

          {/* Key Highlight Points */}
          <div
            style={{
              marginBottom: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {project.highlightPoints.slice(0, 2).map((point, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '0.82rem',
                  color: '#D1D5DB',
                  lineHeight: 1.45,
                }}
              >
                <CheckCircle2
                  size={14}
                  color="#3B82F6"
                  style={{ flexShrink: 0, marginTop: '3px' }}
                />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Tech Stack Badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '1.25rem',
            }}
          >
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#D1D5DB',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '3px 8px',
                  borderRadius: '5px',
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span
                style={{
                  background: 'rgba(59, 130, 246, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  color: '#3B82F6',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '3px 8px',
                  borderRadius: '5px',
                }}
              >
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Actions Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              gap: '10px',
            }}
          >
            {/* GitHub Link or In-Progress Indicator */}
            {hasValidGithub ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View GitHub repository for ${project.title}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  transition: 'color 0.2s ease',
                  padding: '6px 8px',
                  borderRadius: '6px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#3B82F6')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              >
                <GithubIcon size={16} /> Source Code
              </a>
            ) : (
              <span
                title="Repository currently local or in private development"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#6B7280',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'help',
                }}
              >
                <Lock size={13} /> Repo In Progress
              </span>
            )}

            {/* Right Buttons: Live Demo (if available) & Details Modal */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {hasValidDemo && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo for ${project.title}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#93C5FD',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                  }}
                >
                  Demo <ExternalLink size={13} />
                </a>
              )}

              <button
                onClick={() => onOpenDetails(project)}
                aria-label={`Open architectural details for ${project.title}`}
                style={{
                  background: 'rgba(59, 130, 246, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.35)',
                  color: '#3B82F6',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.18)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>Details</span>
                <Info size={14} />
              </button>
            </div>
          </div>
        </div>
      </GlowingCard>
    </div>
  );
}
