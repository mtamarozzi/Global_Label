export default function LogoStrip() {
  const items = [
    'ALIMENTÍCIO', '· COSMÉTICOS', '· QUÍMICO & FARMA', '· AUTOMOTIVO',
    '· EMBALAGENS', '· BEBIDAS', '· AGRO', '· VETERINÁRIO & PET',
    '· FRIGORÍFICO', '· LIMPEZA', '· BRINQUEDOS', '· SEGURANÇA'
  ];

  return (
    <div className="wrap">
      <div className="logo-strip">
        <div className="logo-strip-track">
          {items.map((item, index) => (
            <span key={`first-${index}`} className="item">{item}</span>
          ))}
          {items.map((item, index) => (
            <span key={`second-${index}`} className="item">{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
