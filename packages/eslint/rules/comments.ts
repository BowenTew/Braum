import CommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments'

import { noop } from '../utils'

import type { Linter } from 'eslint'

export interface CommentsOptions {
  extendConfig?: (base: Linter.Config) => Linter.Config
}

export function comments(options: CommentsOptions): Linter.Config {
  const { extendConfig = noop } = options

  let baseConfig: Linter.Config = {
    name: 'braum/comments/rules',
    plugins: {
      '@eslint-community/eslint-comments': CommentsPlugin,
    },
    rules: {
      '@eslint-community/eslint-comments/no-unused-enable': 'error',
      '@eslint-community/eslint-comments/no-unused-disable': 'error',
      '@eslint-community/eslint-comments/no-unlimited-disable': 'error',
      '@eslint-community/eslint-comments/no-duplicate-disable': 'error',
      '@eslint-community/eslint-comments/no-aggregating-enable': 'error',
      '@eslint-community/eslint-comments/require-description': 'error',
      '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    },
  }

  return extendConfig({ ...baseConfig })
}
