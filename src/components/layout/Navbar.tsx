import { useState, useEffect } from 'react';
import { Menu, X, EyeOff, Sparkles, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { useActiveSection } from '../../hooks/useActiveSection';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface NavbarProps {
  isReducedMotion: boolean;
  onToggleMotion: () => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Achievements' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ isReducedMotion, onToggleMotion }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeSection = useActiveSection(
    NAV_ITEMS.map((item) => item.id),
    'hero'
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: isReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(16, 17, 20, 0.94)' : 'rgba(16, 17, 20, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: isScrolled
          ? '1px solid rgba(59, 130, 246, 0.28)'
          : '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(59, 130, 246, 0.1)' : 'none',
      }}
    >
      <div
        className="navbar-inner"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '76px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Brand Monogram & Full Name */}
        <button
          onClick={() => scrollTo('hero')}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            textAlign: 'left',
          }}
          aria-label="Back to top"
        >
          {/* Blue monogram 'N' */}
          <div
            style={{
              position: 'relative',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))' }}
            >
              <defs>
                <linearGradient id="navBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="60%" stopColor="#93C5FD" />
                  <stop offset="100%" stopColor="#60A5FA" />
                </linearGradient>
              </defs>
              <path
                d="M10 32V8L22 26V8H28V32L16 14V32H10Z"
                fill="url(#navBlueGrad)"
              />
            </svg>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.05rem',
              letterSpacing: '0.12em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
            }}
            className="navbar-brand-name"
          >
            NIKHIL RANJAN PASAYAT
          </div>
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '8px',
          }}
          className="desktop-nav"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isActive ? '#3B82F6' : '#9CA3AF',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#9CA3AF';
                  }
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '16px',
                      right: '16px',
                      height: '2px',
                      background: 'linear-gradient(90deg, #3B82F6 0%, #93C5FD 100%)',
                      borderRadius: '2px',
                      boxShadow: '0 0 10px #3B82F6',
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Social Icons & Motion Switcher */}
        <div
          className="navbar-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          {/* GitHub Icon Link */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="navbar-social-link"
            style={{
              color: '#9CA3AF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#3B82F6';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9CA3AF';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <GithubIcon size={20} />
          </a>

          {/* LinkedIn Icon Link */}
          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="navbar-social-link"
            style={{
              color: '#9CA3AF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#3B82F6';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9CA3AF';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <LinkedinIcon size={20} />
          </a>

          {/* Email Icon Link */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Send Email"
            className="navbar-social-link"
            style={{
              color: '#9CA3AF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#3B82F6';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9CA3AF';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Mail size={20} />
          </a>

          {/* Motion Toggle Button */}
          <button
            onClick={onToggleMotion}
            title={isReducedMotion ? 'Enable 3D Motion' : 'Pause 3D Motion'}
            aria-label={isReducedMotion ? 'Enable 3D Motion' : 'Pause 3D Motion'}
            className="navbar-motion-toggle"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: isReducedMotion
                ? '1px solid rgba(156, 163, 175, 0.4)'
                : '1px solid rgba(59, 130, 246, 0.35)',
              color: isReducedMotion ? '#9CA3AF' : '#3B82F6',
              borderRadius: '8px',
              padding: '6px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.2s ease',
            }}
          >
            {isReducedMotion ? <EyeOff size={14} /> : <Sparkles size={14} />}
            <span className="motion-label-text">
              {isReducedMotion ? 'Static' : '3D'}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            className="mobile-menu-btn"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'rgba(16, 17, 20, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(59, 130, 246, 0.25)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            animation: 'slideDown 0.2s ease-out',
          }}
          className="mobile-nav-drawer"
          id="mobile-navigation"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: isActive ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
                  border: isActive
                    ? '1px solid rgba(59, 130, 246, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#3B82F6' : '#9CA3AF',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#3B82F6',
                    }}
                  >
                    [CURRENT]
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
