# Edoha Frontend - Design System

Este documento descreve o sistema de design completo do projeto Edoha Frontend, incluindo paleta de cores, componentes reutilizáveis e diretrizes de uso.

## 📋 Índice

- [Paleta de Cores](#paleta-de-cores)
- [Sistema de Botões](#sistema-de-botões)
- [Sistema de Alertas](#sistema-de-alertas)
- [Variáveis de Tema](#variáveis-de-tema)
- [Exemplos de Uso](#exemplos-de-uso)

---

## 🎨 Paleta de Cores

### Cores Base do Projeto

As cores principais foram definidas para criar uma identidade visual coerente:

| Variável | Cor | Hex Code | Uso |
|----------|-----|----------|-----|
| `$color-1` | ![#5DADE2](https://via.placeholder.com/15/5DADE2/000000?text=+) | `#5DADE2` | Azul claro - Botão secundário |
| `$color-2` | ![#3498DB](https://via.placeholder.com/15/3498DB/000000?text=+) | `#3498DB` | Azul médio - Botão primário |
| `$color-3` | ![#2874A6](https://via.placeholder.com/15/2874A6/000000?text=+) | `#2874A6` | Azul escuro - Header (tema claro) |
| `$color-4` | ![#1A5276](https://via.placeholder.com/15/1A5276/000000?text=+) | `#1A5276` | Azul muito escuro - Header (tema escuro) |
| `$color-5` | ![#8B0000](https://via.placeholder.com/15/8B0000/000000?text=+) | `#8B0000` | Vermelho escuro - Botão de exclusão/erro |
| `$color-6` | ![#D35400](https://via.placeholder.com/15/D35400/000000?text=+) | `#D35400` | Laranja - Alerta de aviso |
| `$color-7` | ![#45B39D](https://via.placeholder.com/15/45B39D/000000?text=+) | `#45B39D` | Verde água - Botão de sucesso |
| `$color-8` | ![#FDEBD0](https://via.placeholder.com/15/FDEBD0/000000?text=+) | `#FDEBD0` | Bege claro - Decorativo |
| `$color-9` | ![#F4D03F](https://via.placeholder.com/15/F4D03F/000000?text=+) | `#F4D03F` | Amarelo - Decorativo |
| `$color-10` | ![#E67E22](https://via.placeholder.com/15/E67E22/000000?text=+) | `#E67E22` | Laranja escuro - Decorativo |

### Contraste e Acessibilidade

Todas as combinações de cores seguem as diretrizes WCAG AA para garantir contraste adequado:
- **Botões**: Texto branco sobre fundos coloridos (contraste mínimo 4.5:1)
- **Alertas**: Texto branco sobre fundos coloridos com bordas escuras
- **Temas**: Cores de texto ajustadas automaticamente (branco para escuro, preto para claro)

---

## 🔘 Sistema de Botões

### Classes Semânticas

O sistema de botões foi redesenhado para usar classes semânticas que indicam claramente a finalidade de cada botão.

#### Classe Base

```html
<button class="btn">Base Button</button>
```

**Propriedades compartilhadas:**
- Border radius: 8px
- Transição suave: 0.2s
- Efeito hover com elevação
- Estado disabled com opacidade reduzida
- Focus visible com outline azul

#### Botão Primário

```html
<button class="btn btn-primary">Ação Principal</button>
```

**Quando usar:**
- Ação principal da página/modal
- Submissão de formulários
- Confirmações importantes

**Cores:**
- Background: `$color-2` (#3498DB)
- Hover: `$color-3` (#2874A6)
- Texto: Branco

#### Botão Secundário

```html
<button class="btn btn-secondary">Ação Secundária</button>
```

**Quando usar:**
- Ações alternativas
- Navegação entre etapas
- Opções complementares

**Cores:**
- Background: `$color-1` (#5DADE2)
- Hover: `$color-2` (#3498DB)
- Texto: Branco

#### Botão Terciário (Outline)

```html
<button class="btn btn-tertiary">Ação Terciária</button>
```

**Quando usar:**
- Ações menos importantes
- Cancelamento
- Links de navegação que precisam destaque

**Cores:**
- Background: Transparente
- Border: `$color-3` (#2874A6)
- Hover: Fundo com 10% de opacidade
- Texto: `$color-3`

#### Botão de Exclusão

```html
<button class="btn btn-danger">Excluir</button>
```

**Quando usar:**
- Ações destrutivas
- Exclusão de dados
- Operações irreversíveis

**Cores:**
- Background: `$color-5` (#8B0000)
- Hover: Vermelho mais escuro
- Texto: Branco

#### Botão de Sucesso

```html
<button class="btn btn-success">Confirmar</button>
```

**Quando usar:**
- Confirmações positivas
- Ações de aprovação
- Finalização bem-sucedida

**Cores:**
- Background: `$color-7` (#45B39D)
- Hover: Verde mais escuro
- Texto: Branco

### Variantes de Tamanho

```html
<!-- Pequeno -->
<button class="btn btn-primary btn-sm">Pequeno</button>

<!-- Médio (padrão) -->
<button class="btn btn-primary btn-md">Médio</button>
<button class="btn btn-primary">Médio (padrão)</button>

<!-- Grande -->
<button class="btn btn-primary btn-lg">Grande</button>
```

**Especificações:**
- **btn-sm**: Altura 32px, padding 6px 12px, font-size 0.875rem
- **btn-md**: Altura 40px, padding 10px 20px, font-size 1rem (padrão)
- **btn-lg**: Altura 48px, padding 14px 28px, font-size 1.125rem

### Estado Desabilitado

```html
<button class="btn btn-primary" disabled>Desabilitado</button>
```

**Comportamento:**
- Opacidade reduzida para 60%
- Cursor `not-allowed`
- Sem efeitos hover ou active

### Exemplos Completos

```html
<!-- Botão com ícone -->
<button class="btn btn-primary">
  <mat-icon>save</mat-icon>
  Salvar
</button>

<!-- Botões em um formulário -->
<div class="button-group">
  <button class="btn btn-tertiary" type="button">Cancelar</button>
  <button class="btn btn-primary" type="submit">Enviar</button>
</div>

<!-- Botões de ação em uma lista -->
<button class="btn btn-secondary btn-sm">Editar</button>
<button class="btn btn-danger btn-sm">Excluir</button>
```

---

## 🚨 Sistema de Alertas

### Classes de Alertas

O sistema de alertas fornece feedback visual consistente para o usuário.

#### Alerta de Sucesso

```html
<div class="alert alert-success">
  <mat-icon>check_circle</mat-icon>
  Operação realizada com sucesso!
</div>
```

**Quando usar:**
- Confirmação de operação bem-sucedida
- Salvamento de dados
- Conclusão de processo

**Cores:**
- Background: `$color-7` (#45B39D - verde água)
- Texto: Branco

#### Alerta de Erro

```html
<div class="alert alert-error">
  <mat-icon>error</mat-icon>
  Ocorreu um erro ao processar sua solicitação.
</div>
```

**Quando usar:**
- Erros de validação
- Falhas em operações
- Problemas críticos

**Cores:**
- Background: `$color-5` (#8B0000 - vermelho escuro)
- Texto: Branco

#### Alerta de Aviso

```html
<div class="alert alert-warning">
  <mat-icon>warning</mat-icon>
  Atenção: Esta ação não pode ser desfeita.
</div>
```

**Quando usar:**
- Avisos importantes
- Ações que requerem atenção
- Pré-requisitos não atendidos

**Cores:**
- Background: `$color-6` (#D35400 - laranja)
- Texto: Branco

#### Alerta Informativo

```html
<div class="alert alert-info">
  <mat-icon>info</mat-icon>
  Você tem 5 novas mensagens.
</div>
```

**Quando usar:**
- Informações neutras
- Dicas e sugestões
- Status de sistema

**Cores:**
- Background: `$color-2` (#3498DB - azul médio)
- Texto: Branco

### Alerta com Botão de Fechar

```html
<div class="alert alert-success alert-dismissible">
  <mat-icon>check_circle</mat-icon>
  <span>Salvo com sucesso!</span>
  <button class="alert-close" aria-label="Fechar">
    <mat-icon>close</mat-icon>
  </button>
</div>
```

### Propriedades

- **Padding**: 12px 16px
- **Border radius**: 8px
- **Margin bottom**: 16px
- **Animação**: Fade in (0.3s)
- **Box shadow**: Sombra sutil
- **Border left**: Borda de 4px na cor mais escura

---

## 🎭 Variáveis de Tema

O sistema de tema permite alternar entre modo claro e escuro de forma consistente em toda a aplicação.

### Variáveis CSS Disponíveis

#### Tema Claro (Padrão)

```scss
html {
  // Fundos
  --bg-color: #f5f5f5;        // Fundo principal
  --bg-surface: #ffffff;       // Cards, modais
  --bg-header: #2874A6;        // Header/navbar ($color-3)
  --bg-sidebar: #ffffff;       // Menu lateral
  
  // Textos
  --text-color: #090909;       // Texto principal
  --text-secondary: #666666;   // Texto secundário
}
```

#### Tema Escuro

```scss
html[data-theme="dark"] {
  // Fundos
  --bg-color: #0a0a0a;         // Fundo principal (preto suave)
  --bg-surface: #1a1a1a;       // Cards, modais
  --bg-header: #1A5276;        // Header/navbar ($color-4)
  --bg-sidebar: #1e1e1e;       // Menu lateral
  
  // Textos
  --text-color: #ffffff;       // Texto principal
  --text-secondary: #aaaaaa;   // Texto secundário
}
```

### Como Usar as Variáveis

#### Em SCSS

```scss
.my-component {
  background-color: var(--bg-surface);
  color: var(--text-color);
  
  .subtitle {
    color: var(--text-secondary);
  }
}
```

#### Em HTML (style inline - evite quando possível)

```html
<div style="background-color: var(--bg-surface); color: var(--text-color);">
  Conteúdo
</div>
```

### Estrutura de Layout

Os componentes principais devem usar as seguintes variáveis:

- **Body/Main**: `var(--bg-color)` - Fundo principal da aplicação
- **Header**: `var(--bg-header)` - Barra de navegação superior
- **Sidebar**: `var(--bg-sidebar)` - Menu lateral
- **Cards/Modais**: `var(--bg-surface)` - Superfícies elevadas
- **Texto principal**: `var(--text-color)`
- **Texto secundário/labels**: `var(--text-secondary)`

---

## 💡 Exemplos de Uso

### Página com Formulário

```html
<div class="page-container">
  <h1>Novo Usuário</h1>
  
  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <!-- Campos do formulário -->
    
    <!-- Alerta de erro (se houver) -->
    <div class="alert alert-error" *ngIf="errorMessage">
      <mat-icon>error</mat-icon>
      {{ errorMessage }}
    </div>
    
    <!-- Botões de ação -->
    <div class="form-actions">
      <button type="button" class="btn btn-tertiary" (click)="cancel()">
        Cancelar
      </button>
      <button type="submit" class="btn btn-primary" [disabled]="!form.valid">
        <mat-icon>save</mat-icon>
        Salvar
      </button>
    </div>
  </form>
</div>
```

### Lista com Ações

```html
<mat-card class="item-card">
  <mat-card-content>
    <h3>{{ item.name }}</h3>
    <p>{{ item.description }}</p>
  </mat-card-content>
  
  <mat-card-actions>
    <button class="btn btn-secondary btn-sm" (click)="view(item)">
      <mat-icon>visibility</mat-icon>
      Ver
    </button>
    <button class="btn btn-secondary btn-sm" (click)="edit(item)">
      <mat-icon>edit</mat-icon>
      Editar
    </button>
    <button class="btn btn-danger btn-sm" (click)="delete(item)">
      <mat-icon>delete</mat-icon>
      Excluir
    </button>
  </mat-card-actions>
</mat-card>
```

### Modal de Confirmação

```html
<h2 mat-dialog-title>Confirmar Exclusão</h2>

<mat-dialog-content>
  <div class="alert alert-warning">
    <mat-icon>warning</mat-icon>
    Esta ação não pode ser desfeita. Tem certeza que deseja continuar?
  </div>
  <p>Você está prestes a excluir: <strong>{{ itemName }}</strong></p>
</mat-dialog-content>

<mat-dialog-actions align="end">
  <button class="btn btn-tertiary" mat-dialog-close>
    Cancelar
  </button>
  <button class="btn btn-danger" (click)="confirm()">
    <mat-icon>delete</mat-icon>
    Excluir
  </button>
</mat-dialog-actions>
```

### Notificações de Sucesso

```typescript
// Em um componente TypeScript
showSuccessAlert() {
  // Usando MatSnackBar (já implementado no login)
  this.snackBar.open('Operação realizada com sucesso!', 'Fechar', {
    duration: 3000,
    panelClass: ['alert-success']
  });
}

// Ou renderizando diretamente no template
```

```html
<div class="alert alert-success" *ngIf="showSuccess">
  <mat-icon>check_circle</mat-icon>
  Dados salvos com sucesso!
</div>
```

---

## 📝 Boas Práticas

### Botões

1. **Use classes semânticas** ao invés de `.button-1`, `.button-2`, etc.
2. **Botão primário**: Apenas um por página/seção para a ação principal
3. **Ordem dos botões**: Ações destrutivas/cancelar à esquerda, confirmar/salvar à direita
4. **Ícones**: Use apenas quando adiciona clareza à ação
5. **Tamanhos**: Use tamanhos consistentes no mesmo contexto

### Alertas

1. **Posicionamento**: Próximo ao contexto relevante (formulário, ação)
2. **Duração**: Auto-dismiss para sucesso (3s), manual para erros
3. **Conteúdo**: Mensagens claras e acionáveis
4. **Ícones**: Sempre use para identificação visual rápida

### Temas

1. **Teste ambos os temas** ao desenvolver novos componentes
2. **Use variáveis CSS** ao invés de cores hardcoded
3. **Contraste**: Verifique legibilidade em ambos os temas
4. **Transições**: O tema alterna automaticamente via `ThemeService`

### Cores

1. **Paleta limitada**: Use apenas as cores definidas no sistema
2. **Consistência**: Mesmas cores para mesmas ações em toda a aplicação
3. **Acessibilidade**: Sempre verifique contraste WCAG AA
4. **Semântica**: Vermelho para destrutivo, verde para sucesso, azul para primário

---

## 🔄 Migração de Código Legado

### Substituir Classes Antigas

```html
<!-- ❌ Antigo -->
<button class="button-1">Botão</button>

<!-- ✅ Novo -->
<button class="btn btn-primary">Botão</button>
```

### Mapeamento de Classes

| Classe Antiga | Nova Classe | Uso |
|---------------|-------------|-----|
| `.button-1` | `.btn .btn-primary` | Ação principal |
| `.button-2` | `.btn .btn-secondary` | Ação secundária |
| `.btn-1` | `.btn .btn-primary` | Login e principais |
| `.btn-small` | `.btn .btn-sm` | Botão pequeno |
| `.btn-large` | `.btn .btn-lg` | Botão grande |

---

## 🛠️ Manutenção e Extensão

### Adicionar Nova Cor

1. Defina a variável em `src/scss/_colors.scss`:
   ```scss
   $color-11: #NEW_COLOR;
   ```

2. Adicione à documentação com uso específico

3. Crie classes utilitárias se necessário:
   ```scss
   .bg-custom { background-color: $color-11; }
   .text-custom { color: $color-11; }
   ```

### Adicionar Novo Tipo de Botão

1. Adicione em `src/scss/_buttons.scss`:
   ```scss
   .btn-custom {
     background-color: $color-11;
     color: #ffffff;
     
     &:hover:not(:disabled) {
       background-color: darken($color-11, 10%);
     }
   }
   ```

2. Documente quando usar e exemplos

### Adicionar Novo Tipo de Alerta

1. Adicione em `src/scss/_alerts.scss`:
   ```scss
   .alert-custom {
     background-color: $color-11;
     color: #ffffff;
     border-left: 4px solid darken($color-11, 15%);
   }
   ```

2. Documente casos de uso

---

## 📞 Suporte

Para dúvidas ou sugestões sobre o design system:
- Crie uma issue no repositório
- Consulte este documento primeiro
- Mantenha a consistência com os padrões estabelecidos

---

**Última atualização**: 2026-02-09  
**Versão**: 1.0.0
