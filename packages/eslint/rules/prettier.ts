import PrettierPlugin from 'eslint-plugin-prettier'

import { noop } from '../utils'

import type { Linter } from 'eslint'

export interface PrettierOptions {
  extendConfig?: (base: Linter.Config) => Linter.Config
}

export const prettier = (options: PrettierOptions): Linter.Config => {
  const { extendConfig = noop } = options

  const baseConfig: Linter.Config = {
    name: 'braum/prettier/rules',
    plugins: {
      prettier: PrettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  }

  return extendConfig({ ...baseConfig })
}
