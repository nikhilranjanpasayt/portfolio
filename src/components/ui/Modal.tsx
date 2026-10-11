import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        backgroundColor: 'rgba(16, 17, 20, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#191B20',
          borderRadius: '18px',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(59, 130, 246, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: '#141519'
          }}
        >
          <h3
            id="modal-title"
            style={{
              margin: 0,
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#FFFFFF',
              fontFamily: 'var(--font-heading)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ color: '#3B82F6' }}>//</span> {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              color: '#9CA3AF',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.borderColor = '#3B82F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9CA3AF';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
