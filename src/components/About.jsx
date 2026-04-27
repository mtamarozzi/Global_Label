export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap about-grid">
        <div className="about-vis reveal" style={{ position: 'relative' }}>
          <img 
            src="/images/Maquina-Impressão-01-1568x1045.jpg" 
            alt="Fábrica Global Label" 
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.6 }} 
          />
          <div className="caption" style={{ zIndex: 1, position: 'absolute' }}>
            <div>
              <b>Fábrica · Valinhos / SP</b>
              Parque gráfico rotativo e digital
            </div>
          </div>
        </div>
        
        <div className="about-copy">
          <span className="eyebrow reveal">Quem somos</span>
          <h2 className="reveal d1">
            Jovem na idade,<br />
            <span className="grad-text-orange">veterana no ofício.</span>
          </h2>
          <p className="reveal d2" style={{ whiteSpace: 'pre-line' }}>
            Embora sejamos uma empresa jovem, a Global Label foi fundada em 2014, nossos sócios possuem mais de 25 anos de experiência no segmento gráfico.
            Trazemos ao mercado um conceito bem fundamentado, onde nossas prioridades se baseiam na excelência de atendimento aos nossos clientes e na qualidade dos produtos e serviços que oferecemos. Para isso, investimos constantemente em novas tecnologias para entregar o melhor material para você.
            Atuamos com todos os tipos de rótulos autoadesivos e etiquetas, atendendo clientes de diversos segmentos e em todo território nacional.
          </p>
          
          <div className="values-grid">
            <div className="value reveal d3">
              <span className="k">Missão</span>
              <span className="v">Entregar excelência</span>
              <p>Fornecer produtos de alta qualidade e atendimento personalizado a todos clientes, agregando valor no produto final.</p>
            </div>
            <div className="value reveal d4">
              <span className="k">Visão</span>
              <span className="v">Ser referência nacional</span>
              <p>Reconhecida pela qualidade, inovação tecnológica e relação de confiança com o cliente.</p>
            </div>
            <div className="value reveal d5">
              <span className="k">Valores</span>
              <span className="v">Parceria · ética</span>
              <p>Compromisso, respeito e transparência em cada etapa do processo produtivo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
