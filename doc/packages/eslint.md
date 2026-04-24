# @pixelastic-ai/eslint

ESLint configuration supporting JavaScript, TypeScript, React, Vue, and Node.js with flat config format.

## Installation

```bash
pnpm add -D @pixelastic-ai/eslint
```

## Quick Start

Create `eslint.config.js`:

```javascript
import { defineESLintConfig } from '@pixelastic-ai/eslint'

export default await defineESLintConfig({
  enableTypescript: true,
  enablePrettier: true,
})
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableVue` | `boolean` | `false` | Enable Vue support |
| `enableReact` | `boolean` | `false` | Enable React support |
| `enableJSX` | `boolean` | `false` | Enable JSX support |
| `enableNode` | `boolean` | `false` | Enable Node.js support |
| `enableTypescript` | `boolean` | `true` | Enable TypeScript support |
| `enablePrettier` | `boolean` | `true` | Enable Prettier integration |
| `enableImports` | `boolean` | `true` | Enable import rules |
| `enablePromise` | `boolean` | `true` | Enable promise rules |
| `enableComments` | `boolean` | `true` | Enable ESLint comments rules |
| `overrides` | `object` | `{}` | Override configurations |

## Framework Examples

### React

```javascript
import { defineESLintConfig } from '@pixelastic-ai/eslint'

export default await defineESLintConfig({
  enableReact: true,
  enableTypescript: true,
  enablePrettier: true,
})
```

### Vue

```javascript
import { defineESLintConfig } from '@pixelastic-ai/eslint'

export default await defineESLintConfig({
  enableVue: true,
  enableTypescript: true,
  enablePrettier: true,
})
```

### Node.js

```javascript
import { defineESLintConfig } from '@pixelastic-ai/eslint'

export default await defineESLintConfig({
  enableNode: true,
  enableTypescript: true,
})
```

## Customizing Rules

You can extend any rule set using the `overrides` option:

```javascript
import { defineESLintConfig } from '@pixelastic-ai/eslint'

export default await defineESLintConfig({
  enableTypescript: true,
  overrides: {
    extendTypescriptRules: (base) => ({
      ...base,
      '@typescript-eslint/no-explicit-any': 'warn',
    }),
  },
})
```

### Available Overrides

| Override | Description |
|----------|-------------|
| `extendPrettierRules` | Extend Prettier rules |
| `extendEcmascriptParser` | Extend ECMAScript parser options |
| `extendTypescriptParser` | Extend TypeScript parser options |
| `extendVueParser` | Extend Vue parser options |
| `extendJavascriptRules` | Extend JavaScript rules |
| `extendTypescriptRules` | Extend TypeScript rules |
| `extendImportsRules` | Extend import rules |
| `extendPromiseRules` | Extend promise rules |
| `extendVueRules` | Extend Vue rules |
| `extendReactRules` | Extend React rules |
| `extendNodeRules` | Extend Node.js rules |
| `extendCommentsRules` | Extend ESLint comments rules |
| `extendJSXRules` | Extend JSX rules |

## Package Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint --fix ."
  }
}
```

## Ignoring Files

Create `.eslintignore` or use the `ignores` option in your config:

```javascript
import { defineESLintConfig } from '@pixelastic-ai/eslint'

const config = await defineESLintConfig({
  enableTypescript: true,
})

export default [
  {
    ignores: ['dist/', 'node_modules/', 'coverage/'],
  },
  ...config,
]
```
