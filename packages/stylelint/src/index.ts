import { vueOverride, lessOverride, scssOverride, styledComponentsOverride } from './overrides'
import { styleLintRules } from './rules'

import type { StylelintOptions } from './types'
import type { Config } from 'stylelint'

export function defineStylelintConfig(options: StylelintOptions = {}): Config {
  const { enableVue = false, enableScss = false, enableLess = false, enableStyledComponents = false } = options

  const config: Config = {
    extends: ['stylelint-config-standard', 'stylelint-config-idiomatic-order'],
    plugins: [
      'stylelint-high-performance-animation',
      'stylelint-declaration-strict-value',
      'stylelint-no-browser-hacks',
    ],
    rules: styleLintRules() || {},
    overrides: [],
  }

  // Vue Config
  if (enableVue) {
    const vue = vueOverride()
    config.overrides!.push(vue)
  }

  // SCSS Config
  if (enableScss) {
    const scss = scssOverride()
    config.overrides!.push(scss)
  }

  // Less Config
  if (enableLess) {
    const less = lessOverride()
    config.overrides!.push(less)
  }

  // styled-components Config
  if (enableStyledComponents) {
    const styledComponents = styledComponentsOverride()
    config.overrides!.push(styledComponents)
  }
  return config
}
