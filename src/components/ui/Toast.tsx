import { useState, useCallback, type ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastContext } from '../../context/ToastContext';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div
        aria-live="polite"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          pointerEvents: 'none'
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              pointerEvents: 'auto',
              minWidth: '280px',
              maxWidth: '380px',
              background: '#191B20',
              border: `1px solid ${
                t.type === 'success'
                  ? 'rgba(59, 130, 246, 0.45)'
                  : t.type === 'error'
                  ? 'rgba(156, 163, 175, 0.45)'
                  : 'rgba(147, 197, 253, 0.45)'
              }`,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), 0 0 15px rgba(59, 130, 246, 0.15)',
              borderRadius: '12px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#FFFFFF',
              fontSize: '0.9rem',
              animation: 'slideUp 0.25s ease-out'
            }}
          >
            {t.type === 'success' && <CheckCircle2 size={18} color="#3B82F6" />}
            {t.type === 'error' && <AlertCircle size={18} color="#9CA3AF" />}
            {t.type === 'info' && <Info size={18} color="#93C5FD" />}
            <span style={{ flex: 1, lineHeight: 1.4 }}>{t.message}</span>
            <button
              onClick={() => removeToast(t.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#6B7280',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
