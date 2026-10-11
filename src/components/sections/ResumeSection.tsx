import { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlowingCard } from '../ui/GlowingCard';
import { NeonBadge } from '../ui/NeonBadge';
import { Modal } from '../ui/Modal';
import { useToast } from '../../context/ToastContext';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  GraduationCap, 
  Code, 
  Info 
} from 'lucide-react';

interface ResumeSectionProps {
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

export function ResumeSection({ isModalOpen = false, onCloseModal }: ResumeSectionProps) {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const { showToast } = useToast();

  const handleDownload = () => {
    // Verified download of public/Nikhil_Ranjan_Pasayat_Resume.pdf
    const link = document.createElement('a');
    link.href = '/Nikhil_Ranjan_Pasayat_Resume.pdf';
    link.download = 'Nikhil_Ranjan_Pasayat_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Resume downloaded successfully: Nikhil_Ranjan_Pasayat_Resume.pdf', 'success');
  };

  return (
    <section
      id="resume"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '5rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto'
      }}
    >
      <SectionHeading
        tag="Curriculum Vitae"
        title="Resume &"
        highlightTitle="Credentials"
        subtitle="Comprehensive technical background, educational timeline, and core project competencies."
      />

      <GlowingCard glowColor="blue" style={{ padding: '2.5rem', maxWidth: '960px', margin: '0 auto' }}>
        {/* Top Header Card */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 197, 253, 0.2))',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3B82F6'
              }}
            >
              <FileText size={28} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '1.4rem',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  {PERSONAL_INFO.name}
                </h3>
                <NeonBadge variant="blue" size="sm">Available</NeonBadge>
              </div>

              <div
                style={{
                  fontSize: '0.88rem',
                  color: '#93C5FD',
                  fontFamily: 'var(--font-mono)',
                  marginTop: '2px'
                }}
              >
                {PERSONAL_INFO.role} • {PERSONAL_INFO.specialization}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={handleDownload}
              id="resume-section-download-btn"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.92rem',
                padding: '12px 24px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.35)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.35)';
              }}
            >
              <Download size={17} /> Download PDF
            </button>

            <button
              onClick={() => setShowConfigModal(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#9CA3AF',
                borderRadius: '10px',
                padding: '12px 16px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9CA3AF';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <Info size={15} /> File Setup Guide
            </button>
          </div>
        </div>

        {/* Resume Preview Highlights Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem',
            paddingTop: '2rem'
          }}
        >
          {/* Column 1: Academic Background */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <GraduationCap size={18} color="#3B82F6" />
              <h4 style={{ margin: 0, color: '#FFFFFF', fontSize: '1rem', fontFamily: 'var(--font-heading)' }}>
                Academic Milestones
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontWeight: 600, color: '#D1D5DB' }}>B.Tech CSE (AI & ML)</div>
                <div style={{ color: '#3B82F6', fontSize: '0.8rem' }}>GIET University, Gunupur (2023–Present)</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontWeight: 600, color: '#D1D5DB' }}>Higher Secondary (Science)</div>
                <div style={{ color: '#93C5FD', fontSize: '0.8rem' }}>Deepika English Medium School</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontWeight: 600, color: '#D1D5DB' }}>Matriculation (Class X)</div>
                <div style={{ color: '#93C5FD', fontSize: '0.8rem' }}>Pragati Public School</div>
              </div>
            </div>
          </div>

          {/* Column 2: Key Skills */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <Code size={18} color="#93C5FD" />
              <h4 style={{ margin: 0, color: '#FFFFFF', fontSize: '1rem', fontFamily: 'var(--font-heading)' }}>
                Core Proficiency
              </h4>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                'Python', 'Machine Learning', 'Artificial Intelligence',
                'C', 'Java', 'JavaScript', 'HTML/CSS',
                'SQL', 'DBMS', 'PHP', 'Bootstrap'
              ].map((skill) => (
                <span
                  key={skill}
                  style={{
                    background: 'rgba(59, 130, 246, 0.08)',
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Column 3: Ready for roles */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <CheckCircle2 size={18} color="#93C5FD" />
              <h4 style={{ margin: 0, color: '#FFFFFF', fontSize: '1rem', fontFamily: 'var(--font-heading)' }}>
                Target Profiles
              </h4>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem', color: '#9CA3AF' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#3B82F6' }}>✓</span> AI & Machine Learning Engineering Intern
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#3B82F6' }}>✓</span> Junior Software / Full-Stack Developer
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#3B82F6' }}>✓</span> Computer Vision & Intelligent Systems
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#3B82F6' }}>✓</span> IoT & Smart Edge Node Prototyping
              </li>
            </ul>
          </div>
        </div>
      </GlowingCard>

      {/* Configuration / Setup Guide Modal */}
      {(showConfigModal || isModalOpen) && (
        <Modal
          isOpen={true}
          onClose={() => {
            setShowConfigModal(false);
            if (onCloseModal) onCloseModal();
          }}
          title="Resume Download & Setup"
        >
          <div>
            <p style={{ color: '#D1D5DB', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              This button directly delivers your personal resume PDF to recruiters and visitors.
            </p>

            <div
              style={{
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                borderRadius: '10px',
                padding: '1rem',
                marginBottom: '1.25rem'
              }}
            >
              <div style={{ fontWeight: 600, color: '#3B82F6', marginBottom: '6px', fontSize: '0.9rem' }}>
                How to link your own updated PDF:
              </div>
              <ol style={{ paddingLeft: '1.25rem', margin: 0, color: '#9CA3AF', fontSize: '0.85rem', lineHeight: 1.6 }}>
                <li>Export your resume as a PDF file.</li>
                <li>Save it into this project's <code style={{ color: '#FFFFFF' }}>public/</code> directory as <code style={{ color: '#3B82F6' }}>Nikhil_Ranjan_Pasayat_Resume.pdf</code>.</li>
                <li>The download button will immediately serve your latest document!</li>
              </ol>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={handleDownload}
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 0 15px rgba(59, 130, 246, 0.35)',
                }}
              >
                <Download size={15} /> Download Current File
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
