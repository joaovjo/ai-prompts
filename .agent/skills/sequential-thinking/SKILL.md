---
name: sequential-thinking
description: Metodologia de pensamento sequencial para decomposição estruturada e resolução de problemas complexos.
metadata:
  author: realmquest
  version: "1.0"
argument-hint: "Use Sequential Thinking para decompor problemas complexos em passos claros, documentar decisões e revisar conforme aprende. Ideal para planejamento de features, debugging e refatorações grandes."
compatibility: "Funciona bem com TDD, Drizzle ORM, e práticas de documentação do projeto. Use para problemas que exigem planejamento além do código."
user-invocable: true
---

# Sequential Thinking - Metodologia de Resolução de Problemas

## Princípio Fundamental

Sequential Thinking é uma abordagem sistemática para **decomposição e resolução de problemas complexos** através de pensamento estruturado passo a passo. Em vez de tentar resolver tudo de uma vez, quebre o problema em etapas manejáveis, revise conforme aprende e explore alternativas quando necessário.

## Quando Aplicar

Use Sequential Thinking quando:

- O problema é complexo demais para resolver de uma vez
- Requisitos não estão 100% claros no início
- Múltiplas abordagens são possíveis
- Decisões de arquitetura/design precisam ser documentadas
- Refatorações grandes exigem planejamento
- Debugging de problemas não-óbvios

## Processo: Red → Green → Refactor → Think

Sequential Thinking complementa TDD adicionando uma fase de **planejamento estruturado**:

```
Think (Sequential) → Red → Green → Refactor
```

1. **Think**: Decomponha o problema em pensamentos sequenciais
2. **Red**: Escreva testes baseados no plano
3. **Green**: Implemente seguindo os pensamentos
4. **Refactor**: Melhore mantendo os testes verdes

## Estrutura de Um Pensamento

Cada pensamento deve conter:

```markdown
## Pensamento N/Total

**Contexto**: O que sabemos até agora?
**Objetivo**: O que este pensamento resolve?
**Decisão**: Qual caminho escolhemos e por quê?
**Próximo Passo**: O que vem depois?

[Marcar se é: Revisão | Ramificação | Conclusão]
```

### Tipos de Pensamento

- **Progressão**: Avança para próxima etapa natural
- **Revisão**: Reconsidere pensamento anterior com nova informação
- **Ramificação**: Explore caminho alternativo antes de decidir
- **Consolidação**: Integre múltiplos pensamentos em decisão final

## Exemplo Prático: Nova Feature de API

### Cenário
"Adicionar endpoint de relatórios com filtros e paginação"

### Aplicando Sequential Thinking

```markdown
## Pensamento 1/5

**Contexto**: Precisamos de um endpoint /reports com filtros (data, status) e paginação.
**Objetivo**: Definir contrato da API e estrutura de dados.
**Decisão**: 
- GET /api/reports?startDate=X&endDate=Y&status=Z&page=N&limit=M
- Response: { data: Report[], pagination: { page, limit, total } }
**Próximo Passo**: Definir schema e queries Drizzle.

---

## Pensamento 2/5

**Contexto**: Contrato definido, preciso do schema de dados.
**Objetivo**: Criar tabela `reports` e relações necessárias.
**Decisão**: 
- Schema: id, title, status (enum), createdAt, userId (FK)
- Relação com users via Drizzle
- Migration via `bun run db:generate`
**Próximo Passo**: Escrever testes para a query.

---

## Pensamento 3/5 [REVISÃO do Pensamento 2]

**Contexto**: Percebi que relatórios precisam de soft delete (arquivamento).
**Objetivo**: Ajustar schema para suportar arquivamento.
**Decisão**: 
- Adicionar campo `archivedAt` (nullable timestamp)
- Filtrar por padrão apenas não-arquivados
- Endpoint adicional: PATCH /reports/:id/archive
**Próximo Passo**: Atualizar migration e prosseguir com testes.

---

## Pensamento 4/5

**Contexto**: Schema pronto, hora de implementar queries.
**Objetivo**: Criar função em `lib/queries.ts` respeitando regras do projeto.
**Decisão**:
```typescript
export async function getReports(filters: ReportFilters) {
  return db.query.reports.findMany({
    where: and(
      isNull(reports.archivedAt),
      filters.status ? eq(reports.status, filters.status) : undefined,
      filters.startDate ? gte(reports.createdAt, filters.startDate) : undefined
    ),
    limit: filters.limit || 20,
    offset: (filters.page - 1) * (filters.limit || 20),
    orderBy: desc(reports.createdAt)
  });
}
```
**Próximo Passo**: Escrever testes TDD para esta função.

---

## Pensamento 5/5 [CONCLUSÃO]

**Contexto**: Queries prontas, testes escritos e passando.
**Objetivo**: Integrar ao endpoint e validar.
**Decisão**:
- Route handler em `app/api/reports/route.ts`
- Validação de query params com Zod
- Cache com `unstable_cache` e tag 'reports'
- Documentação TSDoc completa
**Resultado**: Feature implementada seguindo TDD, sem raw SQL, com cache e tipos.
```

