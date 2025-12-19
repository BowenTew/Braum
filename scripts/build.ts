#!/usr/bin/env node

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🚀 Braum Build Script')
console.log('====================\n')

const rootDir = path.join(__dirname, '..')
const packagesDir = path.join(rootDir, 'packages')
const toolsDir = path.join(rootDir, 'tools')

interface PackageInfo {
  name: string
  path: string
  fullPath: string
}

/**
 * 递归获取所有包目录
 */
function getAllPackages(dir: string, basePath = ''): PackageInfo[] {
  const packages: PackageInfo[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(dir, entry.name)
      const packagePath = basePath ? `${basePath}/${entry.name}` : entry.name
      const packageJsonPath = path.join(fullPath, 'package.json')

      // 检查是否有 package.json
      if (fs.existsSync(packageJsonPath)) {
        try {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as {
            name?: string
            scripts?: { build?: string }
          }
          // 检查是否有 build 脚本
          if (packageJson.scripts && packageJson.scripts.build) {
            packages.push({
              name: packageJson.name || entry.name,
              path: packagePath,
              fullPath,
            })
          }
        } catch {
          console.warn(`⚠️  跳过 ${packagePath}: 无法解析 package.json`)
        }
      } else {
        // 继续递归查找子目录
        const subPackages = getAllPackages(fullPath, packagePath)
        packages.push(...subPackages)
      }
    }
  }

  return packages
}

// 获取所有需要构建的包
const packagesFromPackages = fs.existsSync(packagesDir) ? getAllPackages(packagesDir) : []
const packagesFromTools = fs.existsSync(toolsDir) ? getAllPackages(toolsDir) : []
const packages = [...packagesFromPackages, ...packagesFromTools]

if (packages.length === 0) {
  console.log('⚠️  未找到需要构建的包')
  process.exit(0)
}

console.log(`📦 找到 ${packages.length} 个需要构建的包:`)
packages.forEach((pkg, index) => {
  console.log(`   ${index + 1}. ${pkg.name} (${pkg.path})`)
})
console.log()

// 构建所有包
console.log('🔨 开始构建包...\n')
const failedPackages: string[] = []

for (let i = 0; i < packages.length; i++) {
  const pkg = packages[i]
  console.log(`[${i + 1}/${packages.length}] 构建 ${pkg?.name ?? 'unknown'}...`)

  try {
    execSync('pnpm run build', {
      stdio: 'inherit',
      cwd: pkg?.fullPath ?? '',
    })
    console.log(`✅ ${pkg?.name ?? 'unknown'} 构建成功\n`)
  } catch {
    console.error(`❌ ${pkg?.name ?? 'unknown'} 构建失败\n`)
    failedPackages.push(pkg?.name ?? 'unknown')
  }
}

// 输出构建结果
console.log('='.repeat(50))
if (failedPackages.length === 0) {
  console.log('🎉 所有包构建成功!')
  // 输出构建成功的包
  const succeededPackages = packages.map(pkg => pkg.name).filter(name => !failedPackages.includes(name))
  if (succeededPackages.length > 0) {
    console.log('✅ 构建成功的包:')
    succeededPackages.forEach(name => {
      console.log(`  - ${name}`)
    })
  }
  process.exit(0)
} else {
  console.error(`❌ 构建失败: ${failedPackages.length} 个包`)
  console.error('失败的包:')
  failedPackages.forEach(name => {
    console.error(`  - ${name}`)
  })
  process.exit(1)
}
