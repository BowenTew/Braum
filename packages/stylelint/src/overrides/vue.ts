import type { ConfigOverride } from '../types'

export const vue = (): ConfigOverride => {
  return {
    files: ['**/*.vue'],
    customSyntax: 'postcss-html',
  }
}
