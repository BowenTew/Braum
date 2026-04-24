import { defineESLintConfig } from '@pixelastic-ai/eslint'

const config = await defineESLintConfig({})

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/build/**',
      '.vite/**',
      './doc/**',
      '**/doc/.vitepress/cache/**',
      '**/examples/**',
      './eslint.config.js',
    ],
  },
  ...config,
]
