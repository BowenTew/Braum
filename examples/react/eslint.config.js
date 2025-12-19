import { defineESLintConfig } from '@braum/eslint'

const config = await defineESLintConfig({
  enableJSX: true,
})

export default config
