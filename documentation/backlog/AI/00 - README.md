# Plano de Migração / Limpeza Técnica — edoha-frontend

> Documento índice. **Não é uma etapa executável**, apenas orienta a ordem e o escopo.

## Contexto

Stack: Angular 21 (standalone, zoneless), PrimeNG 21, Bootstrap 5, RxJS 7.8, Signals.
Branch base de análise: `instituicao-dinamica`.

## Objetivos macro

1. **Subir o frontend para a AWS** (etapas 02 e 03, com automação na 04).
2. **Configurações multi-ambiente** local / dev / hom / prod (etapa 01).
3. **Remoção de duplicidade, verbosidade e código morto** (etapas 05, 06, 07, 08, 09).
4. **Revisão de CSS** (etapas 10 e 11).

## Como usar este plano

- Cada arquivo `NN - *.md` é um **prompt completo e independente** para uma IA executar.
- Cada arquivo declara, no topo:
  - **Pré-requisitos**: etapas que precisam estar concluídas antes.
  - **Dificuldade para IA**: `Baixa`, `Média` ou `Alta`.
  - **Escopo**: o que faz parte e o que **não** faz parte.
- Sempre que possível, etapas estão desacopladas para permitir execução paralela.

## Ordem recomendada

| #  | Etapa                                                | Pré-req         | Dificuldade |
|----|------------------------------------------------------|-----------------|-------------|
| 01 | Configuração de ambientes                            | —               | Média       |
| 02 | Preparação do build para AWS                         | 01              | Média       |
| 03 | Infraestrutura AWS (S3 + CloudFront)                 | 02              | Alta        |
| 04 | Pipeline CI/CD por ambiente                          | 01, 02, 03      | Alta        |
| 05 | Limpeza de código não utilizado                      | —               | Baixa       |
| 06 | Refatoração: BaseHttpService                         | —               | Média       |
| 07 | Extração de validadores e utilitários compartilhados | —               | Baixa       |
| 08 | Refatoração do `DevolucaoComponent`                  | 07              | Média       |
| 09 | Padronização de tratamento de erros HTTP             | 06              | Média       |
| 10 | Revisão de CSS global (`src/scss`, `styles.scss`)    | —               | Baixa       |
| 11 | Revisão de CSS por componente                        | 10              | Média       |

Etapas 05, 06, 07, 10 podem ser feitas em paralelo às etapas de AWS (01–04).
