# Installation

This guide will help you install and configure Braum packages in your project.

## Installing Individual Packages

### ESLint

```bash
pnpm add -D @pixelastic-ai/eslint
```

Create `eslint.config.js`:

```javascript
import { defineESLintConfig } from '@pixelastic-ai/eslint'

export default await defineESLintConfig({
  enableTypescript: true,
  enablePrettier: true,
})
```

### Prettier

```bash
pnpm add -D @pixelastic-ai/prettier
```

Create `prettier.config.js`:

```javascript
import { definePrettierConfig } from '@pixelastic-ai/prettier'

export default definePrettierConfig({
  xml: true,
})
```

### Stylelint

```bash
pnpm add -D @pixelastic-ai/stylelint
```

Create `stylelint.config.js`:

```javascript
import { defineStylelintConfig } from '@pixelastic-ai/stylelint'

export default defineStylelintConfig({
  enableScss: true,
})
```

### Commitlint

```bash
pnpm add -D @pixelastic-ai/commitlint
```

Create `commitlint.config.js`:

```javascript
import { defineCommitlintConfig } from '@pixelastic-ai/commitlint'

export default defineCommitlintConfig()
```

### Commitizen

```bash
pnpm add -D @pixelastic-ai/cz
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
pnpm add -D @pixelastic-ai/typescript-config
```

Create `tsconfig.json`:

```json
{
  "extends": "@pixelastic-ai/typescript-config/tsconfig.web.json",
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
