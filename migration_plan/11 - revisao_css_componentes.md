# Etapa 11 — Revisão de CSS por componente

- **Pré-requisitos**: Etapa 10 (revisão global) concluída para evitar conflitos de tokens.
- **Dificuldade para IA**: Média.

## Contexto

Cada feature possui seu próprio SCSS. Após inspeção:

- `features/lottery/detail/devolucao/devolucao.scss`: 52 linhas, classes (`.retirada-container`, `.loading-container`, `.form-container`, `.form-field`, `.error-msg`, `.form-actions`).
- `features/lottery/detail/retirada/retirada.component.scss`: 52 linhas, **mesmas classes** que `devolucao.scss` (`.retirada-container`, `.form-field`, etc.). Praticamente duplicado.
- `features/lottery/detail/venda/venda.component.scss`: 116 linhas para um componente que não tem nenhum HTML útil (classe vazia).
- `features/lottery/detail/resumo/resumo.component.scss`: 89 linhas.
- `features/lottery/detail/gerenciar/gerenciar.component.scss`: 58 linhas.
- `features/lottery/gerenciar/gerenciar.component.scss`: 59 linhas.
- `features/lottery/adicionar/adicionar.component.scss`: 65 linhas.

## Objetivo

1. **Eliminar duplicação** entre `retirada.component.scss` e `devolucao.scss` extraindo um partial compartilhado.
2. **Remover SCSS órfão**: classes definidas mas não usadas no template do componente.
3. **Avaliar `venda.component.scss`**: se o componente está vazio (Etapa 05 deve ter decidido), remover; senão, zerar e reescrever conforme necessidade.
4. **Padronizar nomenclatura**: container, form, actions devem ter o mesmo nome de classe em toda a app.

## Escopo desta etapa

✅ Deve fazer:
- Criar `src/scss/_form-page.scss` (ou similar) com as classes compartilhadas (`.form-page`, `.form-field`, `.form-actions`, `.error-msg`, `.loading-container`).
- Remover essas mesmas classes dos SCSSs de componente que apenas as duplicavam.
- Atualizar templates HTML para usar o nome consolidado de classe (caso renomeado).
- Remover SCSS órfão por componente.

❌ Não deve fazer:
- Não rebrandar / remudar paleta.
- Não migrar para outro framework de estilos.
- Não tocar no comportamento dos componentes em `.ts`.

## Tarefas detalhadas

### 1. Identificar classes compartilhadas

Comparar `devolucao.scss` e `retirada.component.scss`. Confirmar que:

- `.form-field` (display flex coluna + label).
- `.error-msg` (cor + tamanho).
- `.form-actions` (flex, gap, justify-end + media query).
- `.loading-container` (centraliza spinner).

São idênticos. Outros candidatos a virar globais (após inspeção):

- `.form-container` (`gerenciar.scss` da feature lottery? confirmar).
- `.page-container` ou `.feature-container` para padronizar `padding: 20px; max-width: 800px; margin: 0 auto;`.

### 2. Criar parcial

`src/scss/_form-page.scss`:

- `.form-page` → padding/max-width.
- `.form-field` → label + input layout.
- `.error-msg` → cor (idealmente usando token `var(--color-danger)` — definido em `_colors.scss`).
- `.form-actions` → flex + media query.
- `.loading-container` → centralizador de spinner.

Usar tokens (`var(--color-danger)`, `$space-*`) em vez de cores hardcoded (`#d32f2f`).

Importar a parcial em `styles.scss` (`@use 'scss/form-page' as *;`).

### 3. Limpar SCSSs por componente

Para cada SCSS de componente (`devolucao.scss`, `retirada.component.scss`, `resumo.component.scss`, etc.):

- Remover as classes que agora estão em `_form-page.scss`.
- Manter somente o que é específico daquele componente (ajustes de tabela, cards específicos, etc.).
- Remover seletores não usados (auditar com inspeção do template).

### 4. Atualizar templates

Onde o template usava `.retirada-container`, trocar para `.form-page` (ou nome decidido).

### 5. `venda.component.scss`

Confirmar a decisão da Etapa 05:

- Se o componente foi removido, remover o SCSS e o HTML.
- Se foi mantido, **zerar** o SCSS (`venda.component.scss` deve ficar vazio ou só com um comentário TODO).

### 6. Validação

- Build passa.
- Inspecionar visualmente cada tela:
  - `/login`
  - `/institution`
  - `/`
  - `/usuarios/gerenciar`, `/usuarios/adicionar`, `/usuarios/editar/:id`
  - `/rifas/gerenciar`, `/rifas/adicionar`
  - `/rifas/:nameLottery/resumo`, `/rifas/:nameLottery/gerenciar`
  - `/rifas/:nameLottery/talao/retirada`, `/rifas/:nameLottery/talao/devolucao`
- CSS bundle final deve diminuir.

## Critérios de aceite

- [ ] `_form-page.scss` criado e importado em `styles.scss`.
- [ ] `retirada.component.scss` e `devolucao.scss` reduzidos a apenas o que é específico.
- [ ] `venda.component.scss` zerado ou removido.
- [ ] Nenhum seletor não usado nos SCSSs de componente listados.
- [ ] Cores hardcoded substituídas por tokens onde aplicável.
- [ ] UI mantém a aparência atual.
- [ ] Build passa.
