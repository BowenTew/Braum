import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const rootDir = path.join(__dirname, '../..')
export const packagesDir = path.join(rootDir, 'packages')
export const toolsDir = path.join(rootDir, 'tools')
