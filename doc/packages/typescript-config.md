# @fetuye/typescript-config

TypeScript configuration presets for strict type checking.

## Installation

```bash
pnpm add -D @fetuye/typescript-config
```

## Available Presets

| Preset | Use Case |
|--------|----------|
| `tsconfig.base.json` | Base strict configuration |
| `tsconfig.web.json` | Web applications (Vite, webpack) |
| `tsconfig.node.json` | Node.js applications |
| `tsconfig.lib.json` | Library packages |

## Quick Start

### Web Application

```json
{
  "extends": "@fetuye/typescript-config/tsconfig.web.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### Node.js Application

```json
{
  "extends": "@fetuye/typescript-config/tsconfig.node.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### Library Package

```json
{
  "extends": "@fetuye/typescript-config/tsconfig.lib.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

## Base Configuration

The base configuration includes all strict TypeScript options:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,
    "noImplicitOverride": true,
    "allowSyntheticDefaultImports": true,
    "verbatimModuleSyntax": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  }
}
```

## Preset Details

### tsconfig.web.json

For web applications using Vite or webpack:

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "isolatedModules": true,
    "allowJs": true,
    "noEmit": true
  }
}
```

### tsconfig.node.json

For Node.js applications:

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "declaration": true,
    "sourceMap": true,
    "lib": ["ESNext"],
    "isolatedModules": false
  }
}
```

### tsconfig.lib.json

For library packages:

Similar to `tsconfig.node.json` but optimized for library builds.

## Customizing Configuration

You can extend and override the presets:

```json
{
  "extends": "@fetuye/typescript-config/tsconfig.web.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Project References

For monorepos, use project references:

```json
{
  "extends": "@fetuye/typescript-config/tsconfig.base.json",
  "compilerOptions": {
    "composite": true
  },
  "references": [
    { "path": "../package-a" },
    { "path": "../package-b" }
  ]
}
```

## Strictness Levels

The base configuration enables all strict options:

### Type Checking

- `strict` - Enable all strict type-checking options
- `noImplicitAny` - Error on implicit any
- `strictNullChecks` - Strict null checking
- `strictFunctionTypes` - Strict function type checking
- `strictBindCallApply` - Strict bind/call/apply checking
- `strictPropertyInitialization` - Strict property initialization
- `noImplicitThis` - Error on implicit this

### Code Quality

- `noUnusedLocals` - Error on unused locals
- `noUnusedParameters` - Error on unused parameters
- `noImplicitReturns` - Error when not all code paths return
- `noFallthroughCasesInSwitch` - Error on switch fallthrough

### Advanced

- `noUncheckedIndexedAccess` - Check indexed access
- `exactOptionalPropertyTypes` - Exact optional property types
- `noImplicitOverride` - Require override keyword
