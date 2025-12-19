import VuePlugin from 'eslint-plugin-vue'

import { noop } from '../utils'

import type { Linter } from 'eslint'

export interface VueOptions {
  extendConfig?: (base: Linter.Config) => Linter.Config
}

const getVueRecommendedRules = (): Record<string, Linter.RuleEntry> => {
  const vueConfigs: Linter.Config[] = VuePlugin.configs['flat/recommended'] ?? []
  // Extract all rules from the config array
  const vueRecommendedRules: Record<string, Linter.RuleEntry> = {}
  for (const config of vueConfigs) {
    if (config.rules) {
      Object.assign(vueRecommendedRules, config.rules)
    }
  }
  return vueRecommendedRules
}

export const vue = (options: VueOptions): Linter.Config => {
  const { extendConfig = noop } = options
  const vueRecommendedRules = getVueRecommendedRules()

  const baseRules: Record<string, Linter.RuleEntry> = {
    ...vueRecommendedRules,
    'vue/comment-directive': 'off',
  }

  let baseConfig: Linter.Config = {
    name: 'braum/vue/rules',
    files: ['**/*.vue'],
    plugins: {
      vue: VuePlugin,
    },
    rules: {
      ...baseRules,
    },
  }

  return extendConfig({ ...baseConfig })
}
