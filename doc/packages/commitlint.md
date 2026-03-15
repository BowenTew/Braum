# @braum/commitlint

Commitlint configuration with conventional commits support and emoji prefixes.

## Installation

```bash
pnpm add -D @braum/commitlint
```

## Quick Start

Create `commitlint.config.js`:

```javascript
import { defineCommitlintConfig } from '@braum/commitlint'

export default defineCommitlintConfig()
```

## Default Commit Types

| Type | Emoji | Description |
|------|-------|-------------|
| `feat` | 🚀 | A new feature |
| `fix` | 🐛 | A bug fix |
| `docs` | 📝 | Documentation only changes |
| `style` | 💄 | Code style changes (formatting, semicolons, etc) |
| `refactor` | ♻️ | Code refactoring |
| `perf` | ⚡️ | Performance improvements |
| `test` | ✅ | Adding or updating tests |
| `build` | 📦 | Build system changes |
| `ci` | 👷 | CI configuration changes |
| `chore` | 🔧 | Other changes |
| `revert` | ⏪ | Reverts a previous commit |

## Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `extendConfig` | `(base: UserConfig) => UserConfig` | Extend the base configuration |

## Examples

### Basic Usage

```javascript
import { defineCommitlintConfig } from '@braum/commitlint'

export default defineCommitlintConfig()
```

### Custom Types

```javascript
import { defineCommitlintConfig } from '@braum/commitlint'

export default defineCommitlintConfig({
  extendConfig: (base) => ({
    ...base,
    rules: {
      ...base.rules,
      'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'custom']],
    },
  }),
})
```

### Custom Rules

```javascript
import { defineCommitlintConfig } from '@braum/commitlint'

export default defineCommitlintConfig({
  extendConfig: (base) => ({
    ...base,
    rules: {
      ...base.rules,
      'subject-max-length': [2, 'always', 72],
      'scope-empty': [2, 'never'], // Require scope
    },
  }),
})
```

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Examples:

```bash
🚀 feat(auth): add login functionality

🐛 fix(api): resolve null pointer exception

📝 docs(readme): update installation instructions
```

## Package Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "commitlint": "commitlint --from=HEAD~1"
  }
}
```

## Git Hooks

Use with Husky to lint commit messages:

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```

Or create `.husky/commit-msg`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}
```

## Rules Reference

### Type Rules

| Rule | Default | Description |
|------|---------|-------------|
| `type-enum` | Built-in types | Allowed commit types |
| `type-case` | `lowerCase` | Case of the type |
| `type-empty` | `never` | Disallow empty type |

### Scope Rules

| Rule | Default | Description |
|------|---------|-------------|
| `scope-case` | `lowerCase` | Case of the scope |
| `scope-empty` | `0` | Allow empty scope |

### Subject Rules

| Rule | Default | Description |
|------|---------|-------------|
| `subject-case` | `0` | Any case allowed |
| `subject-empty` | `never` | Disallow empty subject |
| `subject-full-stop` | `never` | Disallow trailing period |
| `subject-max-length` | `100` | Maximum subject length |
| `subject-min-length` | `0` | Minimum subject length |

### Header Rules

| Rule | Default | Description |
|------|---------|-------------|
| `header-max-length` | `100` | Maximum header length |

### Body Rules

| Rule | Default | Description |
|------|---------|-------------|
| `body-empty` | `0` | Allow empty body |
| `body-max-line-length` | `100` | Maximum line length |
| `body-leading-blank` | `always` | Require blank line before body |

### Footer Rules

| Rule | Default | Description |
|------|---------|-------------|
| `footer-max-line-length` | `100` | Maximum line length |
| `footer-leading-blank` | `always` | Require blank line before footer |
