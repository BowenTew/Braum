import globals from 'globals'

import { noop } from '../utils'

import type { Linter } from 'eslint'

export interface EcmascriptParserOptions {
  /**
   * Allows the caller to make final modifications to the default config.
   * For example: adjust files, languageOptions, ignores, etc.
   */
  extendConfig?: (base: Linter.Config) => Linter.Config
}

export const defineEcmascriptParser = (options: EcmascriptParserOptions = {}): Linter.Config => {
  const { extendConfig = noop } = options

  let esParserConfig: Linter.Config = {
    name: 'braum/ecmascript/parser',
    files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  }

  return extendConfig({ ...esParserConfig })
}