## Padrões de Integração

### Com TDD (Obrigatório)

```
1. Think: Planeje comportamentos esperados
2. Red: Escreva testes que falham
3. Green: Implemente mínimo necessário
4. Refactor: Melhore com testes verdes
5. Think (revisão): Documente decisões tomadas
```

### Com Drizzle ORM (Sem Raw SQL)

```
1. Think: Defina schema e relações
2. Think: Planeje queries com operadores Drizzle
3. Think (revisão): Garanta portabilidade SQLite/PostgreSQL
4. Implement: Use db.query e helpers (eq, and, or, etc.)
```

### Com Browser Automation (Chrome DevTools MCP)

```
1. Think: Mapeie fluxo de interação
2. Think: Identifique elementos e ações
3. Think (ramificação): Avalie fluxos alternativos (erro, timeout)
4. Implement: Use snapshots e UIDs
5. Think (conclusão): Valide resultado esperado
```

## Template de Documento de Pensamento

Use este template ao planejar features complexas:

```markdown
# Feature: [Nome da Feature]

## Objetivo
[Descrição do que precisa ser feito]

## Contexto Inicial
- Restrições técnicas
- Dependências
- Padrões do projeto a seguir

---

## Pensamento 1/N
**Contexto**: 
**Objetivo**: 
**Decisão**: 
**Próximo Passo**: 

[Repetir para cada pensamento]

---

## Resumo de Decisões
- Decisão 1: [Por que foi tomada]
- Decisão 2: [Trade-offs considerados]
- Decisão N: [Alternativas descartadas]

## Checklist de Implementação
- [ ] Schema/migrations (se aplicável)
- [ ] Testes escritos (TDD Red)
- [ ] Implementação (TDD Green)
- [ ] Refatoração (TDD Refactor)
- [ ] Documentação TSDoc
- [ ] Validação manual/E2E
```

## Revisão e Ramificação

### Quando Revisar

Revise um pensamento anterior quando:
- Nova informação contradiz decisão prévia
- Descobriu edge case não considerado
- Feedback de code review aponta problema
- Testes revelam falha no planejamento

### Como Ramificar

Explore ramificações quando:
- Múltiplas abordagens têm trade-offs similares
- Incerteza sobre viabilidade técnica
- Experimentação necessária antes de decidir

```markdown
## Pensamento 3A/5 [RAMIFICAÇÃO: Abordagem com Cache]
**Decisão**: Usar Redis para cache de relatórios
**Trade-offs**: +Performance, +Complexidade, +Infra

## Pensamento 3B/5 [RAMIFICAÇÃO: Abordagem com Materialização]
**Decisão**: Tabela materializada com cron job
**Trade-offs**: +Simples, -Real-time, +Storage

## Pensamento 4/5 [CONSOLIDAÇÃO de 3A e 3B]
**Decisão Final**: Usar unstable_cache do Next.js (já disponível)
**Por quê**: Sem infra adicional, fácil invalidação, suficiente para escala atual
```

## Ferramentas de Registro

### Durante Planejamento

- **Notion**: Documento colaborativo com histórico
- **GitHub Issues**: Para features grandes (link nos commits)
- **Markdown Local**: `docs/decisions/feature-X.md`
- **PR Description**: Resumo das decisões tomadas

