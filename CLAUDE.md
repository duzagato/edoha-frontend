# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
ng serve          # Dev server at http://localhost:4200
ng build          # Production build → dist/
ng test           # Unit tests (Karma + Jasmine)
ng generate component features/<module>/<name>  # Scaffold component
```

## Stack

- **Angular 21** — standalone components only, **zoneless** change detection (`provideZonelessChangeDetection`)
- **PrimeNG 21 + Bootstrap 5** — UI components and layout utilities
- **RxJS 7.8** — async patterns; services return `Observable`
- **Angular Signals** — component state uses `signal<T>()`; no NgRx

Prettier: `singleQuote`, `printWidth: 100`, Angular parser for HTML.

## Architecture

### Folder structure intent

```
src/app/
├── core/
│   ├── guards/           # authGuard (functional)
│   ├── interceptors/     # authInterceptor (functional, attaches JWT)
│   ├── models/           # DTOs and interfaces, one folder per entity, re-exported via index.ts
│   └── services/
│       ├── requests/     # One HTTP service per backend controller (CRUD)
│       └── *.service.ts  # Higher-level services (e.g. LotteryStorageService)
├── features/             # One folder per domain (auth, user, lottery, institution)
│   └── <domain>/
│       ├── gerenciar/    # List/manage view
│       ├── adicionar/    # Create view
│       ├── editar/       # Edit view
│       └── detail/       # Sub-views scoped to a specific entity
├── layouts/default/      # Shell with header + sidebar; wraps all authenticated routes
└── shared/
    ├── components/       # Reusable UI (e.g. confirm-dialog)
    ├── constants/        # ApiRoutes, CacheKeys, StatusTicketbook enum, menu-options
    ├── directives/       # PhoneMaskDirective
    └── services/         # CustomValidatorsService
```

### Routing

```
/login                          → LoginComponent (public)
/institution                    → InstitutionComponent (post-login institution picker)
/ (DefaultLayoutComponent)      → authenticated shell
  /                             → HomeComponent
  /usuarios/gerenciar           → user list
  /usuarios/adicionar           → add user
  /usuarios/editar/:id          → edit user
  /rifas/gerenciar              → lottery list
  /rifas/adicionar              → add lottery
  /rifas/:nameLottery/resumo    → lottery summary
  /rifas/:nameLottery/gerenciar → ticketbook management
  /rifas/:nameLottery/talao/retirada   → register ticketbook withdrawal
  /rifas/:nameLottery/talao/devolucao  → register ticketbook return + ticket sales
```

`authGuard` protects all routes except `/login`. The `:nameLottery` param is the **URL-encoded lottery name**, not its ID.

### Authentication & session data

- JWT stored in `sessionStorage` under key `edoha_jwt_token`
- Selected institution ID stored in `localStorage` under key `idInstitution`
- `AuthService` decodes JWT client-side (no library) to check expiry and extract claims
- `authInterceptor` adds `Authorization: Bearer <token>` to every request; on 401 it calls `logout()` and navigates to `/login`

### Key patterns

**LotteryStorageService** — wraps `LotteryService` with `localStorage` caching keyed by lottery name (`lottery.<nameLottery>`). Components in the `/rifas/:nameLottery/*` tree call this instead of `LotteryService` directly to avoid repeated API calls.

**HTTP services** (`core/services/requests/`) — thin wrappers around `HttpClient` using `ApiRoutes` constants and `environment.apiUrl`. They do not cache.

**TicketbookService.withdraw / .returnedById / .create** — the withdrawal flow (`retirada`) calls `withdraw()` to POST a new ticketbook with `idStatusTicketbook = Retirado (1)`. The return flow (`devolucao`) chains `TicketService.create()` (saves sold tickets) → `returnedById()` (marks ticketbook as returned) using `concatMap`.

**StatusTicketbook enum**: `Retirado = 1`, `Devolvido = 2`.

### Backend

ASP.NET Core API at `https://localhost:7021` (dev). All routes are in `src/app/shared/constants/api-routes.ts`.

## Change Logging (MANDATORY)

After **every** response that modifies any file in this repository, you MUST create or update a changelog file inside the `documentation/changes/` folder.

**Rules:**
- **One file per user prompt** — if a single prompt causes multiple changes, document all of them in the same file (create it at the start or end, editing as you go).
- **Naming convention:** `{N} - {titulo_alteracao}.md`, where `N` is the total number of existing `.md` files in `documentation/changes/` plus one. Example: if there are already 3 `.md` files, the new file is `4 - {titulo}.md`.
- **Content:** describe what was changed and why, in enough detail that a future reader understands the scope without reading the diff.
- This requirement applies even to small, single-file edits. Skipping it is not allowed.

## Backlog (AI-driven tasks)

The `documentation/backlog/` folder contains task files organized into two subfolders:

- `documentation/backlog/AI/` — task files (`.md`) describing work to be done by Claude.
- `documentation/backlog/Human/` — output files created by Claude to describe actions the user must take manually.

**Workflow when instructed to read a backlog AI task:**
1. Always read `documentation/backlog/AI/readme.md` first, then read the specified task file.
2. Execute the task as described.
3. If any part of the task requires manual intervention by the user, create a `.md` file in `documentation/backlog/Human/` explaining exactly what the user needs to do to complete the task. Only create this file if human action is truly required.
