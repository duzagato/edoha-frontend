# Ações humanas pendentes — Etapa 01: Configuração de ambientes

## O que precisa ser feito

### 1. Preencher os domínios reais das APIs

Os arquivos de ambiente abaixo contêm placeholders que precisam ser substituídos pelos domínios reais assim que a infraestrutura AWS estiver configurada (etapa 03):

| Arquivo | Campo `apiUrl` atual | O que preencher |
|---|---|---|
| `src/environments/environment.dev.ts` | `https://api-dev.edoha.<dominio>` | URL real da API de dev |
| `src/environments/environment.hom.ts` | `https://api-hom.edoha.<dominio>` | URL real da API de hom |
| `src/environments/environment.prod.ts` | `https://api.edoha.<dominio>` | URL real da API de prod |

> Remova o comentário `// TODO (etapa 03)` ao preencher cada arquivo.

### 2. (Opcional) Documentar no README

A tarefa pede uma seção curta no `README.md` explicando como rodar cada ambiente. Sugestão de conteúdo:

```markdown
## Ambientes

| Comando | Ambiente |
|---|---|
| `npm start` | Local (`https://localhost:7021`) |
| `npm run start:dev` | Dev |
| `npm run start:hom` | Homologação |
| `npm run build:dev` | Build dev |
| `npm run build:hom` | Build homologação |
| `npm run build:prod` | Build produção |
```

## Quando fazer

- Domínios: após concluir a **etapa 03** (infraestrutura AWS S3 + CloudFront).
- README: pode ser feito a qualquer momento.
