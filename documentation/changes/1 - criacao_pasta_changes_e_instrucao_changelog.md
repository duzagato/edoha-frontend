# 1 - Criação da pasta `changes` e instrução de changelog no CLAUDE.md

## O que foi feito

1. **Criada a pasta `changes/`** na raiz do projeto, com um arquivo `.gitkeep` para que o Git rastreie o diretório vazio.

2. **Adicionada a seção "Change Logging (MANDATORY)"** ao final do `CLAUDE.md`, com as seguintes regras:
   - Após toda resposta que modificar arquivos do repositório, um arquivo de changelog deve ser criado ou editado dentro de `changes/`.
   - Um arquivo por prompt (múltiplas alterações no mesmo prompt → mesmo arquivo).
   - Nomenclatura: `{N} - {titulo_alteracao}.md`, onde N é a quantidade de arquivos `.md` existentes em `changes/` + 1.
   - O conteúdo deve descrever o que foi alterado e por quê.

## Por que foi feito

Solicitação do usuário para ter um registro estruturado e automático de todas as alterações realizadas pelo Claude Code no projeto.
