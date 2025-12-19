// @ts-expect-error NodePlugin is not a valid ESLint plugin
import * as NodePlugin from 'eslint-plugin-n'

import { noop } from '../utils'

import type { Linter } from 'eslint'

export interface NodeOptions {
  extendConfig?: (base: Linter.Config) => Linter.Config
}

export const node = (options: NodeOptions): Linter.Config => {
  const { extendConfig = noop } = options

  const baseRules: Record<string, Linter.RuleEntry> = {
    'node/handle-callback-err': ['error', '^(err|error)$'],
    'node/no-deprecated-api': 'error',
    'node/no-exports-assign': 'error',
    'node/no-new-require': 'error',
    'node/no-path-concat': 'error',
    'node/prefer-global/buffer': ['error', 'never'],
    'node/prefer-global/process': ['error', 'never'],
    'node/process-exit-as-throw': 'error',
  }

  let baseConfig: Linter.Config = {
    name: 'braum/node/rules',
    files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts'],
    plugins: {
      node: NodePlugin,
    },
    rules: {
      ...baseRules,
    },
  }

  return extendConfig({ ...baseConfig })
}
