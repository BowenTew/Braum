# TypeScript Example

This example demonstrates TypeScript configuration setups for different project types.

## Structure

```
examples/typescript/
├── base-check/         # Base TypeScript configuration
├── lib-check/          # Library project configuration
├── node-check/         # Node.js project configuration
└── web-check/          # Web project configuration
```

## Available Configurations

### Base Configuration

For general TypeScript projects:

```json
{
  "extends": "@fetuye/typescript-config/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### Web Configuration

For web applications using Vite or webpack:

```json
{
  "extends": "@fetuye/typescript-config/tsconfig.web.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### Node.js Configuration

For Node.js applications:

```json
{
  "extends": "@fetuye/typescript-config/tsconfig.node.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### Library Configuration

For library packages:

```json
{
  "extends": "@fetuye/typescript-config/tsconfig.lib.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

## Running the Examples

```bash
cd examples/typescript/base-check

# Install dependencies
pnpm install

# Type check
pnpm type-check
```

## Key Features

- Strict type checking enabled
- Unused variable detection
- Null safety checks
- Import/export validation
- Project references support

## Type Checking Levels

The configurations include three levels of strictness:

### Entry Level (Base)

- Basic strict checks
- Standard code quality rules

### Advanced Level (Web/Node)

- Advanced strict checks
- Framework-specific settings

### Expert Level (All Enabled)

- All strict options enabled
- Maximum type safety
