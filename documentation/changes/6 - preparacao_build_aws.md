# 6 — Preparação do build para AWS

## O que foi alterado

### `public/` (pasta nova)
Criada a pasta `public/` na raiz do projeto, padrão do Angular CLI 17+, para hospedar arquivos estáticos servidos na raiz do site. O `angular.json` já referenciava esse caminho; agora a pasta existe.

**`public/robots.txt`** — bloqueia indexação das rotas autenticadas (`/login`, `/institution`).

**`public/favicon.svg`** — favicon SVG placeholder com a letra "E" em azul. Deve ser substituído pelo ícone oficial do Edoha.

### `src/index.html`
- Título corrigido de `Edohafe` para `Edoha`.
- Adicionado `<meta name="description">` com descrição da plataforma.
- `<link rel="icon">` atualizado de `favicon.ico` para `favicon.svg`.
- `<base href="/">` e `<meta name="viewport">` já estavam presentes — mantidos.

### `src/app/app.routes.ts`
Adicionado comentário na rota wildcard (`path: '**'`) documentando que o fallback server-side (404 → `index.html`) deve ser configurado no CloudFront na Etapa 03.

### `src/environments/environment.model.ts`
Adicionado comentário documentando a decisão arquitetural de usar **build-per-env** (um bundle por ambiente via `fileReplacements`) em vez de runtime config.

### `package.json`
Adicionado campo `engines` com `"node": ">=22.0.0"` para que o pipeline CI/CD (Etapa 04) possa fixar a versão de Node.

## Validação

- `npm run build:dev` ✅ — sem warnings de asset
- `npm run build:hom` ✅ — warning de budget esperado (bundle não minificado)
- `npm run build:prod` ✅ — sem warnings de asset
- `dist/edoha-frontend/browser/` contém: `index.html`, `favicon.svg`, `robots.txt`, bundles com hash

## Por que foi alterado

Tarefa `02 - preparacao_build_aws.md` do backlog. Deixa o `dist/` pronto para ser publicado como site estático no S3, requisito da Etapa 03.
