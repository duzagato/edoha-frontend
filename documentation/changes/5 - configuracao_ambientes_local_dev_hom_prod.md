# 5 — Configuração de ambientes (local / dev / hom / prod)

## O que foi alterado

### `src/environments/environment.model.ts` (novo)
Interface `Environment` com os campos `name`, `production`, `apiUrl` e `featureFlags`. Garante que todos os arquivos de ambiente tenham o mesmo shape tipado.

### `src/environments/environment.ts` (atualizado)
Tipado com `Environment`. Agora inclui `name: 'local'` e `featureFlags: {}`.

### `src/environments/environment.dev.ts` (novo)
Ambiente de desenvolvimento. `apiUrl` com placeholder; marcado com `TODO (etapa 03)` para preenchimento do domínio real.

### `src/environments/environment.hom.ts` (novo)
Ambiente de homologação. Mesmo padrão do dev.

### `src/environments/environment.prod.ts` (atualizado)
Tipado com `Environment`. `name: 'prod'`, `production: true`, `apiUrl` com placeholder para domínio de produção.

### `angular.json` (atualizado)
- `build.configurations.production`: adicionado `fileReplacements` para `environment.prod.ts`.
- `build.configurations.development`: adicionado `fileReplacements` para `environment.dev.ts`.
- `build.configurations.homologation` (nova): `fileReplacements` para `environment.hom.ts`; mantém `budgets` da production; `optimization: false` e `sourceMap: true`.
- `serve.configurations.homologation` (nova): aponta para `build:homologation`.

### `package.json` (atualizado)
Novos scripts:
- `start:dev`, `start:hom`, `start:prod`
- `build:dev`, `build:hom`, `build:prod`

### `src/app/app.config.ts` (atualizado)
Importa `environment` e loga `console.info('[env]', environment.name)` no boot, apenas em ambientes não-produção.

## Por que foi alterado

Tarefa `01 - configuracao_ambientes.md` do backlog. O projeto só tinha dois arquivos de ambiente sem `fileReplacements` configurados, tornando impossível selecionar configurações distintas por ambiente no build. A mudança habilita builds independentes para dev, hom e prod.

## Validação

- `npm run build:dev` ✅
- `npm run build:hom` ✅ (warning de budget esperado: bundle não minificado)
- `npm run build:prod` ✅
