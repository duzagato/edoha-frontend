# Etapa 06 — Refatoração: BaseHttpService

- **Pré-requisitos**: nenhum (recomendado executar **antes** das etapas 09 e 08 para evitar retrabalho).
- **Dificuldade para IA**: Média.

## Contexto

Todos os serviços em `src/app/core/services/requests/` repetem o mesmo padrão:

```ts
this.http.get<X>(`${environment.apiUrl}${ApiRoutes.X}`)
this.http.post<X>(`${environment.apiUrl}${ApiRoutes.X}`, dto)
```

São ~13 serviços. Isso gera:

- Duplicação de `${environment.apiUrl}${ApiRoutes...}`.
- Verbosidade nas rotas com placeholders (`/lottery/{idLottery}/ticketbook` etc.) — substituições manuais via concatenação.
- Dificuldade futura caso a `apiUrl` precise virar dinâmica por instituição (slug).

## Objetivo

Extrair um **`BaseHttpService`** abstrato que:

1. Encapsula `HttpClient`.
2. Expõe métodos `get<T>(path, params?)`, `post<T>(path, body?)`, `put<T>(path, body?)`, `delete<T>(path)`.
3. Resolve a `apiUrl` a partir do `environment`.
4. Substitui placeholders `{xxx}` em rotas a partir de um objeto `params`.

## Escopo desta etapa

✅ Deve fazer:
- Criar `core/services/http/base-http.service.ts`.
- Migrar **todos** os serviços em `core/services/requests/` para herdar/usar o `BaseHttpService`.
- Manter assinaturas públicas dos serviços iguais (sem quebrar componentes).
- Remover imports diretos de `environment` dos serviços migrados.

❌ Não deve fazer:
- Não centralizar tratamento de erros (Etapa 09 cuida disso via interceptor).
- Não mudar contratos públicos dos serviços.
- Não tocar nos componentes que consomem os serviços.

## Tarefas detalhadas

### 1. Criar `BaseHttpService`

Arquivo: `src/app/core/services/http/base-http.service.ts`.

Esboço de API (não copie literalmente; adapte):

- Construtor recebe `HttpClient`.
- `protected baseUrl = environment.apiUrl;`
- Método `protected resolve(path: string, params?: Record<string, string | number>): string` que faz substituição `{key}` → `value` e concatena com `baseUrl`.
- Métodos protected: `get<T>(path, options?)`, `post<T>(path, body?, options?)`, etc., que chamam `this.http.<verb>` e usam `this.resolve(...)`.

Decisão de design: **composição** (injetar BaseHttpService nos services concretos) **ou** **herança** (`extends BaseHttpService`). Recomendar **herança** por simplicidade e por o Angular suportar bem `@Injectable` com `inject()` na superclasse.

### 2. Migrar cada service

Para cada arquivo em `core/services/requests/` (exceto `index.ts`):

- `extends BaseHttpService`.
- Remover `private readonly http: HttpClient` e `import { environment }`.
- Substituir chamadas:
  - `this.http.get<T>(\`${environment.apiUrl}${ApiRoutes.X}\`)` → `this.get<T>(ApiRoutes.X)`.
  - `\`${environment.apiUrl}${ApiRoutes.TICKETBOOK_GET_BY_NUMBER}\`.replace('{idLottery}', id).replace('{numberTicketbook}', n)` → `this.get<T>(ApiRoutes.TICKETBOOK_GET_BY_NUMBER, { idLottery: id, numberTicketbook: n })`.

### 3. `auth.service.ts` é caso especial

Tem signal de estado e lógica de token. Manter a lógica; só usar o helper para a chamada HTTP. **Não** quebrar a API pública (`authenticate`, `getToken`, `isAuthenticated`, etc.).

### 4. Validação

- Os componentes não precisam mudar — verificar que continuam compilando.
- `npm run build:prod` passa.
- `npm test` passa.
- Em runtime, fluxo completo (login → seleção de instituição → criação/listagem de rifa) continua funcionando.

## Critérios de aceite

- [ ] `BaseHttpService` criado, com placeholder substitution.
- [ ] Todos os 13 services em `core/services/requests/` migrados.
- [ ] Nenhum `import { environment }` em `core/services/requests/*`.
- [ ] Build e testes passam.
- [ ] Nenhuma alteração em components/templates além do necessário (idealmente zero).
