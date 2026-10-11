import { useState, useId } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlowingCard } from '../ui/GlowingCard';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../ui/Modal';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Settings2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export function ContactSection() {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Form field state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [deliveryMode, setDeliveryMode] = useState<'mailto' | 'formspree'>('mailto');
  const [formspreeEndpoint, setFormspreeEndpoint] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  // Copy email to clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    showToast(`Copied ${PERSONAL_INFO.email} to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      errors.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the errors in the form.', 'error');
      return;
    }

    if (deliveryMode === 'mailto') {
      const encodedSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
      const encodedBody = encodeURIComponent(
        `Hi Nikhil,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`
      );
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodedSubject}&body=${encodedBody}`;

      window.open(mailtoUrl, '_blank');
      showToast('Opening your default email app with your message pre-filled!', 'success');
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      if (!formspreeEndpoint) {
        setShowConfigModal(true);
        showToast('Please set your Formspree or API endpoint in the configuration.', 'info');
        return;
      }

      setIsSubmitting(true);
      try {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          showToast('Message sent directly to Nikhil!', 'success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          showToast('Endpoint responded with an error. Please verify the URL.', 'error');
        }
      } catch {
        showToast('Network error while dispatching message. Check your endpoint.', 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '5rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto',
      }}
    >
      <SectionHeading
        tag="Transmit Message"
        title="Let's Connect &"
        highlightTitle="Collaborate"
        subtitle="Open for internships, project inquiries, and technology discussions. Reach out via direct channels or send a message below."
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Direct Contact Info & Socials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Quick Copy Email Card */}
          <GlowingCard glowColor="blue" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(59, 130, 246, 0.12)',
                  border: '1px solid rgba(59, 130, 246, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3B82F6',
                }}
              >
                <Mail size={22} />
              </div>
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: '1.2rem',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  Direct Email
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>
                  Primary Communication
                </div>
              </div>
            </div>

            <p style={{ color: '#D1D5DB', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Feel free to send an email for collaboration, project proposals, or academic opportunities.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(59, 130, 246, 0.28)',
                borderRadius: '10px',
                padding: '10px 14px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  color: '#3B82F6',
                  wordBreak: 'break-all',
                }}
              >
                {PERSONAL_INFO.email}
              </span>

              <button
                onClick={handleCopyEmail}
                style={{
                  background: copied ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)',
                  border: `1px solid ${copied ? '#3B82F6' : '#3B82F6'}`,
                  color: copied ? '#3B82F6' : '#3B82F6',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </GlowingCard>

          {/* Social Profiles Card */}
          <GlowingCard glowColor="light-blue" style={{ padding: '2rem' }}>
            <h3
              style={{
                margin: '0 0 1rem 0',
                fontSize: '1.2rem',
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Online Networks
            </h3>
            <p style={{ color: '#9CA3AF', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Explore active repositories, commit histories, and professional updates.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3B82F6';
                  e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <GithubIcon size={18} color="#3B82F6" />
                  <span>GitHub (@nikhilranjanpasayt)</span>
                </div>
                <ExternalLink size={15} color="#9CA3AF" />
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#93C5FD';
                  e.currentTarget.style.backgroundColor = 'rgba(147, 197, 253, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <LinkedinIcon size={18} color="#93C5FD" />
                  <span>LinkedIn (Nikhil Ranjan Pasayat)</span>
                </div>
                <ExternalLink size={15} color="#9CA3AF" />
              </a>
            </div>
          </GlowingCard>
        </div>

        {/* Right Column: Functional Message Dispatch Form */}
        <GlowingCard glowColor="blue" style={{ padding: '2.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.3rem',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Send Message
              </h3>
              <div style={{ fontSize: '0.8rem', color: '#9CA3AF', fontFamily: 'var(--font-mono)' }}>
                Channel: {deliveryMode === 'mailto' ? 'Direct Mail Client' : 'Configured API'}
              </div>
            </div>

            {/* Mode configuration button */}
            <button
              onClick={() => setShowConfigModal(true)}
              title="Form Delivery Settings"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#9CA3AF',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Settings2 size={14} /> Setup Mode
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Name */}
            <div>
              <label
                htmlFor={nameId}
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  color: '#D1D5DB',
                  marginBottom: '6px',
                  fontWeight: 500,
                }}
              >
                Your Name <span style={{ color: '#3B82F6' }}>*</span>
              </label>
              <input
                id={nameId}
                type="text"
                placeholder="e.g. Recruiter / Collaborator"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${formErrors.name ? '#9CA3AF' : 'rgba(255, 255, 255, 0.12)'}`,
                  borderRadius: '10px',
                  padding: '12px 14px',
                  color: '#FFFFFF',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#3B82F6')}
                onBlur={(e) =>
                  (e.target.style.borderColor = formErrors.name ? '#9CA3AF' : 'rgba(255, 255, 255, 0.12)')
                }
              />
              {formErrors.name && (
                <div style={{ color: '#9CA3AF', fontSize: '0.78rem', marginTop: '4px' }}>
                  {formErrors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor={emailId}
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  color: '#D1D5DB',
                  marginBottom: '6px',
                  fontWeight: 500,
                }}
              >
                Your Email Address <span style={{ color: '#3B82F6' }}>*</span>
              </label>
              <input
                id={emailId}
                type="email"
                placeholder="e.g. contact@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${formErrors.email ? '#9CA3AF' : 'rgba(255, 255, 255, 0.12)'}`,
                  borderRadius: '10px',
                  padding: '12px 14px',
                  color: '#FFFFFF',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#3B82F6')}
                onBlur={(e) =>
                  (e.target.style.borderColor = formErrors.email ? '#9CA3AF' : 'rgba(255, 255, 255, 0.12)')
                }
              />
              {formErrors.email && (
                <div style={{ color: '#9CA3AF', fontSize: '0.78rem', marginTop: '4px' }}>
                  {formErrors.email}
                </div>
              )}
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor={subjectId}
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  color: '#D1D5DB',
                  marginBottom: '6px',
                  fontWeight: 500,
                }}
              >
                Subject <span style={{ color: '#3B82F6' }}>*</span>
              </label>
              <input
                id={subjectId}
                type="text"
                placeholder="e.g. Internship Inquiry / Software Development Project"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${formErrors.subject ? '#9CA3AF' : 'rgba(255, 255, 255, 0.12)'}`,
                  borderRadius: '10px',
                  padding: '12px 14px',
                  color: '#FFFFFF',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#3B82F6')}
                onBlur={(e) =>
                  (e.target.style.borderColor = formErrors.subject ? '#9CA3AF' : 'rgba(255, 255, 255, 0.12)')
                }
              />
              {formErrors.subject && (
                <div style={{ color: '#9CA3AF', fontSize: '0.78rem', marginTop: '4px' }}>
                  {formErrors.subject}
                </div>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor={messageId}
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  color: '#D1D5DB',
                  marginBottom: '6px',
                  fontWeight: 500,
                }}
              >
                Message <span style={{ color: '#3B82F6' }}>*</span>
              </label>
              <textarea
                id={messageId}
                rows={4}
                placeholder="Share opportunity details, project scopes, or questions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${formErrors.message ? '#9CA3AF' : 'rgba(255, 255, 255, 0.12)'}`,
                  borderRadius: '10px',
                  padding: '12px 14px',
                  color: '#FFFFFF',
                  fontSize: '0.92rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#3B82F6')}
                onBlur={(e) =>
                  (e.target.style.borderColor = formErrors.message ? '#9CA3AF' : 'rgba(255, 255, 255, 0.12)')
                }
              />
              {formErrors.message && (
                <div style={{ color: '#9CA3AF', fontSize: '0.78rem', marginTop: '4px' }}>
                  {formErrors.message}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="contact-submit-btn"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                padding: '14px 24px',
                borderRadius: '10px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 25px rgba(59, 130, 246, 0.35)',
                transition: 'all 0.2s ease',
                opacity: isSubmitting ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(59, 130, 246, 0.55)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(59, 130, 246, 0.35)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <Send size={16} />
              <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Message'}</span>
            </button>
          </form>
        </GlowingCard>
      </div>

      {/* Contact Mode Configuration Modal */}
      {showConfigModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowConfigModal(false)}
          title="Contact Channel Architecture"
        >
          <div>
            <p style={{ color: '#D1D5DB', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Select how incoming transmissions are dispatched to Nikhil:
            </p>

            {/* Mode selection radio group */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '10px',
                  background: deliveryMode === 'mailto' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${deliveryMode === 'mailto' ? '#3B82F6' : 'rgba(255, 255, 255, 0.08)'}`,
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="deliveryMode"
                  checked={deliveryMode === 'mailto'}
                  onChange={() => setDeliveryMode('mailto')}
                  style={{ marginTop: '3px' }}
                />
                <div>
                  <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.9rem' }}>
                    Direct Mail Client (Recommended // Default)
                  </div>
                  <div style={{ color: '#9CA3AF', fontSize: '0.82rem', lineHeight: 1.4, marginTop: '2px' }}>
                    Opens the visitor's email client pre-populated to <code style={{ color: '#3B82F6' }}>{PERSONAL_INFO.email}</code>. Guaranteed zero lost messages.
                  </div>
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '10px',
                  background: deliveryMode === 'formspree' ? 'rgba(147, 197, 253, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${deliveryMode === 'formspree' ? '#93C5FD' : 'rgba(255, 255, 255, 0.08)'}`,
                  cursor: 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="deliveryMode"
                  checked={deliveryMode === 'formspree'}
                  onChange={() => setDeliveryMode('formspree')}
                  style={{ marginTop: '3px' }}
                />
                <div>
                  <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.9rem' }}>
                    Formspree / Custom API Endpoint
                  </div>
                  <div style={{ color: '#9CA3AF', fontSize: '0.82rem', lineHeight: 1.4, marginTop: '2px' }}>
                    Submits directly via AJAX POST request to your Formspree endpoint (e.g. <code>https://formspree.io/f/YOUR_FORM_ID</code>).
                  </div>
                </div>
              </label>
            </div>

            {deliveryMode === 'formspree' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#D1D5DB', marginBottom: '6px' }}>
                  Your Endpoint URL:
                </label>
                <input
                  type="url"
                  placeholder="https://formspree.io/f/xyz..."
                  value={formspreeEndpoint}
                  onChange={(e) => setFormspreeEndpoint(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.4)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#FFFFFF',
                    fontSize: '0.88rem',
                  }}
                />
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => {
                  setShowConfigModal(false);
                  showToast(`Delivery channel updated to: ${deliveryMode === 'mailto' ? 'Mail Client' : 'API Endpoint'}`, 'success');
                }}
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
                }}
              >
                <Sparkles size={15} /> Save & Apply
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
