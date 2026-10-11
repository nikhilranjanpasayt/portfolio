interface SectionHeadingProps {
  tag: string;
  title: string;
  highlightTitle?: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  tag,
  title,
  highlightTitle,
  subtitle,
  align = 'center'
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className="section-heading-container"
      style={{
        textAlign: isCenter ? 'center' : 'left',
        marginBottom: '3.5rem',
        position: 'relative'
      }}
    >
      {/* Blue cyber tag */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '0.75rem'
        }}
      >
        <span
          style={{
            height: '2px',
            width: '20px',
            background: 'linear-gradient(90deg, #3B82F6, transparent)',
            display: isCenter ? 'none' : 'inline-block'
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#3B82F6',
            fontWeight: 600,
            background: 'rgba(59, 130, 246, 0.08)',
            padding: '4px 12px',
            borderRadius: '4px',
            border: '1px solid rgba(59, 130, 246, 0.28)'
          }}
        >
          // {tag}
        </span>
      </div>

      {/* Main Title */}
      <h2
        style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          color: '#FFFFFF',
          margin: '0.5rem 0',
          fontFamily: 'var(--font-heading)'
        }}
      >
        {title}{' '}
        {highlightTitle && (
          <span
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #93C5FD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            {highlightTitle}
          </span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{
            fontSize: '1.05rem',
            color: '#9CA3AF',
            maxWidth: '650px',
            margin: isCenter ? '0.75rem auto 0' : '0.75rem 0 0',
            lineHeight: 1.6
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Centered Futuristic Underline */}
      {isCenter && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '1.25rem'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #3B82F6)'
            }}
          />
          <div
            style={{
              width: '8px',
              height: '8px',
              background: '#3B82F6',
              transform: 'rotate(45deg)',
              boxShadow: '0 0 8px #3B82F6'
            }}
          />
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'linear-gradient(90deg, #3B82F6, transparent)'
            }}
          />
        </div>
      )}
    </div>
  );
}
