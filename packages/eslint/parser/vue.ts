import TypeScriptParser from '@typescript-eslint/parser'
import VueParser from 'vue-eslint-parser'

import { noop } from '../utils'

import type { Linter } from 'eslint'

export interface VueParserOptions {
  /**
   * Allows the caller to make final modifications to the default config.
   * For example: adjust files, languageOptions, ignores, etc.
   */
  extendConfig?: (base: Linter.Config) => Linter.Config
}

export const defineVueParser = (options: VueParserOptions = {}): Linter.Config => {
  const { extendConfig = noop } = options

  // Parser options for Vue files
  // For <script lang="ts"> blocks, use TypeScript parser
  // For <script> or <script setup> blocks (JavaScript), still use TypeScript parser, cause ts rule need it.
  // NOTE：The Project without TypeScript still need tsconfig.json to make it work.
  // I'll fix it then.
  const parserOptions: Record<string, unknown> = {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // Use different parsers for different script blocks
    parser: TypeScriptParser,
    projectService: true,
    tsconfigRootDir: process.cwd(),
    extraFileExtensions: ['.vue'],
  }

  let vueParserConfig: Linter.Config = {
    name: 'braum/vue/parser',
    files: ['**/*.vue'],
    languageOptions: {
      parser: VueParser,
      parserOptions,
    },
  }

  return extendConfig({ ...vueParserConfig })
}
