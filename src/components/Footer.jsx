export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        {/* ── Layout principal: Conteúdo à esquerda | Mapa à direita ── */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '48px', 
          alignItems: 'stretch' 
        }}>
          
          {/* ─── COLUNA ESQUERDA: Logo + Links ─── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* Logo + Tagline */}
            <div>
              <a className="logo" href="#top" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <img src="/images/Logo.png" alt="Global Label" style={{ height: '110px', width: 'auto' }} />
              </a>
              <p style={{ marginTop: '16px', maxWidth: '380px', color: 'var(--fg-dim)', lineHeight: 1.7, fontSize: '14px' }}>
                Rótulos adesivos e etiquetas de alta fidelidade para marcas que competem no centímetro quadrado.
              </p>
            </div>
            
            {/* Grid de links */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              <div className="foot-col">
                <h4>Navegação</h4>
                <a href="#top">Home</a>
                <a href="#about">Quem somos</a>
                <a href="#products">Produtos &amp; serviços</a>
                <a href="#quality">Processos de qualidade</a>
              </div>
              <div className="foot-col">
                <h4>Empresa</h4>
                <a href="#contact">Contato</a>
                <a href="#">Trabalhe conosco</a>
                <a href="#">Sustentabilidade</a>
              </div>
              <div className="foot-col">
                <h4>Sede</h4>
                <a href="#">R. Campos Salles, 344</a>
                <a href="#">Vila São Sebastião</a>
                <a href="#">Valinhos / SP</a>
                <a href="#" style={{ marginTop: '10px', color: 'var(--fg)' }}>+55 19 3327 8858</a>
              </div>
            </div>

            {/* Social */}
            <div className="social" style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
              <a href="#" aria-label="Facebook" style={{ color: 'var(--fg-dim)', transition: 'color 0.2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" style={{ color: 'var(--fg-dim)', transition: 'color 0.2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" style={{ color: 'var(--fg-dim)', transition: 'color 0.2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h4v4H4zM4 10h4v10H4zM10 10h4v1.5c.8-1.2 2.2-1.8 3.5-1.8 2.5 0 4.5 2 4.5 4.5V20h-4v-5c0-1.1-.9-2-2-2s-2 .9-2 2v5h-4V10z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* ─── COLUNA DIREITA: Mapa ─── */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ 
              fontFamily: 'var(--font-mono)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.14em', 
              fontSize: '11px', 
              color: 'var(--fg-dim)',
              marginBottom: '16px'
            }}>Localização</h4>
            <iframe 
              src="https://maps.google.com/maps?q=R.+Campos+Salles,+344+-+Vila+Sao+Sebastiao,+Valinhos+-+SP&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              style={{ 
                flexGrow: 1, 
                minHeight: '360px',
                border: 0, 
                borderRadius: '16px', 
                filter: 'invert(90%) hue-rotate(180deg) grayscale(80%) contrast(80%)' 
              }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        
        {/* ── Barra inferior ── */}
        <div className="foot-bottom" style={{ 
          marginTop: '48px', 
          paddingTop: '24px', 
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: 'var(--fg-dim)'
        }}>
          <span>© Global Label · 2008–2026 · Todos os direitos reservados</span>
        </div>
      </div>
    </footer>
  );
}
