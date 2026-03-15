import type { Config } from 'stylelint'

export interface StylelintOptions {
  enableVue?: boolean
  enableScss?: boolean
  enableLess?: boolean
  enableStyledComponents?: boolean
}

export type ConfigRules = Config['rules']

export type RuleOptions = StylelintOptions & {
  extendConfig?: (base: ConfigOverride) => ConfigOverride
}

export type ConfigOverride = NonNullable<Config['overrides']>[number]

export type ExtendConfig = (base: ConfigOverride) => ConfigOverride
