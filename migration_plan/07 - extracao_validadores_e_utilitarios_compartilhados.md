# Etapa 07 — Extração de validadores e utilitários compartilhados

- **Pré-requisitos**: nenhum.
- **Dificuldade para IA**: Baixa.

## Contexto

Várias partes do código duplicam a mesma lógica:

### 1. `holderPairValidator`

Definido **idêntico** em dois lugares:

- `src/app/features/lottery/detail/devolucao/devolucao.ts` (linhas 26–35).
- `src/app/features/lottery/detail/retirada/retirada.component.ts` (linhas 24–33).

### 2. Toasts repetidos

O padrão `messageService.add({ severity: 'success', summary: 'Sucesso', detail: '...', life: 3000 })` e o equivalente `error` aparecem em praticamente todos os componentes (login, institution, lottery/gerenciar, lottery/adicionar, retirada, devolucao, user/*). Cada um repete `severity`, `summary`, `life`.

### 3. Extração de `nameLottery` da rota

`route.snapshot.paramMap.get('nameLottery')` aparece em `resumo`, `retirada`, `devolucao`, `gerenciar` (detail). É sempre o mesmo padrão.

## Objetivo

Centralizar:

1. **Validators compartilhados** em `shared/services/custom-validators.service.ts` (que já existe — confirmar e estender) **ou** em `shared/validators/` como funções puras.
2. **NotificationService** (helper sobre `MessageService`) com métodos `success(detail, summary?)`, `error(detail, summary?)`, `warn`, `info`.
3. (Opcional) **Helper `getNameLotteryParam`** ou simplesmente parametrizar via `withComponentInputBinding()` no router.

## Escopo desta etapa

✅ Deve fazer:
- Criar/usar pasta `shared/validators/` para validadores reutilizáveis.
- Mover `holderPairValidator` para lá; importar nos dois componentes.
- Criar `shared/services/notification.service.ts` que encapsula `MessageService` da PrimeNG.
- Atualizar **todos** os componentes que usam o pattern repetitivo de toast para usar o novo serviço.

❌ Não deve fazer:
- Não refatorar a lógica interna do `DevolucaoComponent` (Etapa 08).
- Não trocar `MessageService` por outra biblioteca.
- Não mexer em CSS.

## Tarefas detalhadas

### 1. `shared/validators/holder-pair.validator.ts`

Mover a função pura `holderPairValidator` para um único arquivo. Exportar com nome no padrão `holderPairValidator`. Nos dois componentes, remover a definição local e fazer import.

### 2. `shared/services/notification.service.ts`

API sugerida:

```
success(detail: string, summary?: string, life?: number): void
error(detail: string, summary?: string, life?: number): void
warn(...)
info(...)
```

Defaults internos: `summary` padrão (`'Sucesso'` / `'Erro'`), `life` padrão (3000 para success/info, 5000 para error/warn). Internamente delega para `MessageService.add(...)`.

Marcar `@Injectable({ providedIn: 'root' })`.

### 3. Migrar componentes

Trocar todos os `messageService.add({...})` pelos métodos do `NotificationService`. Componentes a migrar (lista de partida — confirmar com `grep`):

- `features/auth/login/login.component.ts`
- `features/lottery/gerenciar/gerenciar.component.ts`
- `features/lottery/adicionar/adicionar.component.ts`
- `features/lottery/detail/retirada/retirada.component.ts`
- `features/lottery/detail/devolucao/devolucao.ts`
- `features/lottery/detail/gerenciar/gerenciar.component.ts`
- `features/user/gerenciar/gerenciar.component.ts`
- `features/user/adicionar/adicionar.component.ts`
- `features/user/editar/editar.component.ts`
- `features/institution/institution.component.ts`

Nota: o `MessageService` continua sendo o backend; só as chamadas mudam. O `<p-toast>` no template não muda.

### 4. (Opcional, decidir e justificar) Component input binding

Em `app.config.ts`, ativar `provideRouter(routes, withComponentInputBinding())` permite receber `nameLottery` como `@Input()` no componente, eliminando o `route.snapshot.paramMap.get(...)`. Se a IA implementar isso, deve atualizar todos os componentes do detail. Caso contrário, deixar como TODO no documento.

### 5. Validação

- Build passa.
- Testes passam.
- Visualmente, toasts continuam idênticos (mesma cor, ícone, tempo).

## Critérios de aceite

- [ ] `holderPairValidator` existe em um único lugar e é importado pelos dois componentes.
- [ ] `NotificationService` criado e usado em todos os componentes listados.
- [ ] Nenhum componente faz `import { MessageService }` da PrimeNG diretamente para chamar `add(...)` (somente o `NotificationService` o faz).
- [ ] Build e testes passam.
