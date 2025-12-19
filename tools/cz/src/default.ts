import type { CommitType, CZConfig } from './types'

export const BUILTIN_TYPES: CommitType[] = [
  { name: '🚀 feat', value: '🚀 feat', description: 'A new feature' },
  { name: '🐛 fix', value: '🐛 fix', description: 'A bug fix' },
  { name: '📝 docs', value: '📝 docs', description: 'Documentation only changes' },
  { name: '💄 style', value: '💄 style', description: 'Code style changes (formatting, semicolons, etc)' },
  {
    name: '♻️  refactor',
    value: '♻️  refactor',
    description: 'Code refactoring without adding features or fixing bugs',
  },
  { name: '⚡️ perf', value: '⚡ perf', description: 'Performance improvements' },
  { name: '✅ test', value: '✅ test', description: 'Adding or updating tests' },
  { name: '📦 build', value: '📦 build', description: 'Build system or external dependencies changes' },
  { name: '👷 ci', value: '👷 ci', description: 'CI configuration changes' },
  { name: '🔧 chore', value: '🔧 chore', description: "Other changes that don't modify src or test files" },
  { name: '⏪ revert', value: '⏪ revert', description: 'Reverts a previous commit' },
]

export const DEFAULT_CONFIG: CZConfig = {
  types: BUILTIN_TYPES,
  dryRun: false,
}
