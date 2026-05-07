# Etapa 10 — Revisão de CSS global (`src/scss` e `src/styles.scss`)

- **Pré-requisitos**: nenhum.
- **Dificuldade para IA**: Baixa.

## Contexto

Estrutura atual:

- `src/styles.scss`: 35 linhas, importa 5 parciais (`buttons`, `colors`, `spaces`, `flexbox`, `forms`).
- `src/scss/_palettes.scss`: **310 linhas** com paleta Material completa (vermelho, rosa, roxo, etc.). É praticamente um dump do Material Design — pouquíssimas dessas variáveis são usadas hoje.
- `src/scss/_colors.scss`: 111 linhas, define variáveis CSS no `:root` (`--color-primary`, etc.). Usa `palettes.$blue-7` no `gradient-surface` (uma única referência ao palettes).
- `src/scss/_buttons.scss`, `_flexbox.scss`, `_forms.scss`, `_spaces.scss`: utilitários.
- `styles.scss` define classes `.full-wrapper`, `.font-bold`, `.full-width`, `.logo`, `.page-title` e estiliza `i { font-size: 1.4em }` global (perigoso — afeta todos os `<i>` de toda a app, incluindo PrimeNG icons).

## Objetivo

1. **Remover** o que não é usado.
2. **Reduzir** o `_palettes.scss` para apenas as cores efetivamente referenciadas.
3. **Eliminar** seletores globais perigosos (ex.: `i { ... }` em `styles.scss`).
4. Manter um conjunto mínimo de tokens (cores, espaçamentos, flex helpers) que façam sentido para o time.

## Escopo desta etapa

✅ Deve fazer:
- Auditar uso de cada variável SCSS e classe global.
- Remover não usadas.
- Substituir o seletor `i { font-size: 1.4em }` por uma classe explícita (`.icon-md` por exemplo) e atualizar templates que dependem dele.
- Manter dark mode (`html[data-theme="dark"]`).

❌ Não deve fazer:
- Não reorganizar arquitetura (não migrar para CSS Modules / Tailwind).
- Não mexer no SCSS interno dos componentes (Etapa 11).
- Não alterar paleta visual percebida pelo usuário (mesmas cores finais).

## Tarefas detalhadas

### 1. Auditoria de variáveis

Para cada variável definida em `_palettes.scss`, `_colors.scss`, `_spaces.scss`, `_buttons.scss`, `_flexbox.scss`, `_forms.scss`:

- Buscar uso em `src/**/*.{scss,ts,html}`.
- Marcar não-usadas para remoção.

Em particular:

- `_palettes.scss`: provavelmente quase tudo é não-usado. Manter apenas o que `_colors.scss` referencia (ex.: `$blue-7`, `$blue-8`).
- Avaliar se vale a pena manter o arquivo para consulta. Recomendação: manter um `_palettes.scss` enxuto com APENAS as cores em uso (≤ 30 linhas).

### 2. Auditoria de classes globais

Classes em `styles.scss` (`.full-wrapper`, `.font-bold`, `.full-width`, `.logo`, `.page-title`):

- Buscar uso nos templates HTML.
- Remover as não-usadas.
- Mover as muito específicas (ex.: `.logo`) para o componente onde fazem sentido (header), em vez de globais.

### 3. Seletor `i`

`i { font-size: 1.4em }` é um seletor global perigoso. Substituir:

- Criar classe `.icon-md` ou usar variáveis PrimeNG.
- Atualizar templates que esperavam o tamanho default (ou aceitar que ícones agora têm tamanho default, ajustando localmente onde necessário).

### 4. Documentar tokens

Adicionar comentário no topo de `_colors.scss` listando os tokens disponíveis (variáveis CSS), para guiar autores futuros.

### 5. Validação

- `npm run build:prod` passa.
- Visualmente, login + listagem + cadastro mantêm aparência.
- Buscar por `font-size: 1.4em` não retorna nada acidentalmente quebrado.
- Tamanho do CSS final (após build) deve cair (verificar `dist/.../styles*.css`).

## Critérios de aceite

- [ ] `_palettes.scss` ≤ 30 linhas (somente cores em uso).
- [ ] `styles.scss` sem seletores globais perigosos (`i`, `*`, etc.).
- [ ] Variáveis SCSS órfãs removidas.
- [ ] Documentação dos tokens existentes no topo de `_colors.scss`.
- [ ] UI visualmente equivalente.
- [ ] Tamanho do bundle CSS reduzido.
