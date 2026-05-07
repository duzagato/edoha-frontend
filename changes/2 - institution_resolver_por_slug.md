# 2 - Institution Resolver por Slug

## O que foi feito

### Novo modelo
- **`InstitutionPublicDTO`** adicionado em `core/models/institution/institution.dto.ts`  
  Representa o response público da instituição (campos: `id`, `name`, `slugName`, `shortName`, `description`, `logoDirectory`, `createdAt`, `createdBy`).  
  Re-exportado automaticamente via `index.ts` existente.

### Constantes atualizadas
- **`api-routes.ts`**: nova constante `INSTITUTION_GET_BY_SLUG = '/institution'` para o endpoint `GET /institution/{slug}`.
- **`cache-keys.ts`**: nova constante `INSTITUTION_STORAGE_PREFIX = 'institution'` usada como prefixo da chave no `sessionStorage` (`institution.{slug}`).

### InstitutionService atualizado
- **`getBySlug(slug: string): Observable<InstitutionPublicDTO>`** adicionado em `core/services/requests/institution.service.ts`.  
  Faz `GET {BASE_URL}/institution/{slug}`.

### Novo serviço InstitutionResolverService
- **`core/services/institution-resolver.service.ts`** criado com três responsabilidades:
  - **`init()`**: escuta eventos `NavigationEnd` do `Router`; a cada navegação extrai o slug e, se não houver cache, busca na API e armazena no `sessionStorage`.
  - **`extractSlug(): string`**: lê `window.location.hostname`, extrai o subdomínio antes de `.edoha.`, remove prefixo `www.`, retorna `'edoha'` se vazio.
  - **`getFromStorage(slug): InstitutionPublicDTO | null`**: lê e desserializa o JSON do `sessionStorage` para a chave `institution.{slug}`.

### App raiz atualizado
- **`app.ts`**: chama `InstitutionResolverService.init()` no `constructor()`, garantindo que o listener de rotas seja registrado na inicialização da aplicação.

## Comportamento em runtime

| Hostname | Slug extraído |
|---|---|
| `edoha.com` | `edoha` |
| `www.edoha.com` | `edoha` |
| `abc.edoha.com` | `abc` |
| `localhost` | `edoha` |

A cada navegação, a chave `institution.{slug}` é verificada no `sessionStorage`. Se ausente, `GET /institution/{slug}` é chamado e o resultado é armazenado — evitando chamadas repetidas nas navegações seguintes.
