// @ts-nocheck
import PromisePlugin from 'eslint-plugin-promise'

import { noop } from '../utils'

import type { Linter } from 'eslint'

export interface PromiseOptions {
  extendConfig?: (base: Linter.Config) => Linter.Config
}

export function promise(options: PromiseOptions): Linter.Config {
  const { extendConfig = noop } = options

  const baseRules: Record<string, Linter.RuleEntry> = {
    ...PromisePlugin.configs['flat/recommended'].rules,
    'promise/catch-or-return': ['error', { allowFinally: true }],
  }

  const baseConfig: Linter.Config = {
    name: 'braum/promise/rules',
    plugins: {
      promise: PromisePlugin,
    },
    rules: {
      ...baseRules,
    },
  }

  return extendConfig({ ...baseConfig })
}
