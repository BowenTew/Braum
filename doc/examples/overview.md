# Examples Overview

Braum includes several example projects demonstrating how to use the packages in different scenarios.

## Available Examples

| Example | Description | Packages Used |
|---------|-------------|---------------|
| [ESLint](./eslint) | Basic ESLint setup | `@fetuye/eslint`, `@fetuye/prettier` |
| [React](./react) | React + Vite project | `@fetuye/eslint` |
| [Vue](./vue) | Vue 3 + Vite project | `@fetuye/eslint`, `@fetuye/prettier`, `@fetuye/typescript-config` |
| [TypeScript](./typescript) | TypeScript configuration demos | `@fetuye/typescript-config` |
| [Stylelint](./stylelint) | CSS/SCSS linting setup | `@fetuye/stylelint` |

## Running Examples

Each example is a standalone project that can be run independently:

```bash
# Navigate to an example
cd examples/react

# Install dependencies
pnpm install

# Run the example
pnpm dev
```

## Example Structure

Each example typically includes:

- `package.json` - Project dependencies and scripts
- Configuration files (eslint.config.js, prettier.config.js, etc.)
- Sample source files demonstrating the setup

## Creating Your Own Project

Use these examples as templates for your own projects:

1. Copy the example closest to your needs
2. Update `package.json` with your project details
3. Adjust configurations as needed
4. Install dependencies with `pnpm install`

## Contributing Examples

We welcome new examples! To add an example:

1. Create a new directory in `examples/`
2. Include a working `package.json`
3. Add a README explaining the example
4. Submit a pull request