### Durante Implementação

- **Comentários TSDoc**: Decisões não-óbvias no código
- **Commits**: Mensagens referenciam pensamentos ("Impl pensamento 3: filtros com Drizzle")
- **Testes**: Nomes descrevem comportamentos planejados

## Práticas Recomendadas

### ✅ Fazer

- Numere pensamentos (1/5, 2/5...) para rastreabilidade
- Ajuste total conforme problema fica mais claro
- Documente **por que** escolheu X e não Y
- Revise pensamentos quando contexto muda
- Mantenha pensamentos **concisos e focados**
- Use como **entrada para TDD** (pensamento → teste → código)

### ❌ Evitar

- Pensamentos vagos tipo "depois faço isso direito"
- Planejar todos os detalhes de implementação (deixe isso pro código)
- Ignorar revisões quando descobre informação nova
- Usar como **substituto** de testes ou documentação de código
- Pensamentos que misturam múltiplas decisões não-relacionadas

## Integração com Outras Práticas

| Prática | Como Sequential Thinking Ajuda |
|---------|-------------------------------|
| **TDD** | Planeje testes antes de escrever (Think → Red) |
| **Drizzle ORM** | Estruture queries evitando raw SQL desde o planejamento |
| **TSDoc** | Decisões complexas viram comentários documentados |
| **Code Review** | Decisões explícitas facilitam revisão contextual |
| **Onboarding** | Novos devs entendem *por que* código é assim |

## Exemplo Completo: Debugging

### Problema
"Usuários reportam timeout intermitente no endpoint /dashboard"

```markdown
## Pensamento 1/4
**Contexto**: Timeout intermitente, não reproduzível localmente.
**Objetivo**: Coletar dados sobre o problema.
**Decisão**: 
- Adicionar logging detalhado (query time, response size)
- Verificar APM para patterns (horários, usuários específicos)
**Próximo Passo**: Analisar logs de produção.

---

## Pensamento 2/4
**Contexto**: Logs mostram queries lentas quando usuário tem 10k+ registros.
**Objetivo**: Identificar query problemática.
**Decisão**: Query em `getDashboardData` faz N+1: busca usuário, depois 10k registros um a um.
**Próximo Passo**: Refatorar para usar `with` do Drizzle.

---

## Pensamento 3/4 [REVISÃO do Pensamento 2]
**Contexto**: Refatoração com `with` ainda lenta; problema é volume de dados.
**Objetivo**: Otimizar sem quebrar contrato da API.
**Decisão**:
- Adicionar paginação no dashboard (limit 50)
- Cache com `unstable_cache` por 5min, tag 'dashboard:userId'
- Índice composto em (userId, createdAt DESC)
**Próximo Passo**: Escrever migration e testes.

---

## Pensamento 4/4 [CONCLUSÃO]
**Contexto**: Otimizações implementadas e testadas.
**Resultado**:
- Response time: ~3s → ~200ms
- Testes cobrem paginação e cache invalidation
- Migration adiciona índice
- Documentado em TSDoc por que cache de 5min é suficiente
**Lições**: Sempre considerar escala ao desenhar queries; N+1 é armadilha comum com ORMs.
```

## Métricas de Sucesso

Sequential Thinking funciona bem quando:

- ✅ Decisões são rastreáveis (sabe por que código é X)
- ✅ Revisões são explícitas (sabe quando mudou de ideia)
- ✅ Code reviews são mais rápidos (contexto claro)
- ✅ Onboarding é facilitado (histórico de decisões)
- ✅ Refatorações são seguras (entende trade-offs originais)

## Conclusão

Sequential Thinking é uma **metodologia de decomposição de problemas** que complementa TDD, Drizzle ORM e outras práticas do projeto. Use para **pensar antes de codificar**, mantendo rastreabilidade de decisões e permitindo revisão clara de caminhos de raciocínio.

**Lembre-se**: O objetivo não é burocratizar, mas **estruturar pensamento complexo**. Para problemas simples, vá direto ao código com TDD. Para problemas complexos, Sequential Thinking evita retrabalho e documenta o *por quê* das suas escolhas.