// @ts-expect-error
import postcssLess from 'postcss-less'
import stylelintLess from 'stylelint-less'

import type { RuleOptions, ConfigOverride } from '../types'

const getOverrideFiles = (options?: RuleOptions): string[] => {
  if (options?.enableVue) {
    return ['**/*.less', '**/*.vue']
  }
  return ['**/*.less']
}

export const less = (options?: RuleOptions): ConfigOverride => {
  return {
    files: getOverrideFiles(options),
    customSyntax: postcssLess,
    plugins: [stylelintLess],
    rules: {},
  }
}
