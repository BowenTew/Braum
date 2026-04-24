import { execSync } from 'node:child_process'

export const commit = async (message: string) => {
  execSync(`CZ_TYPE=1 git commit -m "${message.replace(/"/g, '\\"')}"`, {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: { ...process.env, CZ_TYPE: '1' },
  })
}
