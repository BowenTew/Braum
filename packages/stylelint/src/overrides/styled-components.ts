import type { ConfigOverride } from '../types'

export const styledComponents = (): ConfigOverride => {
  return {
    files: ['**/*.{ts,tsx,js,jsx}'],
    customSyntax: 'postcss-styled-syntax',
    rules: {
      // Disable browser-hacks check for consistency with other overrides
      'plugin/no-browser-hacks': null,

      // Empty style placeholders are common in CSS-in-JS
      'no-empty-source': null,

      // Template literals may not end with a newline
      'no-missing-end-of-source-newline': null,

      // styled-components handles vendor prefixes automatically
      'value-no-vendor-prefix': null,
      'property-no-vendor-prefix': null,

      // Empty line rules don't apply well in CSS-in-JS
      'declaration-empty-line-before': null,

      // Formatting rules may conflict with JS formatters
      'value-list-comma-newline-after': null,
      'function-whitespace-after': null,

      // JS interpolations as selectors cannot be validated
      'selector-type-no-unknown': null,

      // CSS-in-JS doesn't use @import
      'import-notation': null,

      // Disable property order check (interpolations may cause false positives)
      'order/properties-order': null,
    },
  }
}
