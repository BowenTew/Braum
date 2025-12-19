import { defineEcmascriptParser } from './parser/ecmascript'
import { defineTypescriptParser } from './parser/typescript'
import { defineVueParser } from './parser/vue'
import { comments } from './rules/comments'
import { imports } from './rules/imports'
import { javascript } from './rules/javascript'
import { jsx } from './rules/jsx'
import { node } from './rules/node'
import { prettier } from './rules/prettier'
import { promise } from './rules/promise'
import { react } from './rules/react'
import { typescript } from './rules/typescript'
import { vue } from './rules/vue'

import type { EslintConfig } from './types'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'

export const importPrettierLint = async (composer: FlatConfigComposer, options: EslintConfig) => {
  const { overrides = {} } = options
  const { extendPrettierRules } = overrides
  const prettierRulesParams = {}
  if (extendPrettierRules) {
    Object.assign(prettierRulesParams, { extendConfig: extendPrettierRules })
  }
  const PrettierRules = prettier(prettierRulesParams)

  await composer.append(PrettierRules)
}

export const importEcmascriptLint = async (composer: FlatConfigComposer, options: EslintConfig) => {
  const { enableVue, overrides = {} } = options
  const { extendEcmascriptParser, extendJavascriptRules } = overrides

  const esParserParams = {}
  const jsRulesParams = {}

  Object.assign(jsRulesParams, { enableVue: !!enableVue })

  if (extendEcmascriptParser) {
    Object.assign(esParserParams, { extendConfig: extendEcmascriptParser })
  }
  if (extendJavascriptRules) {
    Object.assign(jsRulesParams, { extendConfig: extendJavascriptRules })
  }
  const ESParser = defineEcmascriptParser(esParserParams)
  const JavaScriptRules = javascript(jsRulesParams)

  await Promise.all([composer.append(ESParser), composer.append(JavaScriptRules)])
}

export const importTypescriptLint = async (composer: FlatConfigComposer, options: EslintConfig) => {
  const { enableVue, overrides = {} } = options
  const { extendTypescriptParser, extendTypescriptRules } = overrides

  const tsParserParams = {}
  const tsRulesParams = {}

  Object.assign(tsRulesParams, { enableVue: !!enableVue })

  if (extendTypescriptParser) {
    Object.assign(tsParserParams, { extendConfig: extendTypescriptParser })
  }
  if (extendTypescriptRules) {
    Object.assign(tsRulesParams, { extendConfig: extendTypescriptRules })
  }

  const TypeScriptRules = typescript(tsRulesParams)
  const TypeScriptParser = defineTypescriptParser(tsParserParams)

  await Promise.all([composer.append(TypeScriptParser), composer.append(TypeScriptRules)])
}

export const importVueLint = async (composer: FlatConfigComposer, options: EslintConfig) => {
  const { overrides = {} } = options
  const { extendVueParser, extendVueRules } = overrides

  const vueParserParams = {}
  const vueRulesParams = {}

  if (extendVueParser) {
    Object.assign(vueParserParams, { extendConfig: extendVueParser })
  }
  if (extendVueRules) {
    Object.assign(vueRulesParams, { extendConfig: extendVueRules })
  }

  const VueRules = vue(vueRulesParams)
  const VueParser = defineVueParser(vueParserParams)

  await Promise.all([composer.append(VueParser), composer.append(VueRules)])
}

export const importNodeLint = async (composer: FlatConfigComposer, options: EslintConfig) => {
  const { overrides = {} } = options
  const { extendNodeRules } = overrides
  const nodeRulesParams = {}
  if (extendNodeRules) {
    Object.assign(nodeRulesParams, { extendConfig: extendNodeRules })
  }
  const NodeRules = node(nodeRulesParams)
  await composer.append(NodeRules)
}

export const importReactLint = async (composer: FlatConfigComposer, options: EslintConfig) => {
  const { overrides = {} } = options
  const { extendReactRules } = overrides
  const reactRulesParams = {}
  if (extendReactRules) {
    Object.assign(reactRulesParams, { extendConfig: extendReactRules })
  }
  const ReactRules = react(reactRulesParams)
  await composer.append(ReactRules)
}

export const importImportsLint = async (composer: FlatConfigComposer, options: EslintConfig) => {
  const { overrides = {} } = options
  const { extendImportsRules } = overrides
  const importsRulesParams = {}
  if (extendImportsRules) {
    Object.assign(importsRulesParams, { extendConfig: extendImportsRules })
  }
  const ImportsRules = imports(importsRulesParams)
  await composer.append(ImportsRules)
}

export const importPromiseLint = async (composer: FlatConfigComposer, options: EslintConfig) => {
  const { overrides = {} } = options
  const { extendPromiseRules } = overrides
  const promiseRulesParams = {}
  if (extendPromiseRules) {
    Object.assign(promiseRulesParams, { extendConfig: extendPromiseRules })
  }
  const PromiseRules = promise(promiseRulesParams)
  await composer.append(PromiseRules)
}

export const importCommentsLint = async (composer: FlatConfigComposer, options: EslintConfig) => {
  const { overrides = {} } = options
  const { extendCommentsRules } = overrides
  const commentsRulesParams = {}
  if (extendCommentsRules) {
    Object.assign(commentsRulesParams, { extendConfig: extendCommentsRules })
  }
  const CommentsRules = comments(commentsRulesParams)
  await composer.append(CommentsRules)
}

export const importJSXLint = async (composer: FlatConfigComposer, options: EslintConfig) => {
  const { overrides = {} } = options
  const { extendJSXRules } = overrides
  const jsxRulesParams = {}
  if (extendJSXRules) {
    Object.assign(jsxRulesParams, { extendConfig: extendJSXRules })
  }
  const JSXRules = jsx(jsxRulesParams)
  await composer.append(JSXRules)
}
