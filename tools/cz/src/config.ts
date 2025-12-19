import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { DEFAULT_CONFIG } from './default'
import { log } from './log'

import type { CZConfig } from './types'

const CONFIG_FILES = ['cz.config.js', 'cz.config.mjs', 'cz.config.cjs', 'cz.config.json']

const parseJsonConfig = (content: string, filePath: string): Partial<CZConfig> | null => {
  try {
    return JSON.parse(content) as Partial<CZConfig>
  } catch (err) {
    log.error(`Failed to parse JSON config: ${filePath}`, err)
    return null
  }
}

const mergeConfig = (userConfig: Partial<CZConfig>): CZConfig => {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
    // ensure types always has value
    types: userConfig.types ?? DEFAULT_CONFIG.types,
  }
}

export const getCzConfig = async (): Promise<CZConfig> => {
  const cwd = process.cwd()

  for (const filename of CONFIG_FILES) {
    const configPath = resolve(cwd, filename)
    if (!existsSync(configPath)) continue

    if (filename.endsWith('.json')) {
      const content = readFileSync(configPath, 'utf-8')
      const userConfig = parseJsonConfig(content, configPath)
      if (!userConfig) continue
      return mergeConfig(userConfig)
    }

    try {
      const czConfigModule = await import(pathToFileURL(configPath).href)
      const userConfig = czConfigModule.default as Partial<CZConfig>
      return mergeConfig(userConfig)
    } catch (err) {
      log.error(`Failed to load config: ${configPath}`, err)
      continue
    }
  }

  // return default config, if user not provide config
  return DEFAULT_CONFIG
}
