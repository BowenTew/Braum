const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',

  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
}

const formatMessage = (message: string, lines?: string[]) => {
  if (!lines || lines.length === 0) return message

  const separator = `${colors.gray}${'─'.repeat(40)}${colors.reset}`
  return `${message}\n${separator}\n${lines.join('\n')}\n${separator}`
}

export const log = {
  /**
   * Log success message
   * @example log.success('Commit successful!')
   * @example log.success('Commit successful!', ['feat(auth): add login'])
   */
  success: (message: string, lines?: string[]) => {
    console.log()
    console.log(`${colors.green}✅ ${message}${colors.reset}`)
    if (lines && lines.length > 0) {
      console.log()
      console.log(formatMessage(`${colors.cyan}📝 Details:${colors.reset}`, lines))
    }
  },

  /**
   * Log error message
   * @example log.error('Commit failed!')
   * @example log.error('Commit failed!', error)
   */
  error: (message: string, err?: unknown) => {
    console.log()
    console.error(`${colors.red}❌ ${message}${colors.reset}`)
    if (err) {
      const errMessage = err instanceof Error ? err.message : String(err)
      console.error(`${colors.dim}   ${errMessage}${colors.reset}`)
    }
  },

  /**
   * Log warning message
   * @example log.warn('No staged files found')
   */
  warn: (message: string) => {
    console.log()
    console.warn(`${colors.yellow}⚠️  ${message}${colors.reset}`)
  },

  /**
   * Log info message
   * @example log.info('Preparing commit...')
   */
  info: (message: string) => {
    console.log(`${colors.blue}ℹ️  ${message}${colors.reset}`)
  },

  /**
   * Log debug message (dim style)
   * @example log.debug('Config loaded from .czrc')
   */
  debug: (message: string) => {
    console.log(`${colors.gray}   ${message}${colors.reset}`)
  },
}
