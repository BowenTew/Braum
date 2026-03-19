# Installation

This guide will help you install and configure Braum packages in your project.

## Installing Individual Packages

### ESLint

```bash
pnpm add -D @braum/eslint
```

Create `eslint.config.js`:

```javascript
import { defineESLintConfig } from '@braum/eslint'

export default await defineESLintConfig({
  enableTypescript: true,
  enablePrettier: true,
})
```

### Prettier

```bash
pnpm add -D @braum/prettier
```

Create `prettier.config.js`:

```javascript
import { definePrettierConfig } from '@braum/prettier'

export default definePrettierConfig({
  xml: true,
})
```

### Stylelint

```bash
pnpm add -D @braum/stylelint
```

Create `stylelint.config.js`:

```javascript
import { defineStylelintConfig } from '@braum/stylelint'

export default defineStylelintConfig({
  enableScss: true,
})
```

### Commitlint

```bash
pnpm add -D @braum/commitlint
```

Create `commitlint.config.js`:

```javascript
import { defineCommitlintConfig } from '@braum/commitlint'

export default defineCommitlintConfig()
```

### Commitizen

```bash
pnpm add -D @braum/cz
```

Add to `package.json`:

```json
{
  "scripts": {
    "commit": "cz"
  }
}
```

### TypeScript Config

```bash
pnpm add -D @braum/typescript-config
```

Create `tsconfig.json`:

```json
{
  "extends": "@braum/typescript-config/tsconfig.web.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

## Package Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint --fix .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "stylelint": "stylelint '**/*.{css,scss,less}'",
    "commit": "cz"
  }
}
```

## IDE Integration

### VS Code

Install the following extensions:

- ESLint
- Prettier
- Stylelint

Add to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```
