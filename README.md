# Braum - Frontend Configuration Toolkit

## 📖 Introduction

Braum is a frontend configuration toolkit monorepo designed to collect and organize commonly used frontend development configurations. Through unified repository management, it provides teams with a standardized development experience and consistent, battle-tested configuration files for various development tools.

## 🏗️ Project Structure

```
braum/
├── packages/                    # Core configuration packages
│   ├── commitlint/              # @braum/commitlint - Commit message linting
│   ├── eslint/                  # @braum/eslint - ESLint configuration
│   ├── prettier/                # @braum/prettier - Prettier configuration
│   ├── stylelint/               # @braum/stylelint - Stylelint configuration
│   └── tsconfig/                # @braum/typescript-config - TypeScript presets
├── tools/                       # Development tools
│   └── cz/                      # @braum/cz - Commitizen CLI tool
├── examples/                    # Example projects
│   ├── eslint/                  # ESLint usage example
│   ├── react/                   # React project example
│   ├── stylelint/               # Stylelint usage example
│   ├── typescript/              # TypeScript configuration examples
│   └── vue/                     # Vue project example
├── scripts/                     # Build and development scripts
└── doc/                         # Documentation
```

## 📦 Packages

### @braum/eslint

ESLint configuration supporting JavaScript, TypeScript, React, and Vue.

```bash
pnpm add -D @braum/eslint
```

**Usage:**

```javascript
// eslint.config.js
import { defineESLintConfig } from '@braum/eslint'

const config = await defineESLintConfig({
  enableReact: true, // Enable React support
  enableVue: false, // Enable Vue support
  enableTypescript: true, // Enable TypeScript support
  enableNode: true, // Enable Node.js support
  enablePrettier: true, // Enable Prettier integration
})

export default config
```

**Options:**

| Option             | Type    | Default | Description                  |
| ------------------ | ------- | ------- | ---------------------------- |
| `enableVue`        | boolean | false   | Enable Vue support           |
| `enableReact`      | boolean | false   | Enable React support         |
| `enableJSX`        | boolean | false   | Enable JSX support           |
| `enableNode`       | boolean | false   | Enable Node.js support       |
| `enableTypescript` | boolean | true    | Enable TypeScript support    |
| `enablePrettier`   | boolean | true    | Enable Prettier integration  |
| `enableImports`    | boolean | true    | Enable import rules          |
| `enablePromise`    | boolean | true    | Enable promise rules         |
| `enableComments`   | boolean | true    | Enable ESLint comments rules |

### @braum/prettier

Prettier configuration with XML plugin support.

```bash
pnpm add -D @braum/prettier
```

**Usage:**

```javascript
// prettier.config.js
import { definePrettierConfig } from '@braum/prettier'

export default definePrettierConfig({
  xml: true, // Enable XML plugin
  userOverrides: {
    // Your custom overrides
    printWidth: 100,
  },
})
```

### @braum/stylelint

Stylelint configuration for CSS, SCSS, Less, and styled-components.

```bash
pnpm add -D @braum/stylelint
```

**Usage:**

```javascript
// stylelint.config.js
import { defineStylelintConfig } from '@braum/stylelint'

export default defineStylelintConfig({
  enableVue: false, // Enable Vue SFC support
  enableScss: true, // Enable SCSS support
  enableLess: false, // Enable Less support
  enableStyledComponents: false, // Enable styled-components support
})
```

### @braum/commitlint

Commitlint configuration with conventional commits support.

```bash
pnpm add -D @braum/commitlint
```

**Usage:**

```javascript
// commitlint.config.js
import { defineCommitlintConfig } from '@braum/commitlint'

export default defineCommitlintConfig({
  extendConfig: base => ({
    ...base,
    // Your custom rules
  }),
})
```

**Default Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

### @braum/cz

Commitizen CLI tool for interactive commit messages.

```bash
pnpm add -D @braum/cz
```

**Usage:**

Add to `package.json`:

```json
{
  "scripts": {
    "commit": "cz"
  }
}
```

Then run:

```bash
pnpm commit
```

### @braum/typescript-config

TypeScript configuration presets.

```bash
pnpm add -D @braum/typescript-config
```

**Usage:**

```json
// tsconfig.json
{
  "extends": "@braum/typescript-config/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

**Available Presets:**

- `tsconfig.base.json` - Base strict configuration
- `tsconfig.lib.json` - Library project configuration
- `tsconfig.node.json` - Node.js project configuration
- `tsconfig.web.json` - Web project configuration

## 🛠️ Development Guide

### Requirements

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run type checking
pnpm type-check

# Run linting
pnpm lint:check

# Run formatting check
pnpm format:check

# CI check (format + lint + type-check)
pnpm ci-check
```

### Development Workflow

1. **Fork** the repository and create a new branch
2. **Install** dependencies with `pnpm install`
3. **Develop** in the corresponding packages directory
4. **Build** with `pnpm build`
5. **Commit** following conventional commit format
6. **Create PR** for code review

## 📝 Contributing

We welcome all forms of contributions:

- 🐛 **Bug Reports** - Help us find configuration issues
- 💡 **Configuration Suggestions** - Share your configuration improvements
- 🔧 **Code Contributions** - Participate directly in development
- 📖 **Documentation Improvements** - Improve usage documentation

## 🎯 Design Principles

- **Modular** - Each configuration is an independent package that can be used separately
- **Configurable** - Provide flexible configuration options to adapt to different project needs
- **Battle-tested** - All configurations have been tested in real projects
- **Framework-agnostic** - Applicable to any frontend framework or vanilla JavaScript
- **Type-safe** - Prioritize TypeScript with complete type definitions
- **Backward Compatible** - Follow semantic versioning for smooth upgrades

## 📄 License

This project is licensed under the [Apache License 2.0](./LICENSE).

## 🏷️ Package Tags

| Tag                        | Description                      |
| -------------------------- | -------------------------------- |
| `@braum/eslint`            | ESLint configuration             |
| `@braum/prettier`          | Prettier configuration           |
| `@braum/stylelint`         | Stylelint configuration          |
| `@braum/commitlint`        | Commitlint configuration         |
| `@braum/cz`                | Commitizen CLI tool              |
| `@braum/typescript-config` | TypeScript configuration presets |

---

<p align="center">
  <sub>Built with ❤️ by <a href="https://github.com/BowenTew">Bowen Tew</a></sub>
</p>
