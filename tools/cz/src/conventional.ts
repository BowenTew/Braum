import { select, input } from '@inquirer/prompts'

import type { CZConfig } from './types'

type CommitConfig = {
  types: string
  scopes?: string
  subject: string
  body?: string
  footer?: string
}

/**
 * 将 CommitConfig 转换为 git commit message
 * Transform CommitConfig to git commit message
 * Pattern: <type>(<scope>): <subject>
 *
 *       <body>
 *
 *       <footer>
 */
const formatCommitMessage = (config: CommitConfig): string => {
  const { types, scopes, subject, body, footer } = config

  // build header: type(scope): subject
  let header = types
  if (scopes) {
    header += `(${scopes})`
  }
  header += `: ${subject}`

  // build full message
  const parts = [header]

  if (body && body.trim()) {
    parts.push('', body.trim())
  }

  if (footer && footer.trim()) {
    parts.push('', footer.trim())
  }

  return parts.join('\n')
}

export const conventional = async (config: CZConfig): Promise<string> => {
  const { types, scopes, hasBody = false, hasFooter = false } = config

  const commitConfig: CommitConfig = {
    types: '',
    subject: '',
  }

  //Required Step1: Choose the type of commit
  commitConfig.types = await select({
    message: "Select the type (indicates the type of change that you're committing)",
    choices: types,
  })

  // Optional Step2: Choose the scope of the commit
  if (scopes && scopes.length > 0) {
    commitConfig.scopes = await select({
      message: 'Select the scope (indicates which module or component is affected, e.g. feat(scope): message)',
      choices: scopes,
    })
  }

  // Required Step3: Input the subject of the commit
  commitConfig.subject = await input({
    message: 'Input the subject of the commit',
    validate: (subject: string) => {
      if (subject.length === 0) {
        return 'Subject is required and cannot be empty'
      }
      return true
    },
  })

  if (hasBody) {
    commitConfig.body = await input({
      message: 'Input the body of the commit',
    })
  }

  if (hasFooter) {
    commitConfig.footer = await input({
      message: 'Input the footer of the commit',
    })
  }

  return formatCommitMessage(commitConfig)
}
