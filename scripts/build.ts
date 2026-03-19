#!/usr/bin/env node

import { execSync } from 'node:child_process'

import { getAllWorkspacePackages } from './utils/packages'

console.log('🚀 Braum Build Script')
console.log('====================\n')

// 获取所有需要构建的包（必须有 build 脚本）
const packages = getAllWorkspacePackages({ requireBuildScript: true })

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

let i = 0
for (const pkg of packages) {
  console.log(`[${i + 1}/${packages.length}] 构建 ${pkg.name}...`)

  try {
    execSync('pnpm run build', {
      stdio: 'inherit',
      cwd: pkg.fullPath,
    })
    console.log(`✅ ${pkg.name} 构建成功\n`)
  } catch {
    console.error(`❌ ${pkg.name} 构建失败\n`)
    failedPackages.push(pkg.name)
  }
  i++
}

// 输出构建结果
console.log('='.repeat(50))
if (failedPackages.length === 0) {
  console.log('🎉 所有包构建成功!')
  console.log('✅ 构建成功的包:')
  packages.forEach(pkg => {
    console.log(`  - ${pkg.name}`)
  })
  process.exit(0)
} else {
  console.error(`❌ 构建失败: ${failedPackages.length} 个包`)
  console.error('失败的包:')
  failedPackages.forEach(name => {
    console.error(`  - ${name}`)
  })
  process.exit(1)
}
