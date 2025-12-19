module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
    rules: {
      'string-quotes': 'single',
      'at-rule-no-unknown': [
        true,
        {
          ignoreAtRules: [
            'extends',
            'tailwind',
            'include',
            'mixin',
            'function',
            'return',
            'if',
            'else',
            'each',
            'for',
            'while',
          ],
        },
      ],
      'declaration-block-trailing-semicolon': 'always',
      'no-descending-specificity': null,
      'scss/at-rule-no-unknown': true,
      'scss/at-import-partial-extension': null,
    },
  }
  