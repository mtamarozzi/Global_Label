export default function ContactCTA() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = e.currentTarget.querySelector('button');
    if (btn) {
      btn.innerText = 'Recebido ✓';
      btn.style.background = 'linear-gradient(135deg, #2BC48A, #4FE8AD)';
      btn.style.boxShadow = '0 12px 30px -10px rgba(43, 196, 138, 0.6)';
    }
  };

  return (
    <section className="cta-band" id="contact">
      <div className="wrap">
        <div className="cta-card reveal">
          <div className="inner">
            <div>
              <span className="eyebrow">Pronto para começar?</span>
              <h2 style={{ marginTop: '20px' }}>
                Envie seu briefing.<br />
                <span className="grad-text-orange">Recebemos a proposta em&nbsp;24&nbsp;h.</span>
              </h2>
              <p>Conte sobre o produto, tiragem e prazo. Nosso time técnico retorna com material, acabamento e preço. Sem ficha de cadastro ou formulário de 30 campos.</p>
              
              <div style={{
                display: 'flex', gap: '28px', marginTop: '32px', flexWrap: 'wrap',
                fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--fg-dim)'
              }}>
                <span>📍 Valinhos / SP</span>
                <span>☎ +55 19 3327 8858</span>
              </div>
            </div>
            
            <form className="cta-form" onSubmit={handleSubmit}>
              <label>Seu nome</label>
              <input type="text" placeholder="Como podemos te chamar?" required />
              
              <div className="row">
                <div>
                  <label>E-mail</label>
                  <input type="email" placeholder="nome@empresa.com" required />
                </div>
                <div>
                  <label>Telefone</label>
                  <input type="tel" placeholder="(11) 9 0000-0000" />
                </div>
              </div>
              
              <label>Tipo de projeto</label>
              <select>
                <option>Rótulo adesivo premium</option>
                <option>Etiqueta técnica</option>
                <option>Formato especial</option>
                <option>Impressão variável</option>
                <option>Outros</option>
              </select>
              
              <button type="submit">
                Enviar briefing
                <svg className="arr icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
