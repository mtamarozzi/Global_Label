import { useEffect } from 'react';

export default function Products() {
  useEffect(() => {
    const cards = document.querySelectorAll('.p-card');
    const handlePointerMove = (e) => {
      const card = e.currentTarget;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    };

    cards.forEach(card => card.addEventListener('pointermove', handlePointerMove));

    return () => {
      cards.forEach(card => card.removeEventListener('pointermove', handlePointerMove));
    };
  }, []);

  return (
    <section className="products" id="products">
      <div className="wrap">
        <div className="sec-head">
          <div className="left">
            <span className="eyebrow reveal">Produtos &amp; serviços</span>
            <h2 className="reveal d1">
              Um portfólio construído para<br />
              <span className="grad-text">sobreviver ao ponto de venda.</span>
            </h2>
          </div>
          <div className="right reveal d2">
            Em nossas impressões você pode optar para que seu produto seja produzido com verniz e laminação como também colocar um toque de elegância com aplicações em cold stamping ou hot stamping que proporcionarão um efeito diferenciado em seu rótulo.
          </div>
        </div>

        <div className="p-grid" style={{ position: 'relative', zIndex: 1 }}>
          <div className="products-viz" aria-hidden="true">
            <span className="ring"></span><span className="ring"></span><span className="ring"></span><span className="ring"></span>
          </div>

          <article className="p-card med reveal" data-tilt>
            <span className="num">01 · Flagship</span>
            <div>
              <h3>Rótulos adesivos premium</h3>
              <p>BOPP, PE, vinil, papel couché e térmico. Impressão flexográfica e digital com cor gerenciada e aprovação remota.</p>
            </div>
            <span className="go">
              Explorar linha
              <svg className="arr icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </span>
          </article>

          <article className="p-card med reveal d1" data-tilt>
            <span className="num">02</span>
            <div>
              <h3>Etiquetas técnicas</h3>
              <p>Resistência a fricção, óleo, umidade e temperaturas extremas para linhas industriais.</p>
            </div>
            <span className="go">
              Ver opções
              <svg className="arr icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </span>
          </article>

          <article className="p-card med reveal d2" data-tilt>
            <span className="num">03</span>
            <div>
              <h3>Formatos especiais</h3>
              <p>Shapes customizados, multicamadas e booklet labels.</p>
            </div>
            <span className="go">
              Solicitar
              <svg className="arr icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </span>
          </article>

          <article className="p-card med reveal" data-tilt>
            <span className="num">04</span>
            <div>
              <h3>Acabamentos premium</h3>
              <p>Hot stamping, verniz localizado, relevo e laminação.</p>
            </div>
            <span className="go">
              Ver catálogo
              <svg className="arr icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </span>
          </article>

          <article className="p-card med reveal d1" data-tilt>
            <span className="num">05</span>
            <div>
              <h3>Impressão variável</h3>
              <p>Serialização, códigos, QR dinâmicos e numeração sequencial para rastreabilidade fim-a-fim.</p>
            </div>
            <span className="go">
              Saber mais
              <svg className="arr icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </span>
          </article>

          <article className="p-card med reveal d2" data-tilt>
            <span className="num">06</span>
            <div>
              <h3>Pré-impressão</h3>
              <p>Time gráfico dedicado, prova digital e contratual.</p>
            </div>
            <span className="go">
              Enviar arte
              <svg className="arr icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </span>
          </article>
        </div>
      </div>
    </section>
  );
}
