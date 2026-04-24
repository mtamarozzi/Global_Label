# Relatório de Sessão — CRM_FVC → White-Label + Global Label

**Data:** 22–23/04/2026
**Projeto:** Transformação do CRM_FVC em produto white-label replicável + implementação do primeiro cliente (Global Label)

---

## 1. DOCUMENTAÇÃO E PLANEJAMENTO

### 1.1 Mapa Técnico do CRM_FVC
- Gerado documento completo mapeando todo o sistema em produção
- Cobre: 7 workflows n8n, 6 tabelas Supabase, 3 RPCs, 4 triggers, frontend (main.js 109KB), prompt da Mariana (~4.500 palavras), credenciais, jornada do lead
- Arquivo: `CRM_FVC_Mapa_Tecnico.md`

### 1.2 Roadmap de Transformação White-Label
- Definido roadmap em 5 fases com priorização
- **Fase 1 (Máxima):** Tabela config_escritorio, autenticação Supabase Auth, prompt dinâmico, credenciais por cliente
- **Fase 2 (Alta):** Template contrato, mensagens parametrizáveis, CSS variáveis, pipeline configurável
- **Fase 3 (Média):** Decisão arquitetura (single vs multi-tenant), RLS, Storage, domínio customizado
- **Fase 4 (Média-Baixa):** Painel admin, wizard onboarding, documentação, script provisionamento
- **Fase 5 (Estratégica):** Billing, logs, monitoramento, backup, LGPD, testes

### 1.3 Guia Unificado de Implementação
- Combinado Mapa Técnico + Roadmap em documento único organizado por fase
- Cada seção contém: estado atual (com valores hardcoded reais), o que mudar, SQL de criação, código de exemplo, arquivos/workflows afetados
- Serve como briefing para sessões futuras (colar seção relevante no início de cada conversa nova)
- Arquivo: `CRM_FVC_Guia_Implementacao_WhiteLabel.md`

---

## 2. PREPARAÇÃO DO AMBIENTE CRM_ADV

### 2.1 Exportação do Schema SQL
- Criado workflow temporário no n8n para extrair schema do Supabase do Felipe via Postgres
- Extraído: 70 colunas de 6 tabelas + 7 funções/RPCs (incluindo triggers)
- Workflow temporário desativado e deletado após uso
- Gerado arquivo SQL completo com CREATE TABLE, CREATE FUNCTION, CREATE TRIGGER e ALTER PUBLICATION (Realtime)
- Arquivo: `CRM_ADV_schema_migration.sql`

### 2.2 Clone do Repositório
- Repositório CRM_FVC clonado para CRM_ADV no GitHub do usuário (mtamarozzi/CRM_ADV)
- Comandos executados: `git clone` → `git remote remove origin` → `git remote add origin` → `git push -u origin master`
- Branch principal: `master`

### 2.3 Supabase Novo Configurado
- Projeto: `ykehacyfucjbkxnsfcrc`
- URL: `https://ykehacyfucjbkxnsfcrc.supabase.co`
- Schema SQL rodado com sucesso — todas as tabelas, RPCs e triggers criados
- RLS policies criadas para chat_conversations, chat_messages e n8n_chat_histories
- Realtime habilitado nas tabelas principais

---

## 3. IMPLEMENTAÇÃO GLOBAL LABEL (primeiro cliente white-label)

### 3.1 Contexto
- **Site:** https://global-label.vercel.app/ (React + Vite)
- **Empresa:** Gráfica especializada em rótulos autoadesivos e etiquetas, Valinhos/SP
- **Agente IA:** Aurora (assistente comercial)
- **Paleta:** Primária #13AFF0, Secundária #69727D, Destaque #F1702D, Fundo #05070b
- **Fontes:** Open Sans (body), Roboto (heading)

### 3.2 Workflow Chat_Widget_AI_Global Label (ID: 97DoFCulr4o4gAv3)
- Duplicado do Chat_Widget_AI_v1 pelo usuário no editor do n8n
- Atualizações aplicadas via MCP:
  - **Prompt inteiro trocado:** Mariana/Limpa Nome → Aurora/Global Label (rótulos e etiquetas, ~3.500 palavras)
  - **sender_name:** `'Mariana'` → `'Aurora'` no nó Preparar Resposta
  - **Tag:** `#DADOS_COLETADOS` → `#LEAD_QUALIFICADO` em todos os nós
  - **Nó "Extrair Dados Lead":** Reescrito para campos: nome, whatsapp, tipo_produto, formato, material, quantidade, acabamento, prazo, arte, origem
  - **Nó "Tem #DADOS_COLETADOS?":** Renomeado para "Tem #LEAD_QUALIFICADO?"
  - **Sticky Note:** Atualizado para "Aurora / Global Label"
  - **3 erros de expressão corrigidos** via autofix (prefixo `=` faltante em queries Postgres)
- Workflow ativado com sucesso

