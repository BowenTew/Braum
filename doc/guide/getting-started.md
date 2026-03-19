# Getting Started

Braum is a frontend configuration toolkit monorepo that provides high-quality, reusable development tool configurations. It helps teams standardize their development workflow and maintain code quality across projects.

## What is Braum?

Braum is a collection of pre-configured packages for popular development tools:

- **ESLint** - Code linting for JavaScript, TypeScript, React, and Vue
- **Prettier** - Code formatting with sensible defaults
- **Stylelint** - CSS/SCSS/Less linting
- **Commitlint** - Commit message linting with conventional commits
- **CZ (Commitizen)** - Interactive commit message creation
- **TypeScript Config** - Strict TypeScript configuration presets

## Why Braum?

- **Battle-tested configurations** - All configurations are tested in real projects
- **Framework agnostic** - Works with any frontend framework or vanilla JavaScript
- **Type-safe** - Written in TypeScript with complete type definitions
- **Modular** - Use only the packages you need
- **Customizable** - Extend configurations to fit your project needs

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (recommended)

## Project Structure

```
braum/
├── packages/           # Core configuration packages
│   ├── commitlint/     # Commit message linting
│   ├── eslint/         # ESLint configuration
│   ├── prettier/       # Prettier configuration
│   ├── stylelint/      # Stylelint configuration
│   └── tsconfig/       # TypeScript presets
├── tools/              # Development tools
│   └── cz/             # Commitizen CLI
├── examples/           # Example projects
│   ├── eslint/
│   ├── react/
│   ├── stylelint/
│   ├── typescript/
│   └── vue/
└── doc/                # Documentation (VitePress)
```

## Next Steps

- [Installation](/guide/installation) - Install and configure the packages
- [ESLint](/packages/eslint) - Configure ESLint for your project
- [Prettier](/packages/prettier) - Set up code formatting
- [Examples](/examples/overview) - View example projects
