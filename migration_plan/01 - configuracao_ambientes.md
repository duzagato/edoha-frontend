# Etapa 01 — Configuração de ambientes (local / dev / hom / prod)

- **Pré-requisitos**: nenhum.
- **Dificuldade para IA**: Média.

## Contexto

Hoje o projeto possui apenas dois arquivos de ambiente:

- `src/environments/environment.ts` (default / local)
- `src/environments/environment.prod.ts`

Ambos com a mesma `apiUrl: 'https://localhost:7021'`, e o `angular.json` **não** declara `fileReplacements`, ou seja, mesmo a build de produção continua usando `environment.ts`. Precisamos:

1. Suportar quatro ambientes: `local`, `dev`, `hom`, `prod`.
2. Permitir que ao rodar/buildar o projeto seja injetada uma variável indicando o ambiente atual e, com base nela, sejam selecionadas as configurações certas.
3. Manter o consumo nos serviços (`environment.apiUrl`) o mais transparente possível — idealmente, só trocando o import.

## Escopo desta etapa

✅ Deve fazer:
- Criar um arquivo de configuração por ambiente.
- Configurar `angular.json` para injetar o arquivo certo em cada `configuration`.
- Adicionar scripts npm por ambiente.
- Garantir que o app exponha o nome do ambiente em runtime (para logs / debug / sentry futuro).

❌ Não deve fazer:
- Não alterar a infraestrutura (S3, CloudFront) — isso é etapa 03.
- Não alterar o build pipeline AWS — isso é etapa 04.
- Não trocar a `apiUrl` dos serviços (eles devem continuar lendo `environment.apiUrl`).

## Tarefas detalhadas

### 1. Criar arquivos de ambiente

Em `src/environments/`, manter/criar:

- `environment.ts` — usado por `local` e como fallback (default).
- `environment.dev.ts`
- `environment.hom.ts`
- `environment.prod.ts`

Cada arquivo deve exportar a constante `environment` com **a mesma forma (shape) tipada**. Sugestão de campos:

- `name`: `'local' | 'dev' | 'hom' | 'prod'`.
- `production`: `boolean`.
- `apiUrl`: `string`.
- `featureFlags?`: objeto reservado para flags futuras (pode iniciar `{}`).

Definir uma `interface Environment` (ex.: `src/environments/environment.model.ts`) e tipar os quatro arquivos com ela, para garantir que todos tenham os mesmos campos.

Valores iniciais sugeridos (ajustar com o time depois):

- `local.apiUrl = 'https://localhost:7021'`
- `dev.apiUrl = 'https://api-dev.edoha.<dominio>'`
- `hom.apiUrl = 'https://api-hom.edoha.<dominio>'`
- `prod.apiUrl = 'https://api.edoha.<dominio>'`

> Os domínios reais devem ficar em comentário `TODO` para preencher na etapa 03; aqui deixe placeholders coerentes.

### 2. Configurar `angular.json` com `fileReplacements`

Em `architect.build.configurations`:

- Manter a configuration `production` já existente, mas trocando seu `fileReplacements` para `environment.prod.ts`.
- Criar novas configurations: `development` (já existe; passar a usar `environment.dev.ts`), `homologation` (substituir por `environment.hom.ts`), e manter `local` como default sem replacement (usa `environment.ts`).
- Em cada configuration produtiva, manter os `budgets` já existentes da `production`.

Em `architect.serve.configurations`:

- Adicionar entradas correspondentes (`development`, `homologation`, `production`) apontando para os respectivos `buildTarget`.
- Manter `defaultConfiguration: development` no serve para não quebrar `ng serve`.

### 3. Scripts npm

Em `package.json`, adicionar:

- `start` → `ng serve` (mantém local, default).
- `start:dev` → `ng serve --configuration=development`.
- `start:hom` → `ng serve --configuration=homologation`.
- `start:prod` → `ng serve --configuration=production`.
- `build` → `ng build` (mantém atual).
- `build:dev` → `ng build --configuration=development`.
- `build:hom` → `ng build --configuration=homologation`.
- `build:prod` → `ng build --configuration=production`.

### 4. Expor o ambiente em runtime

- Garantir que `environment.name` esteja preenchido em cada arquivo.
- Em `app.config.ts` (ou similar), logar uma única vez no boot (`if (!environment.production) console.info('[env]', environment.name)`).
- **Não** colocar `console.log` em produção.

### 5. Validação

- Rodar `npm run build:dev`, `npm run build:hom` e `npm run build:prod` e confirmar que cada build gera bundle sem erros.
- Rodar `npm test` (se houver testes que importam `environment`, devem continuar passando).
- Confirmar que `import { environment } from '.../environment'` continua funcionando em todos os serviços (a substituição é feita pelo Angular CLI; nenhum import precisa mudar).

## Critérios de aceite

- [ ] Existem 4 arquivos de ambiente tipados pela mesma interface.
- [ ] `angular.json` tem `fileReplacements` corretos para `dev`, `hom` e `prod`.
- [ ] Existem 4 scripts de `start:*` e 4 de `build:*` no `package.json`.
- [ ] Build de cada configuração roda sem erros.
- [ ] `environment.name` aparece corretamente conforme a configuração escolhida (validar via `console.info` em build não-prod).
- [ ] Documentar no `README.md` (seção curta) como rodar cada ambiente.
