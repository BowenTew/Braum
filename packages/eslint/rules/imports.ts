import ImportPlugin from 'eslint-plugin-import'

import { noop } from '../utils'

import type { Linter } from 'eslint'

export interface ImportsOptions {
  extendConfig?: (base: Linter.Config) => Linter.Config
}

export function imports(options: ImportsOptions): Linter.Config {
  const { extendConfig = noop } = options

  const styleRules: Record<string, Linter.RuleEntry> = {
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import/first': 'error',
    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArrowFunction: true,
      },
    ],
    'import/no-duplicates': ['error', { 'prefer-inline': false }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        distinctGroup: true,
      },
    ],
  }

  const staticAnalysisRules: Record<string, Linter.RuleEntry> = {
    'import/export': 'error',
    'import/no-empty-named-blocks': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-unused-modules': 'error',

    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
    'import/no-self-import': 'error',
    'import/no-relative-packages': 'error',
    'import/no-cycle': 'error',
    'import/no-relative-parent-imports': 'error',
    'import/namespace': 'error',
    'import/named': 'error',
    'import/enforce-node-protocol-usage': ['error', 'always'],
    'import/default': 'error',
  }

  const baseRules: Record<string, Linter.RuleEntry> = {
    ...styleRules,
    ...staticAnalysisRules,
  }

  const baseConfig: Linter.Config = {
    name: 'braum/imports/rules',
    plugins: {
      import: ImportPlugin,
    },
    rules: baseRules,
  }

  return extendConfig({ ...baseConfig })
}
