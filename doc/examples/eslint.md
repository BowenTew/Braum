# ESLint Example

This example demonstrates a basic ESLint and Prettier setup.

## Structure

```
examples/eslint/
├── src/
│   ├── index.js
│   └── test.xml
├── eslint.config.js
├── package.json
└── prettier.config.js
```

## Configuration

### eslint.config.js

```javascript
import { defineESLintConfig } from '@pixelastic-ai/eslint'

export default await defineESLintConfig({
  enableTypescript: false,
  enablePrettier: true,
})
```

### prettier.config.js

```javascript
import { definePrettierConfig } from '@pixelastic-ai/prettier'

export default definePrettierConfig({
  xml: true,
})
```

## Package.json

```json
{
  "name": "eslint-example",
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "dependencies": {
    "@pixelastic-ai/eslint": "workspace:*",
    "@pixelastic-ai/prettier": "workspace:*"
  },
  "devDependencies": {
    "eslint": "^9.10.0"
  }
}
```

## Running the Example

```bash
cd examples/eslint

# Install dependencies
pnpm install

# Run ESLint
pnpm lint

# Format code
pnpm format
```

## Key Features

- JavaScript linting
- Prettier integration
- XML formatting support
