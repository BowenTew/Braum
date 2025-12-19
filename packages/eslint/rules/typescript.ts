import typescriptPlugin from '@typescript-eslint/eslint-plugin'

import { noop } from '../utils'

import type { Linter } from 'eslint'

export interface TypescriptOptions {
  enableVue?: boolean
  extendConfig?: (base: Linter.Config) => Linter.Config
}

const getCheckedFiles = (enableVue: boolean): string[] => {
  const files: string[] = ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx']
  // If Vue is enabled, we need to include Vue files.
  if (enableVue) {
    files.push('**/*.vue')
  }
  return files
}

export const typescript = (options: TypescriptOptions = {}): Linter.Config => {
  const { enableVue, extendConfig = noop } = options

  const files: string[] = getCheckedFiles(!!enableVue)

  // const tsRecommendedRules = typescriptPlugin.configs.recommended?.rules ?? {}

  const baseRules: Record<string, Linter.RuleEntry> = {
    '@typescript-eslint/no-for-in-array': 'error',
    // ...tsRecommendedRules,
    // '@typescript-eslint/await-thenable': 'error',
    // '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
    // '@typescript-eslint/no-floating-promises': 'error',
    // '@typescript-eslint/no-for-in-array': 'error',
    // '@typescript-eslint/no-implied-eval': 'error',
    // '@typescript-eslint/no-misused-promises': 'error',
    // '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    // '@typescript-eslint/no-unsafe-argument': 'error',
    // '@typescript-eslint/no-unsafe-assignment': 'error',
    // '@typescript-eslint/no-unsafe-call': 'error',
    // '@typescript-eslint/no-unsafe-member-access': 'error',
    // '@typescript-eslint/no-unsafe-return': 'error',
    // '@typescript-eslint/promise-function-async': 'error',
    // '@typescript-eslint/restrict-plus-operands': 'error',
    // '@typescript-eslint/restrict-template-expressions': 'error',
  }

  let baseConfig: Linter.Config = {
    name: 'braum/typescript/rules',
    // Explicitly specify files to prevent TypeScript rules from applying to JavaScript files.
    // Otherwise, you may see "detected a parser other than @typescript-eslint/parser" warning in JavaScript files.
    files,
    plugins: {
      // @ts-expect-error TsPlugin is not a valid ESLint plugin
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...baseRules,
    },
  }

  return extendConfig({ ...baseConfig })
}
