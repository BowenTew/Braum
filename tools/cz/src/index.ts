#!/usr/bin/env node

import { getCzConfig } from './config'
import { conventional } from './conventional'
import { commit } from './git'
import { log } from './log'

export const run = async () => {
  const config = await getCzConfig()
  const commitMessage = await conventional(config)
  if (config.dryRun) {
    log.info('Dry run mode, commit message:')
    log.info(commitMessage)
    return
  }
  await commit(commitMessage)

  log.success('Commit successful!', [commitMessage])
}
