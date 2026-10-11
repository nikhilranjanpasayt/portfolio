import { useState, useCallback } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { NeonBadge } from '../ui/NeonBadge';
import { Modal } from '../ui/Modal';
import { GithubIcon } from '../ui/Icons';
import { ProjectCard } from './ProjectCard';
import { ScrollReveal } from '../ui/ScrollReveal';
import { PROJECTS_DATA, PROJECT_CATEGORIES } from '../../data/projects';
import type { ProjectItem, ProjectCategory } from '../../types/portfolio';
import {
  ExternalLink,
  Sparkles,
  CheckCircle,
  Tag,
  Layers,
  Search,
  RotateCcw,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, string> = {
  'All Projects': '◈',
  'AI / Machine Learning': '⬡',
  'Web Development': '◎',
  'Data Science / Analytics': '◉',
  'IoT': '⟁',
  'Other': '◇',
};

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All Projects');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  const filteredProjects =
    selectedCategory === 'All Projects'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const handleCategoryChange = useCallback((cat: ProjectCategory) => {
    setSelectedCategory(cat);
  }, []);

  const handleOpenDetails = useCallback((project: ProjectItem) => {
    setActiveProjectModal(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveProjectModal(null);
  }, []);

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '6rem 1.5rem',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      <SectionHeading
        tag="Engineering Work"
        title="Featured Systems &"
        highlightTitle="Innovations"
        subtitle="Data-driven projects developed with machine learning, smart telemetry, and scalable full-stack code."
      />

      {/* Category Filter Bar */}
      <div
        role="group"
        aria-label="Filter projects by category"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '1.25rem',
        }}
      >
        {PROJECT_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          const count =
            cat === 'All Projects'
              ? PROJECTS_DATA.length
              : PROJECTS_DATA.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              aria-pressed={isActive}
              aria-label={`Show ${cat} projects (${count})`}
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.22), rgba(147, 197, 253, 0.15))'
                  : 'rgba(25, 27, 32, 0.8)',
                border: isActive
                  ? '1px solid rgba(59, 130, 246, 0.6)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                color: isActive ? '#3B82F6' : '#9CA3AF',
                boxShadow: isActive
                  ? '0 0 18px rgba(59, 130, 246, 0.25), inset 0 0 10px rgba(59, 130, 246, 0.08)'
                  : 'none',
                padding: '9px 18px',
                borderRadius: '12px',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.35)';
                  e.currentTarget.style.background = 'rgba(25, 27, 32, 0.95)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#9CA3AF';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.background = 'rgba(25, 27, 32, 0.8)';
                }
              }}
            >
              <span
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1,
                  opacity: isActive ? 1 : 0.6,
                }}
                aria-hidden="true"
              >
                {CATEGORY_ICONS[cat] ?? '◈'}
              </span>
              <span>{cat}</span>
              {/* Count badge */}
              <span
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 6px',
                  borderRadius: '5px',
                  background: isActive
                    ? 'rgba(59, 130, 246, 0.25)'
                    : 'rgba(255, 255, 255, 0.06)',
                  color: isActive ? '#FFFFFF' : '#6B7280',
                  minWidth: '20px',
                  textAlign: 'center',
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Result Count */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '3rem',
          color: '#6B7280',
          fontSize: '0.82rem',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <Search size={13} />
        <span>
          Showing{' '}
          <span style={{ color: '#3B82F6', fontWeight: 600 }}>
            {filteredProjects.length}
          </span>{' '}
          {filteredProjects.length === 1 ? 'project' : 'projects'}
          {selectedCategory !== 'All Projects' && (
            <>
              {' '}in{' '}
              <span style={{ color: '#93C5FD' }}>{selectedCategory}</span>
            </>
          )}
        </span>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
          }}
        >
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.06} distance={18} style={{ height: '100%' }}>
              <ProjectCard
                project={project}
                onOpenDetails={handleOpenDetails}
              />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5rem 2rem',
            gap: '1.25rem',
            background: 'rgba(25, 27, 32, 0.5)',
            border: '1px dashed rgba(59, 130, 246, 0.25)',
            borderRadius: '20px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Layers size={28} color="#3B82F6" strokeWidth={1.5} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                color: '#FFFFFF',
                fontSize: '1.05rem',
                fontWeight: 600,
                marginBottom: '6px',
              }}
            >
              No projects in this category yet
            </p>
            <p style={{ color: '#9CA3AF', fontSize: '0.88rem' }}>
              Projects in <span style={{ color: '#93C5FD' }}>{selectedCategory}</span> will appear here as they are added.
            </p>
          </div>
          <button
            onClick={() => handleCategoryChange('All Projects')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.35)',
              color: '#3B82F6',
              padding: '9px 18px',
              borderRadius: '10px',
              fontSize: '0.86rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.16)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)';
            }}
          >
            <RotateCcw size={14} />
            Reset Filter
          </button>
        </div>
      )}

      {/* Deep-Dive Project Modal */}
      {activeProjectModal && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title={activeProjectModal.title}
        >
          <div>
            {/* Status + Category Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '1.25rem',
                flexWrap: 'wrap',
              }}
            >
              <NeonBadge
                variant={activeProjectModal.statusColor}
                dot
              >
                {activeProjectModal.status}
              </NeonBadge>
              <span
                style={{
                  color: '#3B82F6',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  background: 'rgba(59, 130, 246, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  padding: '3px 8px',
                  borderRadius: '5px',
                }}
              >
                {activeProjectModal.category}
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                color: '#D1D5DB',
                fontSize: '0.95rem',
                lineHeight: 1.75,
                marginBottom: '1.5rem',
              }}
            >
              {activeProjectModal.shortDescription}
            </p>

            {/* Highlight Points */}
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '0.95rem',
                margin: '0 0 0.75rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-heading)',
              }}
            >
              <Sparkles size={16} color="#3B82F6" />
              Architectural Highlights
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 1.75rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {activeProjectModal.highlightPoints.map((point, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    color: '#9CA3AF',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                  }}
                >
                  <CheckCircle
                    size={15}
                    color="#3B82F6"
                    style={{ flexShrink: 0, marginTop: '3px' }}
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Tech Stack */}
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '0.95rem',
                margin: '0 0 0.75rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-heading)',
              }}
            >
              <Tag size={16} color="#93C5FD" />
              Integrated Technologies
            </h4>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '2rem',
              }}
            >
              {activeProjectModal.technologies.map((t) => (
                <span
                  key={t}
                  style={{
                    background: 'rgba(59, 130, 246, 0.08)',
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    color: '#93C5FD',
                    fontSize: '0.8rem',
                    padding: '4px 11px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {activeProjectModal.demoUrl && (
                <a
                  href={activeProjectModal.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo for ${activeProjectModal.title}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    background: 'rgba(59, 130, 246, 0.12)',
                    border: '1px solid rgba(59, 130, 246, 0.35)',
                    color: '#93C5FD',
                    padding: '10px 18px',
                    borderRadius: '9px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.22)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.12)';
                  }}
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}

              {activeProjectModal.githubUrl ? (
                <a
                  href={activeProjectModal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View GitHub repository for ${activeProjectModal.title}`}
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #93C5FD 100%)',
                    color: '#101114',
                    padding: '10px 20px',
                    borderRadius: '9px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    boxShadow: '0 0 15px rgba(59, 130, 246, 0.35)',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <GithubIcon size={16} />
                  View on GitHub
                  <ExternalLink size={13} />
                </a>
              ) : (
                <span
                  title="Repository currently local or in private development"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    color: '#6B7280',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '10px 16px',
                    borderRadius: '9px',
                    cursor: 'help',
                  }}
                >
                  🔒 Repo In Progress
                </span>
              )}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
