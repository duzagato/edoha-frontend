# Tailwind CSS + Flowbite Migration Guide

## Overview

This project has been refactored to use **Tailwind CSS v3** with **Flowbite** component patterns, following a utility-first approach while maintaining Angular Material components where appropriate.

## Installation

The following packages are installed:

```bash
npm install --legacy-peer-deps -D tailwindcss@^3 postcss autoprefixer
npm install --legacy-peer-deps flowbite flowbite-angular
```

## Configuration

### Tailwind Config (`tailwind.config.js`)

The Tailwind configuration includes custom theme colors matching the original design system:

- **Primary Colors**: Azure palette (blue) - `primary-50` to `primary-900`
- **Secondary Colors**: Green palette - `secondary-50` to `secondary-900`
- **Tertiary Colors**: Cyan palette - `tertiary-50` to `tertiary-900`
- **Semantic Colors**: `danger`, `success`

### PostCSS Config (`postcss.config.js`)

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

### Global Styles (`src/styles.scss`)

Tailwind directives are imported in the global stylesheet:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Design Patterns

### 1. Utility-First Approach

All styling is done using Tailwind utility classes directly in the HTML:

```html
<div class="container mx-auto px-4 py-5 max-w-7xl">
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <!-- Content -->
  </div>
</div>
```

### 2. Flowbite-Inspired Components

#### Cards
```html
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
  <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
    <h1 class="text-2xl font-medium text-gray-900 dark:text-white">Title</h1>
  </div>
  <div class="p-6">
    <!-- Card content -->
  </div>
</div>
```

#### Buttons
```html
<!-- Primary Button -->
<button class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 rounded-lg">
  <mat-icon>add</mat-icon>
  Add Item
</button>

<!-- Secondary Button -->
<button class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 rounded-lg">
  Cancel
</button>
```

### 3. Semantic Colors

Use the configured theme colors instead of hardcoded values:

- `bg-primary-600` instead of `bg-blue-600`
- `text-secondary-500` instead of `text-green-500`
- `border-tertiary-400` instead of `border-cyan-400`

### 4. Responsive Design

Apply responsive classes for different breakpoints:

```html
<div class="flex flex-col sm:flex-row gap-4">
  <button class="w-full sm:w-auto">Button</button>
</div>
```

Breakpoints:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

### 5. Dark Mode Support

All components include dark mode variants:

```html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
```

### 6. Accessibility

All interactive elements include ARIA labels:

```html
<button
  type="button"
  aria-label="Add new user"
  class="..."
>
  Add User
</button>
```

## Component Patterns

### Page Layout
```html
<div class="container mx-auto px-4 py-5 max-w-7xl">
  <!-- Page content -->
</div>
```

### Loading State
```html
@if (loading()) {
  <div class="flex flex-col items-center justify-center py-10 gap-4">
    <mat-spinner diameter="50"></mat-spinner>
    <p class="text-gray-600 dark:text-gray-400">Loading...</p>
  </div>
}
```

### Empty State
```html
<div class="flex flex-col items-center justify-center py-16 px-5 gap-4">
  <mat-icon class="text-6xl w-16 h-16 text-gray-300">inbox</mat-icon>
  <p class="text-lg text-gray-600">No items found</p>
  <button class="...">Create First Item</button>
</div>
```

### Form Actions
```html
<div class="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
  <button type="button" class="...">Cancel</button>
  <button type="submit" class="..." [disabled]="!form.valid">Save</button>
</div>
```

## Migration from Custom SCSS

### Before (Custom SCSS)
```scss
.login-card {
  min-width: 420px;
  gap: 24px;
  padding: 24px;
}

.form-title {
  font-size: 3em;
  font-weight: bold;
  color: #1e8bc3;
}
```

### After (Tailwind Classes)
```html
<div class="w-full max-w-md p-6 space-y-6">
  <h1 class="text-4xl font-bold text-primary-600">
    Title
  </h1>
</div>
```

## Best Practices

1. **Use Tailwind utilities first**: Before creating custom CSS, check if Tailwind has a utility class
2. **Group related classes**: Keep classes organized (layout → colors → typography → spacing)
3. **Leverage @apply sparingly**: Only use @apply for truly repeated patterns
4. **Maintain consistency**: Use the same spacing scale across components
5. **Component SCSS files**: Keep minimal or empty, as most styling is in templates
6. **Important (!) modifier**: Use with Angular Material when needed: `class="!bg-primary-100"`

## Angular Material Integration

Angular Material components are retained for complex interactions:
- `mat-table` for data tables
- `mat-expansion-panel` for expandable sections
- `mat-menu` for dropdown menus
- `mat-spinner` for loading indicators
- `mat-icon` for icons

These are styled using Tailwind classes with the `!important` modifier when needed.

## Common Tailwind Classes Reference

### Layout
- `container` - Centers content with max-width
- `mx-auto` - Centers horizontally
- `flex`, `grid` - Layout modes
- `gap-4` - Spacing between flex/grid items

### Spacing
- `p-4`, `px-4`, `py-4` - Padding
- `m-4`, `mx-4`, `my-4` - Margin
- `space-y-4` - Vertical spacing between children

### Colors
- `bg-{color}-{shade}` - Background color
- `text-{color}-{shade}` - Text color
- `border-{color}-{shade}` - Border color

### Typography
- `text-{size}` - Font size (xs, sm, base, lg, xl, 2xl, etc.)
- `font-{weight}` - Font weight (normal, medium, semibold, bold)

### Effects
- `shadow-{size}` - Box shadow
- `rounded-{size}` - Border radius
- `hover:{class}` - Hover state
- `focus:ring-{size}` - Focus ring

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Flowbite Components](https://flowbite.com/docs/components/)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)

## Support

For questions or issues with the Tailwind implementation, please refer to:
1. This documentation
2. The `tailwind.config.js` for theme customization
3. Component examples in the codebase
