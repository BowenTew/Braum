import type { UserConfig } from '@commitlint/types'

const noop = (base: UserConfig): UserConfig => base

export interface CommitlintOptions {
  extendConfig?: (base: UserConfig) => UserConfig
}

/**
 * default config
 */
export const DEFAULT_TYPES = [
  'feat', // A new feature
  'fix', // A bug fix
  'docs', // Documentation only changes
  'style', // Code style changes (formatting, semicolons, etc)
  'refactor', // Code refactoring without adding features or fixing bugs
  'perf', // Performance improvements
  'test', // Adding or updating tests
  'build', // Build system or external dependencies changes
  'ci', // CI configuration changes
  'chore', // Other changes that don't modify src or test files
  'revert', // Reverts a previous commit
] as const

/**
 * define commitlint config
 */
export function defineCommitlintConfig(options: CommitlintOptions = {}): UserConfig {
  const { extendConfig = noop } = options

  const baseConfig: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: {
      parserOpts: {
        // support emoji format: "🚀 feat(scope): subject" or "🚀 feat: subject"
        // skip emoji prefix, only capture pure text type
        headerPattern: /^.+\s(\w+)(?:\((.+)\))?:\s(.+)$/,
        headerCorrespondence: ['type', 'scope', 'subject'],
      },
    },
    rules: {
      // Type rule
      'type-enum': [2, 'always', [...DEFAULT_TYPES]],
      'type-case': [2, 'always', 'lowerCase'],
      'type-empty': [2, 'never'],

      // Scope rule
      'scope-case': [2, 'always', 'lowerCase'],
      'scope-empty': [0, 'never'],

      // Subject rule
      'subject-case': [0], // 允许任意大小写
      'subject-empty': [2, 'never'],
      'subject-full-stop': [2, 'never', '.'],
      'subject-max-length': [2, 'always', 100],
      'subject-min-length': [2, 'always', 0],

      // Header rule
      'header-max-length': [2, 'always', 100],

      // Body rule
      'body-empty': [0],
      'body-max-line-length': [2, 'always', 100],
      'body-leading-blank': [2, 'always'],

      // Footer rule
      'footer-max-line-length': [2, 'always', 100],
      'footer-leading-blank': [2, 'always'],
    },
  }

  return extendConfig({ ...baseConfig })
}
