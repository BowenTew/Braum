import { defineESLintConfig } from '@pixelastic-ai/eslint'

const config = await defineESLintConfig({
  enableJSX: true,
})

export default config
