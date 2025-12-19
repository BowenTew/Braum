import { FlatConfigComposer } from 'eslint-flat-config-utils'

import {
  importTypescriptLint,
  importEcmascriptLint,
  importPrettierLint,
  importVueLint,
  importNodeLint,
  importReactLint,
  importPromiseLint,
  importImportsLint,
  importCommentsLint,
  importJSXLint,
} from './facroty'

import type { EslintConfig } from './types'

export const defineESLintConfig = async (options: EslintConfig): Promise<FlatConfigComposer> => {
  const {
    enableVue,
    enableReact,
    enableJSX,
    enableNode,
    enablePromise = true,
    enableComments = true,
    enableImports = true,
    enablePrettier = true,
    enableTypescript = true,
  } = options

  const composer = new FlatConfigComposer()

  await importEcmascriptLint(composer, options)

  if (enablePrettier) {
    await importPrettierLint(composer, options)
  }

  if (enableTypescript) {
    await importTypescriptLint(composer, options)
  }

  if (enableVue) {
    await importVueLint(composer, options)
  }

  if (enableImports) {
    await importImportsLint(composer, options)
  }

  if (enablePromise) {
    await importPromiseLint(composer, options)
  }

  if (enableReact) {
    await importReactLint(composer, options)
  }

  if (enableNode) {
    await importNodeLint(composer, options)
  }

  if (enableComments) {
    await importCommentsLint(composer, options)
  }

  if (enableJSX) {
    await importJSXLint(composer, options)
  }

  return composer
}
