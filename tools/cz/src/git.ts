import { execSync } from 'node:child_process'

export const commit = async (message: string) => {
  execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, {
    stdio: 'inherit',
    cwd: process.cwd(),
  })
}
