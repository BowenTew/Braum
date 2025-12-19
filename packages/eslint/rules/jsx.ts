// @ts-expect-error jsxA11yPlugin is not a valid ESLint plugin
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'

import { noop } from '../utils'

import type { Linter } from 'eslint'

export interface ReactOptions {
  extendConfig?: (base: Linter.Config) => Linter.Config
}

export const jsx = (options: ReactOptions): Linter.Config => {
  const { extendConfig = noop } = options

  const recommendedRules: Record<string, Linter.RuleEntry> = jsxA11yPlugin.flatConfigs.recommended?.rules ?? {}

  const baseConfig: Linter.Config = {
    name: 'braum/jsx/rules',
    files: ['**/*.jsx'],
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...recommendedRules,
    },
  }

  return extendConfig({ ...baseConfig })
}
