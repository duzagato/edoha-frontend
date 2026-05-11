# 3 - Criação do plano de migração técnica

## Resumo

Criada a pasta `migration_plan/` na raiz do projeto contendo a documentação completa das etapas necessárias para resolver os débitos técnicos atuais. Cada arquivo `.md` foi escrito como prompt independente para ser executado por uma IA, declarando pré-requisitos e nível de dificuldade.

## Arquivos adicionados

- `migration_plan/00 - README.md` — índice com objetivos macro, ordem recomendada e dificuldade por etapa.
- `migration_plan/01 - configuracao_ambientes.md` — múltiplos ambientes (`local`, `dev`, `hom`, `prod`), `fileReplacements`, scripts `start:*` e `build:*`, exposição do `environment.name` em runtime.
- `migration_plan/02 - preparacao_build_aws.md` — limpeza de assets, `<base href>`, `engines.node`, validação local com servidor estático.
- `migration_plan/03 - infraestrutura_aws_s3_cloudfront.md` — IaC (Terraform) com módulo `static-site` + envs separados, custom error responses para SPA fallback, headers de segurança.
- `migration_plan/04 - cicd_pipeline_aws.md` — GitHub Actions com OIDC, deploy por env disparado por push/tag, aprovação manual em prod.
- `migration_plan/05 - limpeza_codigo_nao_utilizado.md` — `LotteryMockService` órfão, `console.log`s, imports não usados, duplicação de `submitting.set(true)`, `confirm()` nativo, `any` evitável.
- `migration_plan/06 - refatoracao_servicos_http_base.md` — `BaseHttpService` com substituição de placeholders, migração dos 13 services.
- `migration_plan/07 - extracao_validadores_e_utilitarios_compartilhados.md` — `holderPairValidator` compartilhado, `NotificationService` sobre `MessageService`.
- `migration_plan/08 - refatoracao_devolucao_component.md` — quebra do `DevolucaoComponent` (271 linhas) com extração de `TicketbookReturnService`, correção do reset prematuro do form.
- `migration_plan/09 - padronizacao_tratamento_erros_http.md` — `extractErrorMessage`, interceptor tratando 5xx/0, padronização de toasts de erro.
- `migration_plan/10 - revisao_css_global.md` — auditoria de `_palettes.scss` (310 linhas para ~30), remoção do seletor global `i { ... }`.
- `migration_plan/11 - revisao_css_componentes.md` — extração de `_form-page.scss`, eliminação de duplicação entre `devolucao.scss` e `retirada.component.scss`, decisão sobre `venda.component.scss`.

## Por que

O usuário pediu um plano de tech-lead/PO para destrinchar quatro frentes de débito técnico (deploy AWS, configurações multi-ambiente, limpeza de código, revisão de CSS) em prompts atômicos consumíveis por outra IA, com pré-requisitos e dificuldade explícitos. A pasta e os arquivos atendem literalmente esse pedido sem alterar nada em código de produção.
