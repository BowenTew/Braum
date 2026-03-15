# Development Guide

This guide covers how to develop and contribute to the Braum monorepo.

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Setup

1. Clone the repository:

```bash
git clone https://github.com/BowenTew/Braum.git
cd braum
```

2. Install dependencies:

```bash
pnpm install
```

3. Build all packages:

```bash
pnpm build
```

## Monorepo Structure

Braum uses pnpm workspaces. The monorepo is organized as follows:

```
braum/
├── packages/           # Published packages
│   ├── commitlint/
│   ├── eslint/
│   ├── prettier/
│   ├── stylelint/
│   └── tsconfig/
├── tools/              # Development tools
│   └── cz/
├── examples/           # Example projects
├── scripts/            # Build scripts
└── doc/                # Documentation
```

## Development Workflow

### Building Packages

Build all packages:

```bash
pnpm build
```

Build a specific package:

```bash
cd packages/eslint
pnpm build
```

### Running Checks

Type check:

```bash
pnpm type-check
```

Lint check:

```bash
pnpm lint:check
```

Format check:

```bash
pnpm format:check
```

Run all CI checks:

```bash
pnpm ci-check
```

### Testing Changes

Use the example projects to test your changes:

```bash
cd examples/react
pnpm lint
```

## Package Development

### Creating a New Package

1. Create a new directory in `packages/`:

```bash
mkdir packages/my-package
cd packages/my-package
```

2. Create `package.json`:

```json
{
  "name": "@braum/my-package",
  "version": "1.0.0",
  "description": "My package description",
  "main": "dist/index.cjs",
  "module": "dist/index.mjs",
  "types": "dist/index.d.mts",
  "files": ["dist"],
  "scripts": {
    "build": "tsdown"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

3. Create the entry point `index.ts`:

```typescript
export const myFunction = () => {
  // Your code here
}
```

4. Build the package:

```bash
pnpm build
```

## Documentation

Run the documentation site locally:

```bash
pnpm docs:dev
```

Build the documentation:

```bash
pnpm docs:build
```

Preview the built documentation:

```bash
pnpm docs:preview
```
