import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    const hv = document.querySelector('.hero-visual');
    const stack = hv?.querySelector('.label-stack');

    if (hv && stack) {
      const handlePointerMove = (e) => {
        const r = hv.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 14;
        stack.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      };
      
      const handlePointerLeave = () => {
        stack.style.transform = '';
      };

      hv.addEventListener('pointermove', handlePointerMove);
      hv.addEventListener('pointerleave', handlePointerLeave);

      return () => {
        hv.removeEventListener('pointermove', handlePointerMove);
        hv.removeEventListener('pointerleave', handlePointerLeave);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const a = document.getElementById('heroAurora');
      const y = window.scrollY;
      if (a) {
        a.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1 + y * 0.0002})`;
      }
      document.body.style.setProperty('--sy', y + 'px');
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-aurora" id="heroAurora"></div>
      <div className="hero-grid"></div>

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="eyebrow reveal">Impressão inteligente · desde 2008</span>
          <h1 className="reveal d1" style={{ marginTop: '22px' }}>
            Rótulos que <em>transformam</em><br />
            <span className="grad-text">marcas em memória</span>.
          </h1>
          <p className="lead reveal d2">
            Fabricamos rótulos adesivos e etiquetas de alta fidelidade para indústrias que competem no centímetro quadrado. Cor gerenciada, acabamentos premium e produção rastreável — entregues na velocidade do seu go-to-market.
          </p>
          <div className="hero-cta reveal d3">
            <a className="btn" href="#contact">
              Iniciar projeto
              <svg className="arr icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </a>
            <a className="btn ghost" href="#products">
              <svg className="icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Ver portfólio
            </a>
          </div>
          <div className="hero-stats reveal d4">
            <div className="s">
              <span className="num">17<span className="plus">+</span></span>
              <span className="lbl">Anos de mercado</span>
            </div>
            <div className="s">
              <span className="num">14</span>
              <span className="lbl">Setores atendidos</span>
            </div>
            <div className="s">
              <span className="num">ΔE&nbsp;<span style={{ color: 'var(--brand-cyan)' }}>&lt;2</span></span>
              <span className="lbl">Precisão de cor</span>
            </div>
          </div>
        </div>

        <div className="hero-visual reveal d2" aria-hidden="true">
          <div className="label-stack">
            <div className="label-card lc-1">
              <img src="/images/revisorajan18-4-768x667.jpg" alt="Rótulo em produção" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, mixBlendMode: 'screen' }} />
              <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
                <div className="lc-meta"><span>SKU · 0218-A</span><span className="dot"></span></div>
                <div className="lc-sub">Lote · GL-2026/04</div>
                <div className="lc-title">Rótulo adesivo premium · BOPP cristal</div>
              </div>
            </div>
            <div className="label-card lc-2">
              <img src="/images/IMG_9907-1024x683.jpg" alt="Inspeção gráfica" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, mixBlendMode: 'screen' }} />
              <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
                <div className="lc-meta"><span>ΔE 1.4 · ISO 12647</span><span className="dot orange"></span></div>
                <div className="lc-sub">Foil stamping · hot-print</div>
                <div className="lc-title">Acabamento high-gloss + relevo</div>
              </div>
            </div>
            <div className="label-card lc-3">
              <img src="/images/IMG_9957-1024x683.jpg" alt="Processo de Impressão" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, mixBlendMode: 'screen', borderRadius: '16px' }} />
              <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
                <div className="chip"></div>
                <div className="barcode" id="barcode">
                  {[3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 3].map((h, i) => (
                    <i key={i} style={{ width: `${h}px`, height: `${60 + (h * 8)}%` }}></i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span>SCROLL</span>
        <div className="rail"></div>
      </div>
    </section>
  );
}
