# Ações humanas pendentes — Etapa 02: Preparação do build para AWS

## 1. Substituir o favicon placeholder

O arquivo `public/favicon.svg` é um placeholder com a letra "E" em azul. Substitua-o pelo ícone oficial do Edoha antes de publicar qualquer ambiente.

Formatos aceitos modernamente:
- `public/favicon.svg` (mantido) — suportado em todos os browsers modernos
- `public/favicon.ico` (opcional, fallback) — para navegadores legados; adicione a tag abaixo em `src/index.html` se quiser oferecer fallback:
  ```html
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  ```

## 2. Testar SPA fallback com servidor estático local

O cloudFront fallback (404 → `index.html`) ainda não existe (Etapa 03), mas você pode validar o comportamento localmente:

```bash
npx http-server dist/edoha-frontend/browser -p 8080 --proxy http://localhost:8080?
```

Depois acesse diretamente uma rota profunda no browser, ex.: `http://localhost:8080/rifas/onix/resumo`. Deve carregar o app (Angular faz o roteamento client-side após o `index.html` ser servido).

> O parâmetro `--proxy` faz o `http-server` redirecionar requisições 404 de volta para o `index.html`, simulando o comportamento do CloudFront.

## 3. Ajustar `meta name="description"` se necessário

O texto atual é:
> "Edoha — plataforma de gestão de rifas e talões para instituições"

Ajuste em `src/index.html` conforme a copy oficial do produto.

## Quando fazer

- Favicon: antes de publicar qualquer ambiente na AWS.
- Teste de SPA fallback: pode fazer a qualquer momento com o build local.
- Meta description: antes da Etapa 03 (CloudFront/produção).
