import { useState, useEffect, useRef } from 'react';

export default function QuoteModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    descricao: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Bloquear scroll do body quando aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus no primeiro input após animação
      setTimeout(() => firstInputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Fechar com Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Fechar ao clicar no overlay
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Formatar WhatsApp
  const formatWhatsApp = (value) => {
    const nums = value.replace(/\D/g, '').slice(0, 11);
    if (nums.length <= 2) return `(${nums}`;
    if (nums.length <= 7) return `(${nums.slice(0,2)}) ${nums.slice(2)}`;
    return `(${nums.slice(0,2)}) ${nums.slice(2,7)}-${nums.slice(7)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'whatsapp') {
      setFormData(prev => ({ ...prev, [name]: formatWhatsApp(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Reset após 3s e fecha
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nome: '', whatsapp: '', email: '', descricao: '' });
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="quote-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Solicitar orçamento"
    >
      <div className="quote-modal" ref={modalRef}>
        {/* Efeitos visuais de fundo */}
        <div className="quote-modal-glow" aria-hidden="true" />
        <div className="quote-modal-grid" aria-hidden="true" />

        {/* Botão fechar */}
        <button className="quote-close" onClick={onClose} aria-label="Fechar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="quote-header">
              <span className="eyebrow">Orçamento rápido</span>
              <h3 style={{ marginTop: '16px', fontSize: 'clamp(24px, 3vw, 32px)' }}>
                Solicite seu <span className="grad-text-orange">orçamento</span>
              </h3>
              <p style={{ marginTop: '10px', fontSize: '15px' }}>
                Preencha os dados abaixo e retornamos em até 24h com sua proposta.
              </p>
            </div>

            {/* Form */}
            <form className="quote-form" onSubmit={handleSubmit}>
              <div className="quote-field">
                <label htmlFor="quote-nome">Seu nome</label>
                <input
                  ref={firstInputRef}
                  id="quote-nome"
                  type="text"
                  name="nome"
                  placeholder="Como podemos te chamar?"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="quote-row">
                <div className="quote-field">
                  <label htmlFor="quote-whatsapp">WhatsApp</label>
                  <div className="quote-input-icon">
                    <svg className="quote-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.212L4 20l1.212-3.757A8 8 0 1112 20z" />
                    </svg>
                    <input
                      id="quote-whatsapp"
                      type="tel"
                      name="whatsapp"
                      placeholder="(19) 99999-9999"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="quote-field">
                  <label htmlFor="quote-email">E-mail</label>
                  <div className="quote-input-icon">
                    <svg className="quote-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <input
                      id="quote-email"
                      type="email"
                      name="email"
                      placeholder="nome@empresa.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="quote-field">
                <label htmlFor="quote-descricao">Descreva sua etiqueta</label>
                <textarea
                  id="quote-descricao"
                  name="descricao"
                  placeholder="Ex.: Preciso de rótulos adesivos para garrafas de cerveja artesanal, com acabamento fosco e hot stamping dourado. Tiragem de 5.000 unidades..."
                  value={formData.descricao}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>

              <button type="submit" className="quote-submit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 11 13" />
                  <path d="m22 2-7 20-4-9-9-4 20-7z" />
                </svg>
                Enviar solicitação
              </button>
            </form>
          </>
        ) : (
          /* Estado de sucesso */
          <div className="quote-success">
            <div className="quote-success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 style={{ marginTop: '20px', fontSize: '26px' }}>
              Solicitação <span className="grad-text">enviada!</span>
            </h3>
            <p style={{ marginTop: '12px', fontSize: '15px', maxWidth: '36ch', marginInline: 'auto' }}>
              Nosso time técnico vai analisar e retornar com a proposta em até <strong style={{ color: 'var(--brand-cyan)' }}>24 horas</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
