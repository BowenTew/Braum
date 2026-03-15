# @braum/cz

Commitizen CLI tool for interactive commit message creation with emoji support.

## Installation

```bash
pnpm add -D @braum/cz
```

## Quick Start

Add to `package.json`:

```json
{
  "scripts": {
    "commit": "cz"
  }
}
```

Run:

```bash
pnpm commit
```

## Configuration

Create `cz.config.js` (optional):

```javascript
export default {
  types: [
    { name: '🚀 feat', value: '🚀 feat', description: 'A new feature' },
    { name: '🐛 fix', value: '🐛 fix', description: 'A bug fix' },
  ],
  scopes: [
    { name: 'api', value: 'api', description: 'API related' },
    { name: 'ui', value: 'ui', description: 'UI related' },
  ],
  hasBody: true,
  hasFooter: true,
  dryRun: false,
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `types` | `CommitType[]` | Built-in types | Commit types |
| `scopes` | `CommitScope[]` | `undefined` | Commit scopes |
| `hasBody` | `boolean` | `false` | Prompt for commit body |
| `hasFooter` | `boolean` | `false` | Prompt for commit footer |
| `dryRun` | `boolean` | `false` | Preview commit without committing |

## Default Types

| Name | Value | Description |
|------|-------|-------------|
| 🚀 feat | 🚀 feat | A new feature |
| 🐛 fix | 🐛 fix | A bug fix |
| 📝 docs | 📝 docs | Documentation only changes |
| 💄 style | 💄 style | Code style changes |
| ♻️ refactor | ♻️ refactor | Code refactoring |
| ⚡️ perf | ⚡ perf | Performance improvements |
| ✅ test | ✅ test | Adding or updating tests |
| 📦 build | 📦 build | Build system changes |
| 👷 ci | 👷 ci | CI configuration changes |
| 🔧 chore | 🔧 chore | Other changes |
| ⏪ revert | ⏪ revert | Reverts a previous commit |

## Configuration File Formats

The following config files are supported (in order of precedence):

1. `cz.config.js`
2. `cz.config.mjs`
3. `cz.config.cjs`
4. `cz.config.json`

## Examples

### Basic Configuration

```javascript
// cz.config.js
export default {
  hasBody: true,
}
```

### Custom Types

```javascript
// cz.config.js
export default {
  types: [
    { name: '✨ feature', value: 'feat', description: 'New feature' },
    { name: '🐛 bugfix', value: 'fix', description: 'Bug fix' },
  ],
}
```

### With Scopes

```javascript
// cz.config.js
export default {
  scopes: [
    { name: 'auth', value: 'auth', description: 'Authentication' },
    { name: 'api', value: 'api', description: 'API' },
    { name: 'ui', value: 'ui', description: 'User Interface' },
  ],
  hasBody: true,
  hasFooter: true,
}
```

### Dry Run Mode

```javascript
// cz.config.js
export default {
  dryRun: true,
}
```

## Usage Flow

1. Run `pnpm commit`
2. Select commit type
3. Select scope (if configured)
4. Enter subject
5. Enter body (if `hasBody: true`)
6. Enter footer (if `hasFooter: true`)
7. Confirm commit

## Type Definitions

```typescript
interface CommitType {
  name: string
  value: string
  description: string
}

interface CommitScope {
  name: string
  value: string
  description: string
}

interface CZConfig {
  types: CommitType[]
  scopes?: CommitScope[]
  hasBody?: boolean
  hasFooter?: boolean
  dryRun?: boolean
}
```
