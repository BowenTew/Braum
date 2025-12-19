import type { Linter } from 'eslint'

export interface ReactOptions {
  overrides?: Record<string, Linter.RuleEntry>
}

export const react = async (options: ReactOptions): Promise<Linter.Config[]> => {
  const { overrides = {} } = options
  const baseRules = {}
  return [
    {
      name: 'braum/react/rules',
      files: ['**/*.jsx', '**/*.tsx'],
      rules: {
        ...baseRules,
        ...overrides,
      },
    },
  ]
}
