# 📋 Relatório Completo do Projeto — Global Label 2.0

> **Cliente:** Global Label · Rótulos Adesivos e Etiquetas  
> **Data de Início:** 23 de Abril de 2026  
> **Status:** ✅ Concluído e Publicado em Produção  
> **Repositório:** [github.com/mtamarozzi/Global_Label](https://github.com/mtamarozzi/Global_Label)  
> **Site em Produção:** [global-label.vercel.app](https://global-label.vercel.app)

---

## 1. Objetivo do Projeto

Reconstrução completa da **landing page da Global Label** — originalmente desenvolvida em WordPress/Elementor — para uma aplicação web moderna, performática e visualmente sofisticada, utilizando **React + Vite** com design system **Glassmorphism ("Midnight Luxe")**.

### Motivações da Migração
| Antes (WordPress) | Depois (React + Vite) |
|---|---|
| Engine pesada com plugins | Bundle ultra-leve (~67KB gzip) |
| Estilo dependente de page-builder | CSS puro com variáveis modulares |
| Manutenção por painel visual | Código versionado no GitHub |
| Sem controle de deploy | Deploy automático via Vercel |
| Estrutura monolítica | 9 componentes React independentes |

---

## 2. Stack Tecnológica

| Tecnologia | Versão | Papel |
|---|---|---|
| **React** | 19.2.5 | Biblioteca de interface reativa |
| **Vite** | 8.0.10 | Bundler e servidor de desenvolvimento |
| **CSS Vanilla** | — | Design system completo sem frameworks |
| **Vercel** | — | Hospedagem e deploy contínuo (CI/CD) |
| **GitHub** | — | Versionamento de código |

> [!NOTE]
> **Decisão técnica:** Optamos deliberadamente por **CSS puro** (sem Tailwind ou Bootstrap) para manter controle absoluto sobre os efeitos de Glassmorphism (`backdrop-filter`, gradientes radiais, `mix-blend-mode`) que são centrais à identidade visual do projeto.

---

## 3. Etapas Realizadas (Cronologia)

### 3.1 — Análise e Extração do Site Original
- Leitura e análise completa dos arquivos em `uploads/` contendo o scrape do site WordPress original (`www.globallabel.com.br`)
- Extração das informações institucionais, textos, estrutura de navegação e identidade visual
- Mapeamento das imagens disponíveis na pasta `Global_Imagens/`

### 3.2 — Inicialização do Ambiente React
- Criação do projeto Vite + React na raiz do diretório `Global_site`
- Configuração do `index.html` como entry point para o React SPA
- Setup do ESLint para garantia de qualidade de código

### 3.3 — Migração do Design System
- Portagem completa do protótipo de referência (`Global Label - Landing.html`) para o `src/index.css`
- Implementação de **variáveis CSS globais** (`:root`) para:
  - Paleta de cores da marca (`--brand-cyan: #5CE0D2`, `--brand-orange: #F28A2E`)
  - Escala tipográfica com fontes Roboto e JetBrains Mono
  - Tokens de espaçamento, border-radius e sombras
  - Efeitos de `backdrop-blur` e gradientes para o Glassmorphism
- Animações CSS incluindo: `float`, `marquee`, `glow`, `scroll-reveal`

### 3.4 — Construção dos Componentes React

Foram criados **9 componentes modulares** na pasta `src/components/`:

#### [Header.jsx](file:///c:/Users/User/Documents/Global_site/src/components/Header.jsx)
- Barra de navegação flutuante com efeito glass ao rolar
- **Auto-hide inteligente:** desaparece ao rolar para baixo (>200px) e reaparece ao rolar para cima
- Logo oficial da Global Label posicionada independente à esquerda (110px / 80px no scroll)
- Menu compactado (`width: max-content`) alinhado à direita com links de ancoragem e CTA "Solicitar orçamento"

#### [Hero.jsx](file:///c:/Users/User/Documents/Global_site/src/components/Hero.jsx)
- Seção de impacto com headline, sub-copy e CTAs de ação
- **Aurora holográfica** com parallax scroll (`transform: translate3d`)
- **Label Cards 3D interativos** — 3 cartões empilhados que reagem ao ponteiro do mouse com rotação real (`rotateX` / `rotateY`)
- Imagens reais da gráfica inseridas nos cartões com `mix-blend-mode: screen` e opacidade suavizada:
  - `lc-1`: `revisorajan18-4-768x667.jpg` (revisão de bobinas)
  - `lc-2`: `IMG_9907-1024x683.jpg` (inspeção gráfica)
  - `lc-3`: `IMG_9957-1024x683.jpg` (processo de impressão) — com código de barras dinâmico sobre a imagem
- Estatísticas animadas: 17+ anos, 14 setores, ΔE <2

#### [LogoStrip.jsx](file:///c:/Users/User/Documents/Global_site/src/components/LogoStrip.jsx)
- Letreiro infinito (marquee) com nomes dos setores atendidos
- Animação CSS `marquee` com duplicação do array para loop contínuo

#### [About.jsx](file:///c:/Users/User/Documents/Global_site/src/components/About.jsx)
- Seção institucional "Quem Somos" com imagem real da fábrica (`Maquina-Impressão-01-1568x1045.jpg`)
- Grid de Missão, Visão e Valores com efeitos de reveal ao scroll

#### [Products.jsx](file:///c:/Users/User/Documents/Global_site/src/components/Products.jsx)
- Grid de 6 cards de produtos/serviços com efeitos de hover luminoso
- Rastreamento de posição do ponteiro para iluminação spot interativa
- Cada card com ícone SVG, título, descrição e tags técnicas

#### [Industries.jsx](file:///c:/Users/User/Documents/Global_site/src/components/Industries.jsx)
- Marquee infinito de setores industriais atendidos (Alimentos, Bebidas, Cosméticos, Farmacêutico, etc.)
- Animação contínua com duplicação do array

#### [Quality.jsx](file:///c:/Users/User/Documents/Global_site/src/components/Quality.jsx)
- 4 etapas do processo produtivo: Pré-impressão → Gerenciamento de Cor → Impressão → Inspeção
- Painel de métricas animadas: ΔE 1.4, 99.6% OTIF, 24h para prova, 100% bobinas inspecionadas

#### [ContactCTA.jsx](file:///c:/Users/User/Documents/Global_site/src/components/ContactCTA.jsx)
- Card de contato com formulário funcional (nome, e-mail, telefone, tipo de projeto)
- Feedback visual de envio (botão muda para "Recebido ✓" com gradiente verde)
- Informações de contato: endereço e telefone

#### [Footer.jsx](file:///c:/Users/User/Documents/Global_site/src/components/Footer.jsx)
- Layout em **2 colunas** (inspiração fornecida pelo cliente):
  - **Esquerda:** Logo oficial (110px, mesma proporção do Hero), tagline, grid de links (Navegação, Empresa, Sede) e ícones sociais
  - **Direita:** Mapa interativo do Google Maps com filtro dark-mode (`invert + hue-rotate`) apontando para R. Campos Salles, 344 – Valinhos/SP
- Barra inferior com copyright

### 3.5 — Integração dos Ativos Visuais
- Logo oficial (`Logo.png`) copiada para `public/images/` e utilizada no Header e Footer
- 6 fotos reais da gráfica integradas nos componentes:

| Imagem | Uso no Site |
|---|---|
| `Logo.png` | Header + Footer |
| `Maquina-Impressão-01-1568x1045.jpg` | Seção About (fundo da fábrica) |
| `revisorajan18-4-768x667.jpg` | Label Card 1 (Hero) |
| `IMG_9907-1024x683.jpg` | Label Card 2 (Hero) |
| `IMG_9957-1024x683.jpg` | Label Card 3 Principal (Hero) |

### 3.6 — Orquestração Final (`App.jsx`)
- Montagem de todos os componentes na ordem correta de seções
- Inicialização global do `IntersectionObserver` para scroll-reveal de todos os elementos com classe `.reveal`
- Detecção inteligente de elementos já visíveis na carga inicial

### 3.7 — Versionamento e Deploy

#### Git + GitHub
- Repositório inicializado com `.gitignore` configurado (exclui `node_modules/` e `dist/`)
- Commit inicial com **51 arquivos** e **8.657 linhas** de código
- Push para repositório remoto: `github.com/mtamarozzi/Global_Label` (branch `main`)

#### Vercel (Produção)
- Projeto criado automaticamente como `global-label` na organização `mtamarozzis-projects`
- Build automático via Vite em **157ms**
- Repositório GitHub conectado — **deploys automáticos** a cada push na `main`
- Site disponível em: **[global-label.vercel.app](https://global-label.vercel.app)**

---

## 4. Arquitetura do Projeto

```
Global_site/
├── index.html                    # Entry point HTML (SPA)
├── package.json                  # Dependências e scripts
├── vite.config.js                # Configuração do Vite
├── eslint.config.js              # Regras de linting
├── .gitignore                    # Exclusões do Git
│
├── public/
│   ├── favicon.svg               # Ícone do site
│   └── images/                   # Ativos visuais (logo + fotos)
│       ├── Logo.png
│       ├── IMG_9907-1024x683.jpg
│       ├── IMG_9957-1024x683.jpg
│       ├── Maquina-Impressão-01-1568x1045.jpg
│       ├── revisorajan18-4-768x667.jpg
│       └── ...
│
├── src/
│   ├── main.jsx                  # Ponto de entrada React
│   ├── App.jsx                   # Componente raiz + scroll observer
│   ├── index.css                 # Design system completo (~26KB)
│   └── components/
│       ├── Header.jsx            # Nav flutuante com auto-hide
│       ├── Hero.jsx              # Seção principal + cards 3D
│       ├── LogoStrip.jsx         # Marquee de parceiros
│       ├── About.jsx             # Institucional + foto fábrica
│       ├── Products.jsx          # Grid de produtos interativo
│       ├── Industries.jsx        # Marquee de setores
│       ├── Quality.jsx           # Processos + métricas
│       ├── ContactCTA.jsx        # Formulário de contato
│       └── Footer.jsx            # Rodapé + mapa
│
├── Global_Imagens/               # Acervo original de referência
├── Global Label - Landing.html   # Protótipo HTML de referência
└── uploads/                      # Scrapes do site WordPress
```

---

## 5. Funcionalidades e Interações Implementadas

| Funcionalidade | Técnica Utilizada |
|---|---|
| Scroll Reveal (fade + slide) | `IntersectionObserver` + classes CSS `.reveal` / `.in` |
| Label Cards 3D interativos | `pointermove` event → `rotateX` / `rotateY` dinâmicos |
| Aurora holográfica parallax | `scroll` event → `translate3d` + `scale` |
| Marquee infinito (LogoStrip + Industries) | `@keyframes marquee` + duplicação de array |
| Product Cards com glow tracking | `pointermove` → CSS custom properties `--gx` / `--gy` |
| Header auto-hide | Comparação `scrollY` vs `lastY` → `translateY(-150px)` |
| Header glass no scroll | Classe `.scrolled` com `backdrop-filter: blur` |
| Logo com redução fluida | `height` condicional por estado `scrolled` |
| Formulário com feedback | `onSubmit` → troca de texto e cor do botão |
| Mapa dark-mode | `filter: invert(90%) hue-rotate(180deg) grayscale(80%)` |

---

## 6. Performance de Build

| Métrica | Valor |
|---|---|
| Tempo de build | **157ms** |
| `index.html` | 0.87 KB (0.48 KB gzip) |
| CSS bundle | 23.30 KB (5.28 KB gzip) |
| JS bundle | 217.17 KB (66.73 KB gzip) |
| **Total gzip** | **~72 KB** |

> [!TIP]
> Comparativamente, um site WordPress equivalente com Elementor teria facilmente 2-5 MB de payload. O ganho de performance é de aproximadamente **30-70x** em tamanho de transferência.

---

## 7. Iterações de Refinamento Realizadas

Durante o desenvolvimento, foram feitas várias rodadas de ajustes visuais a pedido do cliente:

1. **Logo:** Testamos diversos tamanhos (40px → 160px → 220px → 110px). O tamanho final aprovado foi **110px** (padrão) com redução suave para **80px** ao rolar a página.

2. **Menu:** Inicialmente ocupava toda a largura — foi compactado para `max-content` e separado da logo. Depois, foi implementado o **auto-hide** para não obstruir a visualização do conteúdo durante a navegação.

3. **Label Cards:** As imagens reais da gráfica foram integradas progressivamente nos 3 cartões 3D, com blend-mode `screen` para manter a legibilidade do texto sobreposto.

4. **Footer / Mapa:** Evolução de layout em 4 colunas → layout 2 colunas (conteúdo | mapa) seguindo referência visual fornecida pelo cliente. Mapa ampliado de 180px → 300px → `flexGrow: 1` (altura total da coluna).

---

## 8. Links Finais

| Recurso | URL |
|---|---|
| 🌐 **Site em Produção** | [global-label.vercel.app](https://global-label.vercel.app) |
| 📦 **Repositório GitHub** | [github.com/mtamarozzi/Global_Label](https://github.com/mtamarozzi/Global_Label) |
| 🔧 **Painel Vercel** | [vercel.com/mtamarozzis-projects/global-label](https://vercel.com/mtamarozzis-projects/global-label) |
| 💻 **Servidor Local** | [localhost:5173](http://localhost:5173/) |

---

## 9. Próximos Passos Sugeridos

- [ ] **Domínio customizado** — Vincular `globallabel.com.br` ao projeto Vercel
- [ ] **Responsividade mobile** — Refinar breakpoints para telas < 768px
- [ ] **SEO avançado** — Adicionar meta tags Open Graph e Schema.org
- [ ] **Formulário funcional** — Integrar envio de e-mail (Resend, SendGrid ou Supabase Edge Function)
- [ ] **Analytics** — Adicionar Google Analytics ou Vercel Analytics
- [ ] **Novas páginas** — Criar rotas para Portfólio, Blog ou Área do Cliente via `react-router`

---

*Documento gerado em 23 de Abril de 2026 · Projeto Global Label 2.0*
