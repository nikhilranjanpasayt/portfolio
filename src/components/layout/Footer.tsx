import { ArrowUp, Terminal, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { PERSONAL_INFO } from '../../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#141519',
        borderTop: '1px solid rgba(59, 130, 246, 0.22)',
        padding: '3.5rem 1.5rem 2.5rem',
        marginTop: '6rem',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Brand Column */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3B82F6',
              }}
            >
              <Terminal size={17} />
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: '1.2rem',
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Nikhil Ranjan Pasayat
            </h3>
          </div>

          <p
            style={{
              color: '#9CA3AF',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              marginBottom: '1.25rem',
            }}
          >
            Building intelligent software systems, machine learning architectures, and modern web applications with precision and curiosity.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 10px',
              borderRadius: '9999px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#93C5FD',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#3B82F6',
                boxShadow: '0 0 6px #3B82F6',
              }}
            />
            Available for Internships & Projects
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4
            style={{
              color: '#FFFFFF',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Navigation
          </h4>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {[
              { label: 'About Experience', href: '#about' },
              { label: 'Academic Education', href: '#education' },
              { label: 'Technical Skills', href: '#skills' },
              { label: 'Featured Projects', href: '#projects' },
              { label: 'Resume & Credentials', href: '#resume' },
              { label: 'Contact Channel', href: '#contact' },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    color: '#9CA3AF',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#3B82F6')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect & Socials */}
        <div>
          <h4
            style={{
              color: '#FFFFFF',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Connect Online
          </h4>
          <p
            style={{
              color: '#9CA3AF',
              fontSize: '0.88rem',
              lineHeight: 1.5,
              marginBottom: '1rem',
            }}
          >
            Explore my source repositories on GitHub or connect with me professionally on LinkedIn.
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3B82F6';
                e.currentTarget.style.color = '#3B82F6';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <GithubIcon size={18} />
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#93C5FD';
                e.currentTarget.style.color = '#93C5FD';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          paddingTop: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.82rem',
          color: '#6B7280',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <div>
          © {new Date().getFullYear()} Nikhil Ranjan Pasayat. All rights reserved.
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          Crafted with React 19, Three.js, R3F & Vite <Heart size={12} color="#3B82F6" fill="#3B82F6" />
        </div>

        <button
          onClick={scrollToTop}
          style={{
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#3B82F6',
            borderRadius: '6px',
            padding: '5px 10px',
            fontSize: '0.78rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Top <ArrowUp size={12} />
        </button>
      </div>
    </footer>
  );
}
