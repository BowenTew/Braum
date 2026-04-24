# @pixelastic-ai/stylelint

Stylelint configuration for CSS, SCSS, Less, and styled-components.

## Installation

```bash
pnpm add -D @pixelastic-ai/stylelint
```

## Quick Start

Create `stylelint.config.js`:

```javascript
import { defineStylelintConfig } from '@pixelastic-ai/stylelint'

export default defineStylelintConfig({})
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enableVue` | `boolean` | `false` | Enable Vue SFC support |
| `enableScss` | `boolean` | `false` | Enable SCSS support |
| `enableLess` | `boolean` | `false` | Enable Less support |
| `enableStyledComponents` | `boolean` | `false` | Enable styled-components support |

## Examples

### CSS

```javascript
import { defineStylelintConfig } from '@pixelastic-ai/stylelint'

export default defineStylelintConfig({})
```

### SCSS

```javascript
import { defineStylelintConfig } from '@pixelastic-ai/stylelint'

export default defineStylelintConfig({
  enableScss: true,
})
```

### Vue SFC

```javascript
import { defineStylelintConfig } from '@pixelastic-ai/stylelint'

export default defineStylelintConfig({
  enableVue: true,
})
```

### Less

```javascript
import { defineStylelintConfig } from '@pixelastic-ai/stylelint'

export default defineStylelintConfig({
  enableLess: true,
})
```

### Styled Components

```javascript
import { defineStylelintConfig } from '@pixelastic-ai/stylelint'

export default defineStylelintConfig({
  enableStyledComponents: true,
})
```

## Package Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "stylelint": "stylelint '**/*.{css,scss,less}'",
    "stylelint:fix": "stylelint '**/*.{css,scss,less}' --fix"
  }
}
```

## Base Configuration

The configuration extends:

- `stylelint-config-standard` - Standard Stylelint rules
- `stylelint-config-idiomatic-order` - Property ordering rules

## Plugins

The following plugins are included:

| Plugin | Purpose |
|--------|---------|
| `stylelint-high-performance-animation` | Prevents performance issues with animations |
| `stylelint-declaration-strict-value` | Enforces variables for colors, z-index, etc. |
| `stylelint-no-browser-hacks` | Disallows browser hacks |

## Ignoring Files

Create `.stylelintignore`:

```
dist/
node_modules/
coverage/
```

## Customizing Rules

You can extend the configuration:

```javascript
import { defineStylelintConfig } from '@pixelastic-ai/stylelint'

const config = defineStylelintConfig({
  enableScss: true,
})

export default {
  ...config,
  rules: {
    ...config.rules,
    'property-no-unknown': null,
  },
}
```
