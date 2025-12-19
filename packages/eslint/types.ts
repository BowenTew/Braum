import type { Linter } from 'eslint'

export interface Overrides {
  extendPrettierRules?: (base: Linter.Config) => Linter.Config
  extendEcmascriptParser?: (base: Linter.Config) => Linter.Config
  extendTypescriptParser?: (base: Linter.Config) => Linter.Config
  extendVueParser?: (base: Linter.Config) => Linter.Config
  extendJavascriptRules?: (base: Linter.Config) => Linter.Config
  extendTypescriptRules?: (base: Linter.Config) => Linter.Config
  extendImportsRules?: (base: Linter.Config) => Linter.Config
  extendPromiseRules?: (base: Linter.Config) => Linter.Config
  extendVueRules?: (base: Linter.Config) => Linter.Config
  extendReactRules?: (base: Linter.Config) => Linter.Config
  extendNodeRules?: (base: Linter.Config) => Linter.Config
  extendCommentsRules?: (base: Linter.Config) => Linter.Config
  extendJSXRules?: (base: Linter.Config) => Linter.Config
}

export interface EslintConfig {
  enableJSX?: boolean
  enableVue?: boolean
  enableReact?: boolean
  enablePrettier?: boolean
  enablePromise?: boolean
  enableTypescript?: boolean
  enableImports?: boolean
  enableNode?: boolean
  enableComments?: boolean

  overrides?: Overrides
}
