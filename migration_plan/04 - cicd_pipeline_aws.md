# Etapa 04 — Pipeline CI/CD por ambiente

- **Pré-requisitos**: Etapas 01, 02 e 03 concluídas.
- **Dificuldade para IA**: Alta.

## Contexto

Com builds por ambiente (Etapa 01) e infra provisionada (Etapa 03), falta automatizar o deploy. O repositório está no GitHub, então a escolha natural é **GitHub Actions** com OIDC para AWS (sem secret de access key).

Estratégia de branches sugerida:

- `main` → deploy automático em `dev`.
- Tag `v*-hom` → deploy em `hom`.
- Tag `v*` (sem sufixo) → deploy em `prod` com aprovação manual (Environment Protection).

## Escopo desta etapa

✅ Deve fazer:
- Workflow GitHub Actions em `.github/workflows/deploy.yml` (ou um por env).
- Configurar OIDC: criar role IAM via Terraform na Etapa 03 ou referenciar manualmente aqui (documentar).
- Build com `npm ci` + `npm run build:<env>` + `aws s3 sync` + `aws cloudfront create-invalidation`.
- Lint/test rodando antes do deploy (gate).

❌ Não deve fazer:
- Não fazer push de credenciais.
- Não rodar deploy em PRs (apenas `push`/`tag`).

## Tarefas detalhadas

### 1. OIDC

Em `infra/` adicionar (módulo `iam-github-oidc/`):

- `aws_iam_openid_connect_provider` para `token.actions.githubusercontent.com`.
- Role IAM por ambiente, com `assume_role_policy` restrito a `repo:duzagato/edoha-frontend:ref:refs/heads/main` (dev), tag pattern (hom/prod).
- Política inline com permissões mínimas: `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket` no bucket do env, e `cloudfront:CreateInvalidation` na distribuição do env.

### 2. Workflow

Arquivo `.github/workflows/deploy.yml` com 3 jobs:

#### Job `build-test`

- Roda em `push` para `main` e em tags `v*`.
- Steps:
  - `actions/checkout@v4`.
  - `actions/setup-node@v4` com `node-version-file: .nvmrc` (criar `.nvmrc` se não existir, com a versão do `engines.node`).
  - `npm ci`.
  - `npm test -- --watch=false --browsers=ChromeHeadless` (se houver testes; caso contrário, comentar com TODO).
  - Upload do diretório `dist/` como artifact.

#### Job `deploy-dev`

- `needs: build-test`, condição `github.ref == 'refs/heads/main'`.
- `environment: dev`.
- Steps: configure AWS via OIDC (`aws-actions/configure-aws-credentials@v4`), download artifact, `aws s3 sync dist/edoha-frontend/browser/ s3://${{ vars.S3_BUCKET }} --delete`, `aws cloudfront create-invalidation --distribution-id ${{ vars.CF_DISTRIBUTION_ID }} --paths '/*'`.

#### Jobs `deploy-hom` e `deploy-prod`

- Triggers por tag.
- `environment: hom` / `prod` com **required reviewers** em `prod`.
- Mesmo pattern de deploy.

### 3. Secrets/Vars

- Por ambiente (GitHub Environment), definir **vars** (não secrets):
  - `AWS_REGION`
  - `AWS_ROLE_ARN`
  - `S3_BUCKET`
  - `CF_DISTRIBUTION_ID`
- Nenhum secret de chave AWS estática deve existir.

### 4. Build configurations

- `deploy-dev` usa `npm run build:dev`.
- `deploy-hom` usa `npm run build:hom`.
- `deploy-prod` usa `npm run build:prod`.

### 5. Documentação

Atualizar `infra/README.md` (ou criar `docs/deploy.md`) com:

- Como criar uma tag de release.
- Como aprovar deploy em prod.
- Como reverter (re-tag de versão anterior + re-run).

### 6. Validação

- `act` ou push em branch de teste para validar dry-run.
- Confirmar que o invalidation chega ao CloudFront.
- Confirmar que `index.html` tem `Cache-Control` curto e os assets `*.hashed.js/css` têm cache de 1 ano.

## Critérios de aceite

- [ ] `.github/workflows/deploy.yml` cobre os três ambientes.
- [ ] OIDC configurado e role mínima por env.
- [ ] Tags acionam deploy de hom/prod; push em `main` aciona dev.
- [ ] Prod exige aprovação humana.
- [ ] `dist/` é publicado e o invalidation é criado.
- [ ] Documentação de release atualizada.
