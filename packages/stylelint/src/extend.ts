import { defineStylelintConfig } from '.'

import type { Config } from 'stylelint'

/**
 * 预置配置入口，供 stylelint extends 使用。
 * 使用 extends: ['@pixelastic-ai/stylelint/config'] 时，stylelint 会从本包目录解析
 * stylelint-config-standard 等依赖，无需在业务项目里重复安装。
 */
const config: Config = defineStylelintConfig({
  enableLess: true,
  enableScss: true,
  enableStyledComponents: true,
  enableVue: true,
})

export default config
