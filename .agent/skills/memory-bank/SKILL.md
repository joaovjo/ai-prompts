---
name: memory-bank
description: Sistema de memória persistente baseado em arquivos e grafo de conhecimento. Agnóstico a modelo de IA. Use para manter contexto entre sessões.
user-invocable: true
argument-hint: "Use comandos como 'atualizar memórias', 'ler memórias', ou 'gerenciar tarefas' para interagir com o banco de memórias."
compatibility: ["all"]
---

# Memory Bank

## Descrição

Esta skill fornece uma metodologia e ferramentas para manter um contexto de projeto persistente ("Memory Bank") que sobrevive a reinicializações de sessão. As memórias são armazenadas como arquivos Markdown com frontmatter YAML em um diretório `.memories` e indexadas por um grafo de conhecimento em `metadata.json`.

## Quando Usar

- Ao iniciar um novo projeto ou tarefa para carregar o contexto.
- Ao tomar decisões arquiteturais importantes.
- Ao atualizar o status do projeto ou de tarefas.
- Quando o usuário solicitar explicitamente "atualizar memórias" ou "ler memórias".

## Estrutura

- **Localização**: As memórias ficam em `.memories/` na raiz do projeto.
- **Metadados (`metadata.json`)**: Arquivo JSON que descreve o grafo de conhecimento (nós e arestas) das memórias.
- **Arquivos**: Arquivos Markdown (`.md`) contendo o conteúdo real e frontmatter YAML.

## Fluxo de Trabalho

### 1. Inicialização / Leitura

Ao iniciar o trabalho, **SEMPRE** comece lendo o `metadata.json` (se existir) para entender a estrutura do conhecimento. Em seguida, leia os arquivos `.md` relevantes apontados pelo grafo.

### 2. Atualização

Ao criar ou modificar memórias:
1.  Edite ou crie o arquivo `.md` na pasta `.memories/`.
2.  **OBRIGATÓRIO**: Inclua/Atualize o Frontmatter YAML com:
    - `type`: Tipo da memória (core, context, task, decision, etc.)
    - `id`: Identificador único (sem espaços).
    - `utc_datetime`: Data atual UTC (IS0 8601).
    - `tags`: Array de tags.
    - `links`: Array de IDs de outras memórias relacionadas.
3.  Execute o script de sincronização para atualizar o `metadata.json`.

### 3. Comandos Disponíveis

A skill fornece scripts para automatizar o gerenciamento:

#### Inicializar Banco de Memórias
Cria a estrutura `.memories` e arquivos iniciais.

```bash
bun .agent/skills/memory-bank/scripts/init_memories.ts
```

#### Sincronizar Metadados
Lê todos os arquivos `.md` e regenera o `metadata.json`.

```bash
bun .agent/skills/memory-bank/scripts/sync_metadata.ts
```

#### Gerenciar Tarefas
Cria e atualiza tarefas.

- **Adicionar Tarefa**: `bun .agent/skills/memory-bank/scripts/task_manager.ts add "Nome da Tarefa"`
- **Atualizar Tarefa**: `bun .agent/skills/memory-bank/scripts/task_manager.ts update "TASK-ID"`
- **Listar Tarefas**: `bun .agent/skills/memory-bank/scripts/task_manager.ts list`

## Referência de Frontmatter

Todo arquivo em `.memories` deve ter este formato:

```markdown
---
type: core
id: techContext
utc_datetime: "2024-01-01T10:00:00.000000+00:00"
tags: [architecture, stack]
links: [projectBrief]
---

# Conteúdo...
```