### 3.3 Prompt da Aurora — Diferenças-chave vs Mariana
| Aspecto | Mariana (CRM_FVC) | Aurora (Global Label) |
|---|---|---|
| Serviço | Limpa Nome (jurídico) | Rótulos autoadesivos e etiquetas |
| Preço | Informa R$ 299,00 | NUNCA informa preço (só consultor humano) |
| Coleta | 11 dados cadastrais (CPF, RG, endereço...) | Dados técnicos (tipo, formato, material, quantidade) + WhatsApp |
| Tag | #DADOS_COLETADOS | #LEAD_QUALIFICADO |
| Encaminhamento | Gera cobrança no Asaas | Encaminha para consultor via WhatsApp |
| SLA | Não informado | Retorno em até 2 horas (horário comercial) |
| Horário | Sem restrição | Seg-Qui 07:30–17:00, Sex 07:30–16:00 |
| Escopo | Limpa Nome apenas | Rótulos e etiquetas apenas |

### 3.4 Credencial Postgres para Supabase Novo
- Conexão via Session Pooler (IPv4 compatível):
  - Host: `aws-0-sa-east-1.pooler.supabase.com`
  - Port: `6543`
  - User: `postgres.ykehacyfucjbkxnsfcrc`
  - Database: `postgres`
  - SSL Issues: Ignorar (ativado)
- Credencial "Postgres account 2" criada no n8n
- Reconectada nos 4 nós: Verificar Status, Memória Chat Web, Salvar Resposta IA, Atualizar Nome Lead

### 3.5 Trigger Supabase Atualizado
- Função `notify_n8n_chat_message` atualizada com URL do webhook:
  - `https://webhook.hubautomacao.pro/webhook/ee689601-de24-4107-96d2-b01323bf4c94`
- Trigger `trg_notify_n8n_widget` confirmado existente e funcional

### 3.6 Widget React Integrado
- Componente `ChatWidget.jsx` criado como componente React funcional com hooks
- Funcionalidades: Supabase Realtime, animação de typing, badge de notificação, responsivo mobile, persistência de conversa (localStorage)
- Visual: cores Global Label, gradientes, fontes Open Sans/Roboto, rodapé "Global Label • Rótulos Inteligentes"
- Integrado no `App.jsx`: import + `<ChatWidget />` após `<Footer />`
- Dependência adicionada: `@supabase/supabase-js`
- Deploy no Vercel via `git push`
- **Testado e funcionando em produção**

### 3.7 Correções Durante Implementação
1. **Erro IPv6 no Postgres:** n8n não suportava IPv6 → resolvido usando Session Pooler (IPv4)
2. **Erro "Tenant or user not found":** Formato do User errado → corrigido para `postgres.ykehacyfucjbkxnsfcrc`
3. **Erro 401 "Invalid API key":** Anon key incorreta no widget → corrigida com key válida do dashboard
4. **Erro RLS bloqueando INSERTs:** Policies criadas para chat_conversations, chat_messages e n8n_chat_histories

---

## 4. ARQUIVOS GERADOS

| Arquivo | Descrição | Local |
|---|---|---|
| CRM_FVC_Mapa_Tecnico.md | Mapa técnico completo do sistema | Download |
| CRM_FVC_Guia_Implementacao_WhiteLabel.md | Guia unificado (mapa + roadmap) por fases | Download |
| CRM_ADV_schema_migration.sql | Schema SQL para Supabase novo | Download |
| chat-widget-crm-adv.html | Widget HTML standalone genérico (white-label) | Download |
| chat-widget-global-label.html | Widget HTML standalone customizado Global Label | Download |
| ChatWidget.jsx | Componente React integrado no site Global Label | Download / Produção |

---

## 5. STATUS FINAL

### CRM_FVC (produção Felipe Viccari)
- ✅ **Intocado** — nenhuma alteração feita nos workflows, banco ou frontend de produção

### CRM_ADV (white-label)
- ✅ Repositório clonado no GitHub (mtamarozzi/CRM_ADV)
- ✅ Supabase novo com schema completo
- ✅ Guia de implementação pronto para Fase 1
- ⏳ Fase 1 pendente (config_escritorio, autenticação, prompt dinâmico)

### Global Label (primeiro cliente)
- ✅ Workflow ativo no n8n (Chat_Widget_AI_Global Label)
- ✅ Prompt da Aurora completo e customizado
- ✅ Widget React integrado e funcionando
- ✅ Supabase conectado com credenciais próprias
- ✅ Trigger configurado e funcional
- ✅ **Site em produção no Vercel — 100% operacional**

---

## 6. PRÓXIMOS PASSOS RECOMENDADOS

1. **Exportar JSONs dos 7 workflows** do n8n do Felipe (menu "..." → Download no editor)
2. **Iniciar Fase 1 do white-label** em nova sessão (colar seção 1.1 do Guia de Implementação)
3. **Monitorar Aurora** nos primeiros dias — verificar execuções no n8n, qualidade das respostas, leads qualificados
4. **Criar n8n próprio** quando tiver o trial de 14 dias (só quando frontend/banco estiverem refatorados)
5. **Testar fluxo completo** da Global Label: visitante digita → Aurora responde → coleta dados técnicos → gera tag #LEAD_QUALIFICADO → consultor recebe no WhatsApp (este último passo ainda não implementado)
