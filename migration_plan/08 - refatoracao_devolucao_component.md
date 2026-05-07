# Etapa 08 — Refatoração do `DevolucaoComponent`

- **Pré-requisitos**: Etapa 07 (validadores e NotificationService) concluída.
- **Dificuldade para IA**: Média.

## Contexto

`src/app/features/lottery/detail/devolucao/devolucao.ts` tem **271 linhas** e concentra responsabilidades demais:

- Construção de form (incluindo `FormArray` de tickets).
- Carregamento da rifa.
- Lookup de talão por número.
- Submissão com **dois fluxos diferentes** (talão existente vs novo) e encadeamento RxJS.
- Tratamento de toasts.
- `console.log` e duplicidade (`submitting.set(true)` duplicado, `this.submitting.set(true)` aparece em 3 pontos).

O `onSubmit` tem ~100 linhas e dois ramos `if/else` longos com lógicas semelhantes (criar/atualizar tickets + ticketbook). Há uma **bug latente**: ao final de `onSubmit()`, `this.devolucaoForm.reset()` e `this.numberTicketbook.set(null)` são chamados **antes** de o subscribe completar, ou seja, o reset acontece sincronamente após disparar o request — provavelmente não é o comportamento desejado (o usuário perde o form mesmo se a chamada falhar). Confirmar e corrigir.

## Objetivo

Quebrar o componente em peças menores e reutilizáveis, deixando o componente como **orquestrador** das chamadas, e mover a lógica de domínio para um service ou helpers.

## Escopo desta etapa

✅ Deve fazer:
- Extrair o fluxo de submissão para um `DevolucaoFlowService` (ou renomear para algo melhor — ex.: `TicketbookReturnService`).
- Reduzir `onSubmit` a montar o payload + chamar o service + tratar resultado.
- Corrigir o reset prematuro do form.
- Eliminar a duplicidade `submitting.set(true)`.
- Tipar corretamente o `filter((ticket: any) => ...)`.

❌ Não deve fazer:
- Não mudar o fluxo de UX (mesmas mensagens, mesma navegação).
- Não tocar no template (`devolucao.html`) salvo se for estritamente necessário.

## Tarefas detalhadas

### 1. Criar service de orquestração

`src/app/features/lottery/detail/devolucao/services/ticketbook-return.service.ts` (escopo `providedIn: 'root'` ou local ao módulo, decidir).

API pública:

- `submitReturn(input: TicketbookReturnInput): Observable<void>`

Onde `TicketbookReturnInput` inclui: `idLottery`, `existingTicketbookId | null`, `ticketbookNumber`, `owner`, `holder | null`, `tickets`.

Internamente, decide entre:

- **Talão existente**: `ticketService.create(idTicketbook, tickets)` → `ticketbookService.returnedById(idLottery, idTicketbook)`.
- **Talão novo**: `ticketbookService.create(idLottery, dto)` → `ticketService.create(res.idTicketbook, tickets)`.

Usar `concatMap` como já está hoje. Tipar o retorno como `Observable<void>` (mapear via `map(() => void 0)` no final).

### 2. Refatorar componente

- Remover a lógica de fluxo do `onSubmit`.
- Após `submit`, chamar:

  ```
  this.submitting.set(true);
  this.returnService.submitReturn(payload)
    .pipe(finalize(() => this.submitting.set(false)))
    .subscribe({
      next: () => { this.notification.success('Operação concluída com êxito'); this.resetForm(); },
      error: (err) => this.notification.error(err?.error?.message ?? 'Erro na operação'),
    });
  ```

- Mover `this.devolucaoForm.reset()` e `this.numberTicketbook.set(null)` para um helper `resetForm()` chamado **somente em `next`**.

### 3. Tipos

Criar interface dedicada em `core/models/ticket/`:

```
export interface TicketFormValue {
  number: number;
  donatorName: string;
  donatorPhone: string;
}
```

Substituir o `any` no `filter`.

### 4. Limpeza incidental

- Remover `console.log(tickets)`.
- Remover imports não usados (`Router`, `CacheKeys` — confirmar).
- Remover a duplicação `this.submitting.set(true)`.

### 5. Validação

- Testar manualmente os dois caminhos:
  1. Devolução de talão **já retirado** (existe no banco).
  2. Devolução de talão **novo** (não passou pelo fluxo de retirada).
- Build e testes passam.

## Critérios de aceite

- [ ] `DevolucaoComponent` < 150 linhas.
- [ ] Existe um service que encapsula o fluxo de devolução.
- [ ] Form só é resetado em caso de sucesso.
- [ ] Tipos explícitos, sem `any` em `filter/map`.
- [ ] Imports não usados removidos.
- [ ] Comportamento UX inalterado.
