# React Example

This example demonstrates a React project setup with Vite and Braum ESLint configuration.

## Structure

```
examples/react/
├── src/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── eslint.config.js
├── package.json
└── vite.config.js
```

## Configuration

### eslint.config.js

```javascript
import { defineESLintConfig } from '@pixelastic-ai/eslint'

export default await defineESLintConfig({
  enableReact: true,
  enableTypescript: false,
  enablePrettier: true,
})
```

## Package.json

```json
{
  "name": "react-example",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@pixelastic-ai/eslint": "workspace:*",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "vite": "^5.0.0"
  }
}
```

## Running the Example

```bash
cd examples/react

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run ESLint
pnpm lint

# Build for production
pnpm build
```

## Key Features

- React 19 support
- Vite build tool
- ESLint with React rules
- JSX support
- Hot Module Replacement (HMR)
