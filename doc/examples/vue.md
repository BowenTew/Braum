# Vue Example

This example demonstrates a Vue 3 project setup with TypeScript, Vite, and Braum configurations.

## Structure

```
examples/vue/
├── src/
│   ├── App.vue
│   ├── main.ts
│   └── components/
├── index.html
├── eslint.config.js
├── package.json
├── prettier.config.js
├── tsconfig.json
└── vite.config.ts
```

## Configuration

### eslint.config.js

```javascript
import { defineESLintConfig } from '@fetuye/eslint'

export default await defineESLintConfig({
  enableVue: true,
  enableTypescript: true,
  enablePrettier: true,
})
```

### prettier.config.js

```javascript
import { definePrettierConfig } from '@fetuye/prettier'

export default definePrettierConfig({})
```

### tsconfig.json

```json
{
  "extends": "@fetuye/typescript-config/tsconfig.web.json",
  "include": ["src/**/*", "src/**/*.vue"]
}
```

## Package.json

```json
{
  "name": "vue-example",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "lint:fix": "eslint --fix .",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  },
  "dependencies": {
    "vue": "^3.5.24"
  },
  "devDependencies": {
    "@fetuye/eslint": "workspace:*",
    "@fetuye/prettier": "workspace:*",
    "@fetuye/typescript-config": "workspace:*",
    "@vitejs/plugin-vue": "^6.0.1",
    "eslint": "^9.39.1",
    "prettier": "^3.7.1",
    "vite": "^7.2.4"
  }
}
```

## Running the Example

```bash
cd examples/vue

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run ESLint
pnpm lint

# Format code
pnpm format

# Build for production
pnpm build
```

## Key Features

- Vue 3 Composition API
- TypeScript support
- Vite build tool
- ESLint with Vue rules
- Prettier formatting
- Vue SFC (Single File Components)
