# Etapa 03 — Infraestrutura AWS (S3 + CloudFront)

- **Pré-requisitos**: Etapa 02 (build pronto para hospedagem estática) concluída.
- **Dificuldade para IA**: Alta.

## Contexto

O frontend será hospedado como site estático na AWS, um bucket S3 por ambiente, fronteado por CloudFront. Esta etapa documenta **a infra**, mas o entregável no repositório é apenas:

1. **IaC** (recomendado: Terraform; alternativa: AWS CDK em TypeScript). Mantém o código de infraestrutura versionado junto ao app.
2. **Documentação** em `migration_plan/aws/README.md` com o passo a passo manual caso o time prefira clicar no console em algum momento.
3. **Configuração de SPA fallback** no CloudFront.

> A IA executora deve **escolher uma ferramenta** (Terraform ou CDK) e ser consistente. A recomendação padrão é **Terraform** por ser agnóstico e simples para esse escopo.

## Escopo desta etapa

✅ Deve fazer:
- Criar pasta `infra/` na raiz com módulo Terraform por ambiente (`dev`, `hom`, `prod`).
- Provisionar: bucket S3 (privado), Origin Access Control, distribuição CloudFront, certificado ACM (somente para `hom`/`prod`), record Route53 (se domínio gerenciado lá).
- Configurar custom error responses no CloudFront: 403 e 404 → `/index.html` com 200 (SPA fallback).
- Configurar cache: HTML curto (≤ 60s), assets imutáveis (1 ano) baseando-se no `outputHashing: all`.
- Definir headers de segurança via CloudFront Response Headers Policy: HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, e CSP estrito o suficiente para PrimeNG.

❌ Não deve fazer:
- Não criar pipeline (etapa 04).
- Não publicar no app secrets ou ARNs reais — usar variáveis Terraform.
- Não mexer em backend (`https://localhost:7021` etc.) — fora de escopo.

## Tarefas detalhadas

### 1. Estrutura de pastas

```
infra/
  README.md
  modules/
    static-site/        # módulo reutilizável: S3 + OAC + CloudFront + cache + WAF opcional
  envs/
    dev/
      main.tf
      variables.tf
      terraform.tfvars.example
    hom/
    prod/
```

### 2. Módulo `static-site`

Recursos:

- `aws_s3_bucket` privado, com `aws_s3_bucket_public_access_block` bloqueando tudo.
- `aws_s3_bucket_ownership_controls` em `BucketOwnerEnforced`.
- `aws_cloudfront_origin_access_control` (OAC, sigv4).
- `aws_cloudfront_distribution`:
  - `default_root_object = "index.html"`.
  - Origin: bucket S3 com OAC.
  - `viewer_protocol_policy = "redirect-to-https"`.
  - `custom_error_response` para 403 e 404 retornando `/index.html` com `response_code = 200` e `error_caching_min_ttl = 0`.
  - Cache policy: `Managed-CachingOptimized` para assets; cache policy custom (TTL=0/60) para `index.html`.
  - Response headers policy custom (ver item 4).
- `aws_s3_bucket_policy` permitindo apenas a distribuição (via OAC) ler.

### 3. Variáveis por ambiente

Cada `envs/<env>/variables.tf` deve ter:

- `environment` (`dev`/`hom`/`prod`).
- `domain_name` (ex.: `app-dev.edoha.<dominio>`). Em `dev` pode usar o domínio default do CloudFront e deixar `domain_name = null`.
- `acm_certificate_arn` (somente `hom`/`prod`, em `us-east-1`).
- `route53_zone_id` (opcional).
- `tags` (mapa).

### 4. Headers de segurança

Criar `aws_cloudfront_response_headers_policy` com:

- `strict_transport_security`: max-age 1 ano, includeSubdomains, preload (somente prod/hom).
- `content_type_options`: nosniff.
- `referrer_policy`: `strict-origin-when-cross-origin`.
- `frame_options`: `DENY`.
- `xss_protection`: `1; mode=block`.
- `content_security_policy`: começar com `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' <apiUrl-do-ambiente>;`. **Validar** com PrimeNG (que usa style inline) e ajustar até a UI funcionar 100%.

### 5. Output

Cada env deve expor como output:

- `cloudfront_distribution_id`
- `bucket_name`
- `cloudfront_domain_name`

Esses valores serão consumidos pela Etapa 04 (CI/CD) para `aws s3 sync` + `aws cloudfront create-invalidation`.

### 6. Documentação

Criar `infra/README.md` explicando:

- Pré-requisitos (AWS CLI, Terraform ≥ 1.6, conta + role).
- Como inicializar e aplicar (`cd infra/envs/dev && terraform init && terraform apply`).
- Onde pegar o ARN do certificado ACM (lembrar que precisa ser `us-east-1`).
- Como configurar o DNS final.

### 7. Validação

- `terraform validate` em cada ambiente passa.
- `terraform plan` em `dev` produz plano coerente.
- (Manualmente, quando aplicado) acessar `https://<cloudfront-domain>/rifas/qualquer-coisa` retorna `index.html` (SPA fallback).
- Headers de segurança aparecem em `curl -I`.

## Critérios de aceite

- [ ] Estrutura `infra/` criada com módulo e três envs.
- [ ] Configurações por ambiente parametrizadas via `terraform.tfvars`.
- [ ] Custom error response 403/404 → `/index.html` (200) configurado.
- [ ] Headers de segurança definidos via policy.
- [ ] `infra/README.md` documenta apply e destroy.
- [ ] `terraform validate` passa em todos os envs.
