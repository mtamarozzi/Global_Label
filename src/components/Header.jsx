import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header({ onQuoteClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      
      // Esconder se o usuário estiver rolando muito para baixo (> 200px)
      if (y > 200 && y > lastY) {
        setHidden(true);
      } else if (y < lastY) {
        setHidden(false); // Mostrar se rolar pra cima
      }
      
      lastY = y;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} style={{
      position: 'fixed',
      top: '16px',
      left: '50%',
      transform: hidden ? 'translate(-50%, -150px)' : 'translate(-50%, 0)',
      width: 'min(1180px, calc(100% - 32px))',
      zIndex: 1000,
      pointerEvents: 'none', // Allow clicks to pass through empty parts of the wrapper
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease'
    }}>
      
      {/* ESPAÇO DA LOGO: 110px altura, interativa */}
      <a className="logo" href="#top" style={{ 
        pointerEvents: 'auto',
        flexShrink: 0,
        display: 'flex', 
        alignItems: 'center',
        filter: scrolled ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' : 'drop-shadow(0 15px 25px rgba(0,0,0,0.6))',
        transition: 'all 0.3s ease',
        transformOrigin: 'left center'
      }}>
        <img src="/images/Logo.png" alt="Global Label" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
      </a>
      
      {/* BARRA DE MENU: Reduzida a apenas o contorno necessário */}
      <nav className={`topnav ${scrolled ? 'scrolled' : ''}`} id="topnav" aria-label="Principal" style={{
        position: 'relative',
        top: 'auto',
        left: 'auto',
        transform: 'none',
        width: 'max-content', // Shrinks to fit content, removes empty space
        pointerEvents: 'auto',
        paddingLeft: '24px',
        margin: 0
      }}>
        <div className="navlinks" style={{ marginLeft: 0 }}>
          <a href="#about">Quem somos</a>
          <a href="#products">Produtos</a>
          <a href="#quality">Qualidade</a>
          <a href="#industries">Setores</a>
          <a href="#contact">Contato</a>
        </div>
        
        <button className="menu-btn" onClick={() => setMobileMenuOpen(true)} aria-label="Menu" style={{ marginLeft: 0, marginRight: '24px' }}>Menu</button>
        
        <ThemeToggle />
        
        <button className="nav-cta" onClick={onQuoteClick} type="button">
          <span className="cta-text">Solicitar orçamento</span>
          <svg className="arr icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m13 5 7 7-7 7" />
          </svg>
        </button>
      </nav>
    </header>

    {/* MENU MOBILE OVERLAY */}
    <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'var(--ink-0)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px',
      padding: '24px',
      pointerEvents: mobileMenuOpen ? 'auto' : 'none',
      opacity: mobileMenuOpen ? 1 : 0,
      visibility: mobileMenuOpen ? 'visible' : 'hidden',
      transition: 'all 0.3s ease'
    }}>
      <button onClick={() => setMobileMenuOpen(false)} aria-label="Fechar Menu" style={{
        position: 'absolute', top: '24px', right: '24px', 
        width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255,255,255,0.05)', borderRadius: '50%', border: '1px solid var(--line-2)'
      }}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>

      <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '24px', fontWeight: 600 }}>Quem somos</a>
      <a href="#products" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '24px', fontWeight: 600 }}>Produtos</a>
      <a href="#quality" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '24px', fontWeight: 600 }}>Qualidade</a>
      <a href="#industries" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '24px', fontWeight: 600 }}>Setores</a>
      <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '24px', fontWeight: 600 }}>Contato</a>
      
      <button className="nav-cta" onClick={() => { setMobileMenuOpen(false); onQuoteClick(); }} type="button" style={{ marginTop: '24px', fontSize: '18px', padding: '14px 28px' }}>
        Solicitar orçamento
        <svg className="arr icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
          <path d="M5 12h14" />
          <path d="m13 5 7 7-7 7" />
        </svg>
      </button>
    </div>
    </>
  );
}
