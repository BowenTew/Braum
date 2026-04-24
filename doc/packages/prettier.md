# @pixelastic-ai/prettier

Prettier configuration with sensible defaults and XML plugin support.

## Installation

```bash
pnpm add -D @pixelastic-ai/prettier
```

## Quick Start

Create `prettier.config.js`:

```javascript
import { definePrettierConfig } from '@pixelastic-ai/prettier'

export default definePrettierConfig({})
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `xml` | `boolean` | `false` | Enable XML plugin |
| `css` | `boolean` | `false` | Enable CSS-specific settings |
| `userOverrides` | `object` | `{}` | Custom Prettier options |

## Default Configuration

```javascript
{
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 120,
  useTabs: false,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'auto',
}
```

## Examples

### Basic Usage

```javascript
import { definePrettierConfig } from '@pixelastic-ai/prettier'

export default definePrettierConfig({})
```

### With XML Support

```javascript
import { definePrettierConfig } from '@pixelastic-ai/prettier'

export default definePrettierConfig({
  xml: true,
})
```

### Custom Overrides

```javascript
import { definePrettierConfig } from '@pixelastic-ai/prettier'

export default definePrettierConfig({
  xml: true,
  userOverrides: {
    printWidth: 100,
    semi: true,
  },
})
```

## Package Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## Ignoring Files

Create `.prettierignore`:

```
dist/
node_modules/
coverage/
*.min.js
```

## IDE Integration

### VS Code

Install the Prettier extension and add to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## XML Plugin Options

When `xml: true` is enabled, the following options are applied:

| Option | Value | Description |
|--------|-------|-------------|
| `xmlQuoteAttributes` | `double` | Use double quotes for attributes |
| `xmlSelfClosingSpace` | `true` | Add space before self-closing tag end |
| `xmlSortAttributesByKey` | `false` | Don't sort attributes by key |
| `xmlWhitespaceSensitivity` | `ignore` | Ignore whitespace sensitivity |
