import type { Config } from 'prettier'

interface PrettierConfig {
  xml?: boolean
  css?: boolean
  userOverrides?: Config
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function deepMergeObject(base: Record<string, unknown>, overrides: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base }

  for (const [key, overrideValue] of Object.entries(overrides)) {
    const baseValue = result[key]

    // if array：merge with origin array（if origin array has no value， equals to override）
    if (Array.isArray(overrideValue)) {
      const baseArr = Array.isArray(baseValue) ? baseValue : []
      result[key] = [...baseArr, ...overrideValue]
      continue
    }

    // if basic type， override directly
    if (overrideValue === null || typeof overrideValue !== 'object') {
      result[key] = overrideValue
      continue
    }

    // if both are "plain object"， merge recursively
    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = deepMergeObject(baseValue as Record<string, unknown>, overrideValue as Record<string, unknown>)
      continue
    }

    // others：overrides directly
    result[key] = overrideValue
  }

  return result
}

function mergeConfig(base: Config, overrides: Config): Config {
  return deepMergeObject(base, overrides)
}

export const definePrettierConfig = async (options: PrettierConfig) => {
  let config: Config = {
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    printWidth: 120,
    useTabs: false,
    quoteProps: 'as-needed',
    bracketSpacing: true,
    arrowParens: 'avoid',
    endOfLine: 'auto',
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        options: {
          parser: 'typescript',
        },
      },
    ],
  }

  if (options.xml) {
    const xmlPlugin = await import('@prettier/plugin-xml')
    config = mergeConfig(config, {
      plugins: [xmlPlugin.default],
      xmlQuoteAttributes: 'double',
      xmlSelfClosingSpace: true,
      xmlSortAttributesByKey: false,
      xmlWhitespaceSensitivity: 'ignore',
    })
  }

  config = mergeConfig(config, options.userOverrides || {})
  return config
}
