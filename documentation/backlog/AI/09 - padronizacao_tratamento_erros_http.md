# Etapa 09 — Padronização de tratamento de erros HTTP

- **Pré-requisitos**: Etapa 06 (BaseHttpService) concluída. Recomendado também a 07 (NotificationService).
- **Dificuldade para IA**: Média.

## Contexto

Hoje o `auth.interceptor.ts` faz:

- Anexa `Authorization`.
- Em 401 → logout + redirect.
- Em 403/0 → `console.error`.

Mas cada componente repete o mesmo bloco para mostrar toast de erro:

```ts
error: (error) => {
  const errorMessage = error?.error?.message || 'Erro ao ...';
  this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 5000 });
}
```

Isso resulta em:

- Verbosidade extra em cada `subscribe`.
- Mensagens de fallback divergentes ("Erro ao carregar rifas", "Erro ao excluir rifa", "Erro na operação", etc.).
- `console.error` no interceptor não é exibido ao usuário.

## Objetivo

Padronizar:

1. **Tipagem**: criar `ApiError` com a forma comum (`{ message?: string; details?: ... }`).
2. **Helper**: função `extractErrorMessage(err, fallback)`.
3. **Interceptor**: exibir toast genérico para 5xx; manter logout para 401.
4. **Componentes**: passar a chamar `notification.error(extractErrorMessage(err, 'Erro ao carregar rifas'))` ou — se quisermos ir mais longe — confiar no interceptor para erros não tratados.

## Escopo desta etapa

✅ Deve fazer:
- Criar `core/errors/api-error.model.ts` e `core/errors/extract-error-message.ts`.
- Atualizar `auth.interceptor.ts` para:
  - 401 → logout + navigate.
  - 5xx → toast genérico (via `NotificationService`).
  - 0 → toast informando "sem conexão".
  - 4xx (exceto 401/403) → não exibir nada por padrão; deixar componente decidir.
- Atualizar componentes para usar `extractErrorMessage` em vez de `error?.error?.message ||`.
- Manter o comportamento atual de exibir mensagens específicas em listas (carregar rifas, excluir, etc.).

❌ Não deve fazer:
- Não silenciar erros legítimos.
- Não introduzir biblioteca nova de error handling.
- Não tocar em CSS.

## Tarefas detalhadas

### 1. Modelo

`core/errors/api-error.model.ts`:

```
export interface ApiError {
  message?: string;
  details?: unknown;
}
```

`core/errors/extract-error-message.ts`:

```
export function extractErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'error' in err) {
    const inner = (err as { error?: ApiError }).error;
    if (inner?.message) return inner.message;
  }
  return fallback;
}
```

### 2. Atualizar interceptor

- Continuar tratando 401 com logout.
- Em `error.status >= 500`: chamar `notification.error('Erro inesperado no servidor. Tente novamente.')`. Como o interceptor é uma função, injetar `NotificationService` via `inject(NotificationService)`.
- Em `error.status === 0`: `notification.error('Sem conexão com o servidor.')`.
- Continuar lançando o erro com `throwError` para o componente também tratar caso queira.
- Manter `console.error` apenas em `!environment.production`.

### 3. Atualizar componentes

Em cada `subscribe({ error: ... })` que hoje tem o pattern `error?.error?.message || 'Erro...'`:

```
error: (err) => this.notification.error(extractErrorMessage(err, 'Erro ao carregar rifas'))
```

Componentes a atualizar (lista que se sobrepõe à Etapa 07):

- `auth/login`
- `lottery/gerenciar`, `lottery/adicionar`
- `lottery/detail/retirada`, `lottery/detail/devolucao`, `lottery/detail/gerenciar`
- `user/gerenciar`, `user/adicionar`, `user/editar`
- `institution`

### 4. Validação

- Forçar um 500 (mockando ou apontando `apiUrl` para endpoint inexistente) e ver toast genérico aparecendo.
- Forçar um 401 e ver redirect para `/login`.
- Forçar um 400 com `{ message: "Talão duplicado" }` e ver toast com a mensagem específica.
- Build e testes passam.

## Critérios de aceite

- [ ] Helper `extractErrorMessage` existe e é usado em todos os subscribes listados.
- [ ] Interceptor exibe toast em 5xx e em status 0.
- [ ] 401 continua deslogando.
- [ ] Nenhum componente repete `error?.error?.message ||` literal.
- [ ] Build e testes passam.
