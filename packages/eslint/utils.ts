import type { Linter } from 'eslint'

export const noop: (base: Linter.Config) => Linter.Config = base => base
