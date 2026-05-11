# 4 - Atualização do CLAUDE.md: novo caminho de changes e instruções de backlog

## O que foi alterado

**Arquivo:** `CLAUDE.md`

### 1. Caminho da pasta de changelog

O caminho da pasta de changelog foi atualizado de `changes/` (raiz do projeto) para `documentation/changes/`, refletindo a reorganização feita pelo usuário.

### 2. Seção de Backlog (nova)

Adicionada a seção **Backlog (AI-driven tasks)** ao CLAUDE.md, descrevendo o fluxo de trabalho para tarefas encontradas em `documentation/backlog/AI/`:

- Ao ser instruído a ler um arquivo de tarefa, sempre ler `documentation/backlog/AI/readme.md` primeiro e depois o arquivo especificado.
- Executar a tarefa descrita.
- Se houver etapas que exigem intervenção manual do usuário, criar um arquivo `.md` em `documentation/backlog/Human/` descrevendo o que precisa ser feito.

## Por que foi alterado

O usuário reorganizou a estrutura de pastas de documentação e introduziu um sistema de backlog baseado em arquivos para coordenar tarefas entre Claude e o usuário humano.
