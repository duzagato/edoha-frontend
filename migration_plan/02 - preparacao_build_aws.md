# Etapa 02 — Preparação do build para AWS

- **Pré-requisitos**: Etapa 01 (configuração de ambientes) concluída.
- **Dificuldade para IA**: Média.

## Contexto

O projeto é um SPA Angular 21 que atualmente só foi rodado localmente. Para hospedar como site estático na AWS (S3 + CloudFront, Etapa 03) algumas coisas precisam ser ajustadas **dentro do projeto** antes da infra existir:

- O `angular.json` aponta para `input: "public"` em `assets`, mas o projeto **não tem pasta `public/`** na raiz; só `src/assets`. Isso gera warning/erro em build limpo (avaliar e corrigir).
- A `index.html` precisa de um `<base href="/">` adequado para SPA hospedado em raiz de domínio.
- Não há `robots.txt`, `favicon.ico` na raiz pública, nem manifest.
- O hash de saída (`outputHashing: all`) já está em produção — bom para cache busting via CloudFront.
- Não há configuração de CSP/headers (esses entrarão na Etapa 03).

## Escopo desta etapa

✅ Deve fazer:
- Garantir que `ng build --configuration=<env>` produza um `dist/` pronto para servir como estático.
- Limpar a configuração de `assets` no `angular.json`.
- Adicionar `base href` correto.
- Adicionar `robots.txt` e `favicon` se ausentes.
- Documentar o conteúdo de `dist/edoha-frontend/browser/` que será publicado.

❌ Não deve fazer:
- Não criar Dockerfile (não usaremos container; será S3 estático).
- Não criar pipeline CI/CD — Etapa 04.
- Não criar buckets/distribuições AWS — Etapa 03.

## Tarefas detalhadas

### 1. Corrigir `assets` no `angular.json`

- Remover a entrada que aponta para `public` se a pasta não existir, **ou** criar a pasta `public/` com `favicon.ico`, `robots.txt` e (opcional) `manifest.webmanifest`. Escolher uma das duas; a recomendação é **criar `public/`** porque é o padrão atual do Angular CLI 17+.
- Manter a entrada que copia `src/assets` → `/assets`.

### 2. `index.html`

- Garantir `<base href="/">` (já existe? confirmar; se não, adicionar).
- Garantir `<title>` e `<meta name="description">` adequados.
- Garantir `<meta name="viewport" content="width=device-width, initial-scale=1">`.

### 3. SPA fallback

Preparar o build para o roteamento client-side funcionar quando o usuário entrar direto em uma rota como `/rifas/onix/resumo`. O fallback real será configurado no CloudFront (Etapa 03), mas precisamos validar que:

- Todas as rotas em `src/app/app.routes.ts` funcionam com `provideRouter(routes)` no modo HTML5 (não hash).
- A rota wildcard `path: '**'` redireciona corretamente para `''`.
- Documentar em comentário no `app.routes.ts` que isso depende do CloudFront retornar `index.html` para 404.

### 4. Variáveis de ambiente em runtime (opcional, recomendado)

Se quisermos um único bundle por release que sirva múltiplos ambientes (não é o cenário escolhido, mas vale registrar):

- Esta etapa **não** implementa runtime config, apenas registra como decisão arquitetural: usaremos **build-time replacement** (Etapa 01).
- Adicionar comentário em `environment.model.ts` documentando que a estratégia é build-per-env.

### 5. `package.json`

- Adicionar `engines` com a versão de Node usada (ex.: `"node": ">=20.11"`), para o pipeline CI fixar.
- Garantir que `"private": true` continua presente.

### 6. Validação

- Rodar cada build (`build:dev`, `build:hom`, `build:prod`) e verificar:
  - `dist/edoha-frontend/browser/index.html` existe e referencia os bundles.
  - Não há warnings de assets faltando.
  - O bundle `prod` está abaixo de 5MB (limite atual).
- Servir `dist/edoha-frontend/browser/` localmente com qualquer servidor estático (`npx http-server dist/edoha-frontend/browser -p 8080 --proxy http://localhost:8080?`) e verificar que rotas profundas funcionam quando o servidor faz fallback para `index.html`.

## Critérios de aceite

- [ ] `angular.json` não referencia caminhos inexistentes.
- [ ] `index.html` tem `<base href="/">`, título, viewport e meta description.
- [ ] Pasta `public/` existe com `favicon.ico` e `robots.txt`.
- [ ] `package.json` tem `engines.node` definido.
- [ ] Os três builds (`dev`, `hom`, `prod`) passam sem erros nem warnings de asset.
- [ ] Testado localmente via servidor estático com SPA fallback.
