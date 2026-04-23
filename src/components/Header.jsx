import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

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
    <header className="site-header" style={{
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
        height: scrolled ? '80px' : '110px',
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
        
        <button className="menu-btn" aria-label="Menu" style={{ marginLeft: 0, marginRight: '24px' }}>Menu</button>
        
        <a className="nav-cta" href="#contact">
          Solicitar orçamento
          <svg className="arr icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m13 5 7 7-7 7" />
          </svg>
        </a>
      </nav>
    </header>
  );
}
