# Stylelint Example

This example demonstrates CSS/SCSS/Less linting with Stylelint.

## Structure

```
examples/stylelint/
├── src/
│   ├── styles.css
│   ├── styles.scss
│   └── styles.less
├── stylelint.config.js
└── package.json
```

## Configuration

### stylelint.config.js

```javascript
import { defineStylelintConfig } from '@braum/stylelint'

export default defineStylelintConfig({
  enableScss: true,
  enableLess: true,
})
```

## Package.json

```json
{
  "name": "stylelint-example",
  "scripts": {
    "stylelint": "stylelint '**/*.{css,scss,less}'",
    "stylelint:fix": "stylelint '**/*.{css,scss,less}' --fix"
  },
  "dependencies": {
    "@braum/stylelint": "workspace:*"
  },
  "devDependencies": {
    "stylelint": "^16.12.0"
  }
}
```

## Running the Example

```bash
cd examples/stylelint

# Install dependencies
pnpm install

# Run Stylelint
pnpm stylelint

# Fix auto-fixable issues
pnpm stylelint:fix
```

## Supported File Types

- `.css` - Standard CSS
- `.scss` - SCSS/Sass
- `.less` - Less
- `.vue` - Vue SFC (with `enableVue: true`)
- Styled components (with `enableStyledComponents: true`)

## Key Features

- Property ordering rules
- Performance optimization hints
- Browser hack prevention
- Variable usage enforcement
- Standard CSS rules

## Customizing Rules

Extend the configuration to customize rules:

```javascript
import { defineStylelintConfig } from '@braum/stylelint'

const config = defineStylelintConfig({
  enableScss: true,
})

export default {
  ...config,
  rules: {
    ...config.rules,
    'declaration-no-important': true,
  },
}
```
