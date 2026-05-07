# Etapa 05 — Limpeza de código não utilizado

- **Pré-requisitos**: nenhum. Pode ser executada em paralelo a qualquer outra.
- **Dificuldade para IA**: Baixa.

## Contexto

Auditoria realizada na branch `instituicao-dinamica` revelou pontos concretos para limpeza. Esta etapa **não** refatora arquitetura — apenas remove o que está sobrando ou mal posicionado.

## Itens identificados (lista de partida; a IA deve revalidar e estender)

### 1. `LotteryMockService` não utilizado

Arquivo: `src/app/core/services/lottery-mock.service.ts`.

Busca em todo `src/` por `LotteryMockService` e por `lottery-mock` retorna **zero referências**. Remover o arquivo.

### 2. `console.log` espalhados

Arquivos com logs que **não devem ir para produção**:

- `src/app/core/services/lottery-storage.service.ts`: linhas 34, 39, 44 (`console.log("Sem instituição")`, `console.log(idInstitution)`, `console.log(lotteries)`).
- `src/app/core/services/requests/ticketbook.service.ts`: linha 53 (`console.log(url)`).
- `src/app/features/lottery/detail/gerenciar/gerenciar.component.ts`: linhas 46 e 69.
- `src/app/features/lottery/detail/devolucao/devolucao.ts`: linha 201 (`console.log(tickets)`).

Ação: remover. Mensagens diagnósticas legítimas (ex.: `LotteryStorageService`: warning sobre instituição não selecionada) devem virar `console.warn` e estar gated por `if (!environment.production)`.

### 3. Imports não utilizados

Verificar e remover, em todo `src/app/`, imports declarados e não usados. Casos suspeitos a checar primeiro:

- `src/app/features/lottery/detail/devolucao/devolucao.ts`: importa `Router` mas não usa; importa `CacheKeys` e não usa.
- `src/app/features/lottery/detail/retirada/retirada.component.ts`: importa `CacheKeys` mas não usa.

### 4. Código duplicado: `submitting.set(true)` em `DevolucaoComponent`

Em `devolucao.ts`, linhas 206 e 208 fazem `this.submitting.set(true)` duas vezes seguidas. Remover a duplicata.

### 5. Variável não usada em `RetiradaComponent`

`onCancel()` existe mas (verificar template) — confirmar se é usado no HTML antes de remover. Se não for, remover.

### 6. `confirm()` nativo

`gerenciar.component.ts` da feature `lottery` usa `confirm(...)` (linha 47) enquanto a feature `user` usa o componente compartilhado `ConfirmDialogComponent`. Trocar `confirm()` pelo `ConfirmDialogComponent` para padronizar UX.

### 7. Trailing whitespace / linhas vazias finais

Arquivos com `\n\n\n` ou linhas vazias finais (ex.: `retirada.component.ts`, `venda.component.ts`, `resumo.component.ts`). Aplicar Prettier.

### 8. `VendaComponent` vazio

`src/app/features/lottery/detail/venda/venda.component.ts` é uma classe vazia com 116 linhas de SCSS associado. Avaliar:

- Se a rota está em uso (verificar `lottery.routes.ts`).
- Se não estiver, remover componente, template, estilo e referência na rota.
- Se estiver, manter mas pelo menos zerar o SCSS órfão (Etapa 11 fará a limpeza profunda).

### 9. Tipos `any` evitáveis

Em `devolucao.ts`, linha 191:

```ts
const ticketsFilter = ticketList.filter((ticket: any) => { ... });
```

Trocar por uma interface explícita (`{ number: number; donatorName: string; donatorPhone: string }`).

## Escopo desta etapa

✅ Deve fazer:
- Remover arquivos órfãos (`lottery-mock.service.ts` e qualquer outro encontrado).
- Remover todos `console.log` que não façam parte de tratamento de erro real.
- Remover imports não utilizados.
- Aplicar Prettier no diretório modificado.
- Trocar `confirm()` nativo por `ConfirmDialogComponent`.

❌ Não deve fazer:
- Não refatorar componentes grandes (etapa 08).
- Não centralizar tratamento de erro (etapa 09).
- Não tocar em CSS (etapas 10/11).
- Não introduzir novas libs.

## Validação

- `npm run build:prod` continua passando.
- `npm test` continua passando (rodar apenas se o teste preexistente passa antes da mudança).
- Buscar `console.log` em `src/app/` deve retornar 0 resultados.
- `grep -r "LotteryMockService" src/` retorna 0.

## Critérios de aceite

- [ ] Nenhum `console.log` restante em `src/app/`.
- [ ] `lottery-mock.service.ts` removido.
- [ ] Imports não utilizados removidos nos arquivos listados.
- [ ] Duplicidade de `submitting.set(true)` removida.
- [ ] `confirm()` nativo substituído por `ConfirmDialogComponent` em `lottery/gerenciar`.
- [ ] Build e testes passam.
