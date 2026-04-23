export default function Industries() {
  const industries = [
    'Alimentício', 'Cosméticos', 'Químico & Farmacêutico', 'Automotivo', 
    'Embalagens', 'Promocional', 'Gráficas & Editoras', 'Brinquedos', 
    'Limpeza', 'Higiene', 'Agro', 'Veterinário & Pet', 'Frigorífico', 
    'Bebidas', 'Segurança'
  ];

  return (
    <section className="industries" id="industries">
      <div className="wrap">
        <div className="sec-head">
          <div className="left">
            <span className="eyebrow reveal">Áreas de atuação</span>
            <h2 className="reveal d1">14 setores. Um único padrão de entrega.</h2>
          </div>
          <div className="right reveal d2">
            Da indústria farmacêutica ao pet, cada setor tem normas, materiais e prazos distintos. Nosso time domina cada um.
          </div>
        </div>
      </div>

      <div className="ind-track-wrap reveal">
        <div className="ind-track">
          {industries.map((ind, i) => (
            <span key={`first-${i}`} className="ind-chip">
              <span className="dot"></span>
              {ind}
            </span>
          ))}
          {industries.map((ind, i) => (
            <span key={`second-${i}`} className="ind-chip">
              <span className="dot"></span>
              {ind}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
