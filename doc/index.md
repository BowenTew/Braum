---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Braum'
  text: 'Frontend Configuration Toolkit'
  tagline: A collection of high-quality, reusable development tool configurations
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View Packages
      link: /packages/eslint
    - theme: alt
      text: GitHub
      link: https://github.com/BowenTew/Braum

features:
  - title: 🛡️ ESLint Config
    details: Comprehensive ESLint configuration supporting JavaScript, TypeScript, React, and Vue with flat config format.
    link: /packages/eslint
  - title: ✨ Prettier Config
    details: Opinionated Prettier configuration with XML plugin support for consistent code formatting.
    link: /packages/prettier
  - title: 🎨 Stylelint Config
    details: Stylelint configuration for CSS, SCSS, Less, and styled-components with best practices.
    link: /packages/stylelint
  - title: 📝 Commitlint Config
    details: Conventional commits configuration with emoji support for standardized commit messages.
    link: /packages/commitlint
  - title: 🚀 Commitizen CLI
    details: Interactive CLI tool for guided commit message creation with customizable types and scopes.
    link: /packages/cz
  - title: 📐 TypeScript Config
    details: Strict TypeScript configuration presets for base, web, node, and library projects.
    link: /packages/typescript-config
---

## Quick Start

Install the packages you need:

```bash
# ESLint configuration
pnpm add -D @pixelastic-ai/eslint

# Prettier configuration
pnpm add -D @pixelastic-ai/prettier

# Stylelint configuration
pnpm add -D @pixelastic-ai/stylelint

# Commitlint configuration
pnpm add -D @pixelastic-ai/commitlint

# Commitizen CLI tool
pnpm add -D @pixelastic-ai/cz

# TypeScript configuration
pnpm add -D @pixelastic-ai/typescript-config
```

## Example Usage

```javascript
// eslint.config.js
import { defineESLintConfig } from '@pixelastic-ai/eslint'

export default await defineESLintConfig({
  enableTypescript: true,
  enableReact: true,
  enablePrettier: true,
})
```

---

<p align="center">
  <sub>Built with ❤️ by <a href="https://github.com/BowenTew">Bowen Tew</a></sub>
</p>
