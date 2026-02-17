# Edoha Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.0.

## Tech Stack

- **Angular 20** - Frontend framework
- **Tailwind CSS v3** - Utility-first CSS framework
- **Flowbite** - Component library for Tailwind
- **Angular Material** - UI components for complex interactions
- **TypeScript** - Type-safe JavaScript

## Getting Started

### Installation

```bash
npm install --legacy-peer-deps
```

Note: The `--legacy-peer-deps` flag is required due to peer dependency conflicts between Angular versions.

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Styling Guide

This project uses **Tailwind CSS** with **Flowbite** component patterns. For detailed information on styling components, please see:

📘 **[Tailwind CSS + Flowbite Migration Guide](./TAILWIND_GUIDE.md)**

Key highlights:
- Utility-first approach with Tailwind classes
- Custom theme colors (primary, secondary, tertiary)
- Responsive design with mobile-first approach
- Dark mode support
- Accessibility-focused components

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Project Structure

```
src/
├── app/
│   ├── core/              # Core services, guards, interceptors
│   ├── features/          # Feature modules
│   │   ├── auth/         # Authentication
│   │   ├── home/         # Home page
│   │   ├── user/         # User management
│   │   └── lottery/      # Lottery management
│   ├── layouts/          # Layout components (header, sidebar)
│   ├── shared/           # Shared components, constants
│   └── scss/             # Legacy SCSS files (being phased out)
├── assets/               # Static assets (images, etc.)
└── styles.scss           # Global styles with Tailwind imports
```

## Development Guidelines

### Styling Components

1. Use Tailwind utility classes directly in templates
2. Follow Flowbite component patterns
3. Maintain responsive design with mobile-first approach
4. Include ARIA labels for accessibility
5. Keep component SCSS files minimal

### Color Usage

Use semantic theme colors:
- `primary-{shade}` for primary actions (blue)
- `secondary-{shade}` for secondary actions (green)
- `tertiary-{shade}` for tertiary elements (cyan)
- `danger-{shade}` for destructive actions
- `success-{shade}` for success states

## Additional Resources

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Flowbite Components](https://flowbite.com/docs/components/)
- [Angular Material Documentation](https://material.angular.io/)
