import TypeScriptParser from '@typescript-eslint/parser'

import { noop } from '../utils'

import type { Linter } from 'eslint'

export interface TypescriptParserOptions {
  /**
   * Allows the caller to make final modifications to the default config.
   * For example: adjust files, languageOptions, ignores, etc.
   */
  extendConfig?: (base: Linter.Config) => Linter.Config
}

export const defineTypescriptParser = (options: TypescriptParserOptions): Linter.Config => {
  const { extendConfig = noop } = options

  const parserOptions: Record<string, unknown> = {
    projectService: true,
    tsconfigRootDir: process.cwd(),
  }

  let tsParserConfig: Linter.Config = {
    name: 'braum/typescript/parser',
    // Supported file extensions for TypeScript:
    // - .ts: Standard TypeScript files
    // - .tsx: TypeScript files with JSX
    // - .mts: ES Module TypeScript files
    // - .cts: CommonJS TypeScript files
    // Note:
    // - Declaration files (.d.ts) are matched by **/*.ts and do not need to be added separately
    // - Vue files (.vue) are handled by Vue parser, which uses TypeScript parser internally for <script lang="ts"> blocks
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      sourceType: 'module',
      parser: TypeScriptParser,
      parserOptions,
    },
  }

  return extendConfig({ ...tsParserConfig })
}
