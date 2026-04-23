export default function Quality() {
  return (
    <section className="quality" id="quality">
      <div className="wrap">
        <div className="sec-head">
          <div className="left">
            <span className="eyebrow reveal">Processos de qualidade</span>
            <h2 className="reveal d1">A engenharia que faz a<br /><span className="grad-text">cor chegar exatamente igual.</span></h2>
          </div>
          <div className="right reveal d2">
            A cada ano investimos em tecnologia, treinamento e controle. Cada etapa é monitorada por instrumentos calibrados — para que o rótulo saia da fábrica igual ao que você aprovou na tela.
          </div>
        </div>

        <div className="q-grid">
          <article className="q-card reveal">
            <div className="step">01</div>
            <div>
              <h3>Pré-impressão</h3>
              <p>Time gráfico dedicado à preparação de arquivos, prova digital e contratual antes de qualquer tiragem.</p>
            </div>
            <div className="tail"><span>art · file prep</span><span>↗</span></div>
          </article>

          <article className="q-card reveal d1">
            <div className="step">02</div>
            <div>
              <h3>Gerenciamento de cor</h3>
              <p>Espectrofotômetro dedicado à medição e alinhamento de cores Pantone a cada troca de lote.</p>
            </div>
            <div className="tail"><span>ΔE &lt; 2.0</span><span>↗</span></div>
          </article>

          <article className="q-card reveal d2">
            <div className="step">03</div>
            <div>
              <h3>Impressão</h3>
              <p>Parque de impressão flexográfica e digital, com troca rápida de job e controle de densidade em tempo real.</p>
            </div>
            <div className="tail"><span>flexo + digital</span><span>↗</span></div>
          </article>

          <article className="q-card reveal d3">
            <div className="step">04</div>
            <div>
              <h3>Inspeção &amp; expedição</h3>
              <p>Inspeção 100% por câmera, rebobinamento automático e logística rastreada até o seu CD.</p>
            </div>
            <div className="tail"><span>100% inspection</span><span>↗</span></div>
          </article>
        </div>

        {/* metrics band */}
        <div className="metrics">
          <div className="m-grid">
            <div className="metric reveal">
              <div className="n">ΔE&nbsp;1.4</div>
              <div className="lbl">Fidelidade média de cor</div>
            </div>
            <div className="metric reveal d1">
              <div className="n">99.6<sup>%</sup></div>
              <div className="lbl">OTIF · pedido no prazo</div>
            </div>
            <div className="metric reveal d2">
              <div className="n">24h</div>
              <div className="lbl">Tempo médio para prova</div>
            </div>
            <div className="metric reveal d3">
              <div className="n">100<sup>%</sup></div>
              <div className="lbl">Bobinas inspecionadas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
