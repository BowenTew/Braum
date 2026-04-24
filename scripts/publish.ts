#!/usr/bin/env node

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

import { getAllWorkspacePackages } from './utils/packages'
import { rootDir } from './utils/workspace'

import type { PackageInfo } from './utils/packages'

console.log('🚀 Braum Publish Script')
console.log('======================\n')

interface PublishOptions {
  dryRun: boolean
  tag?: string
  access?: 'public' | 'restricted'
  skipBuild: boolean
  skipChecks: boolean
}

/**
 * 解析命令行参数
 */
function parseArgs(): PublishOptions {
  const args = process.argv.slice(2)
  return {
    dryRun: args.includes('--dry-run') || args.includes('-d'),
    tag: args.find((_, i) => args[i - 1] === '--tag' || args[i - 1] === '-t'),
    access: args.find((_, i) => args[i - 1] === '--access') as 'public' | 'restricted' | undefined,
    skipBuild: args.includes('--skip-build'),
    skipChecks: args.includes('--skip-checks'),
  }
}

/**
 * 运行命令
 */
function runCommand(command: string, cwd: string, dryRun: boolean): string {
  if (dryRun) {
    console.log(`[DRY-RUN] Would run: ${command} in ${cwd}`)
    return ''
  }
  return execSync(command, { cwd, encoding: 'utf-8', stdio: 'pipe' }).trim()
}

/**
 * 检查 git 状态
 */
function checkGitStatus(dryRun: boolean): boolean {
  console.log('🔍 Checking git status...')

  try {
    const status = runCommand('git status --porcelain', rootDir, dryRun)
    if (status && !dryRun) {
      console.error('❌ 有未提交的更改，请先提交或暂存：')
      console.error(status)
      return false
    }

    const branch = runCommand('git branch --show-current', rootDir, dryRun)
    if (branch !== 'main' && !dryRun) {
      console.warn(`⚠️  当前不在 main 分支，而是在 ${branch} 分支`)
    }

    console.log('✅ Git status OK\n')
    return true
  } catch (error) {
    console.error('❌ Git check failed:', error)
    return false
  }
}

/**
 * 检查 npm 登录状态
 */
function checkNpmLogin(dryRun: boolean): boolean {
  console.log('🔍 Checking npm login status...')

  try {
    const user = runCommand('npm whoami', rootDir, dryRun)
    if (!user && !dryRun) {
      console.error('❌ 未登录 npm，请先运行 npm login')
      return false
    }
    console.log(`✅ Logged in as: ${user || '[dry-run]'}\n`)
    return true
  } catch {
    console.error('❌ 未登录 npm，请先运行 npm login')
    return false
  }
}

/**
 * 构建包
 */
function buildPackages(dryRun: boolean): boolean {
  console.log('🔨 Building packages...')

  try {
    if (dryRun) {
      console.log('[DRY-RUN] Would run: pnpm run build')
    } else {
      execSync('pnpm run build', { cwd: rootDir, stdio: 'inherit' })
    }
    console.log('✅ Build completed\n')
    return true
  } catch {
    console.error('❌ Build failed')
    return false
  }
}

/**
 * 检查包是否已发布
 */
function isPackagePublished(name: string, version: string, dryRun: boolean): boolean {
  if (dryRun) return false

  try {
    const publishedVersion = execSync(`npm view ${name}@${version} version`, {
      encoding: 'utf-8',
      stdio: 'pipe',
    }).trim()
    return publishedVersion === version
  } catch {
    return false
  }
}

/**
 * 拓扑排序包
 */
function topologicalSort(packages: PackageInfo[]): PackageInfo[] {
  const visited = new Set<string>()
  const result: PackageInfo[] = []

  function visit(pkg: PackageInfo) {
    if (visited.has(pkg.name)) return
    visited.add(pkg.name)

    for (const depName of pkg.dependencies) {
      const depPkg = packages.find(p => p.name === depName)
      if (depPkg) visit(depPkg)
    }

    result.push(pkg)
  }

  for (const pkg of packages) {
    visit(pkg)
  }

  return result
}

/**
 * 验证包
 */
function validatePackage(pkg: PackageInfo, dryRun: boolean): boolean {
  const packageJsonPath = path.join(pkg.fullPath, 'package.json')
  if (!fs.existsSync(packageJsonPath)) {
    console.error(`❌ ${pkg.name}: package.json not found`)
    return false
  }

  if (!pkg.private) {
    const distPath = path.join(pkg.fullPath, 'dist')
    if (!fs.existsSync(distPath)) {
      console.error(`❌ ${pkg.name}: dist folder not found`)
      return false
    }
  }

  return true
}

/**
 * 发布单个包
 */
function publishPackage(pkg: PackageInfo, options: PublishOptions): boolean {
  if (pkg.private) {
    console.log(`⏭️  ${pkg.name} is private, skipping`)
    return true
  }

  if (isPackagePublished(pkg.name, pkg.version, options.dryRun)) {
    console.log(`⏭️  ${pkg.name}@${pkg.version} already published, skipping`)
    return true
  }

  console.log(`📦 Publishing ${pkg.name}@${pkg.version}...`)

  let command = 'npm publish'
  if (options.dryRun) command += ' --dry-run'
  if (options.tag) command += ` --tag ${options.tag}`
  if (options.access) command += ` --access ${options.access}`

  try {
    if (options.dryRun) {
      console.log(`[DRY-RUN] Would run: ${command} in ${pkg.fullPath}`)
    } else {
      execSync(command, { cwd: pkg.fullPath, stdio: 'inherit' })
    }
    console.log(`✅ ${pkg.name}@${pkg.version} published successfully`)
    return true
  } catch {
    console.error(`❌ ${pkg.name} failed to publish`)
    return false
  }
}

/**
 * 创建 git 标签
 */
function createGitTags(packages: PackageInfo[], dryRun: boolean): boolean {
  console.log('\n🏷️  Creating git tags...')

  try {
    for (const pkg of packages) {
      if (pkg.private) continue

      const tagName = `${pkg.name}@${pkg.version}`
      console.log(`  Creating tag: ${tagName}`)

      if (dryRun) {
        console.log(`[DRY-RUN] Would create tag: ${tagName}`)
      } else {
        runCommand(`git tag -a ${tagName} -m "Release ${tagName}"`, rootDir, dryRun)
      }
    }
    console.log('✅ Git tags created')
    return true
  } catch (error) {
    console.error('❌ Failed to create git tags:', error)
    return false
  }
}

/**
 * 显示发布摘要
 */
function showSummary(packages: PackageInfo[], options: PublishOptions, succeeded: string[], failed: string[]): void {
  console.log('\n' + '='.repeat(50))
  console.log('📋 Publish Summary')
  console.log('='.repeat(50))

  console.log('\nOptions:')
  console.log(`  Dry run: ${options.dryRun ? 'Yes' : 'No'}`)
  console.log(`  Tag: ${options.tag || 'latest'}`)
  console.log(`  Access: ${options.access || 'default'}`)

  console.log('\nPackages to publish:')
  for (const pkg of packages) {
    if (pkg.private) {
      console.log(`  - ${pkg.name}@${pkg.version} (private)`)
    } else {
      const status = failed.includes(pkg.name)
        ? '❌ failed'
        : succeeded.includes(pkg.name)
          ? '✅ published'
          : '⏭️  skipped'
      console.log(`  - ${pkg.name}@${pkg.version} ${status}`)
    }
  }

  if (failed.length > 0) {
    console.error(`\n❌ ${failed.length} package(s) failed to publish`)
    for (const name of failed) {
      console.error(`  - ${name}`)
    }
  }

  if (succeeded.length > 0) {
    console.log(`\n✅ ${succeeded.length} package(s) published successfully`)
    for (const name of succeeded) {
      console.log(`  - ${name}`)
    }
  }
}

/**
 * 主函数
 */
async function main(): Promise<void> {
  const options = parseArgs()

  console.log('Options:')
  console.log(`  Dry run: ${options.dryRun}`)
  console.log(`  Tag: ${options.tag || 'latest'}`)
  console.log(`  Skip build: ${options.skipBuild}`)
  console.log(`  Skip checks: ${options.skipChecks}`)
  console.log()

  // 获取所有包
  const packages = getAllWorkspacePackages()

  if (packages.length === 0) {
    console.log('⚠️  No packages found')
    process.exit(0)
  }

  console.log(`Found ${packages.length} packages:`)
  for (const pkg of packages) {
    const type = pkg.private ? 'private' : 'public'
    console.log(`  - ${pkg.name}@${pkg.version} (${type})`)
  }
  console.log()

  // 检查
  if (!options.skipChecks) {
    if (!checkGitStatus(options.dryRun)) {
      process.exit(1)
    }
    if (!checkNpmLogin(options.dryRun)) {
      process.exit(1)
    }
  }

  // 构建
  if (!options.skipBuild) {
    if (!buildPackages(options.dryRun)) {
      process.exit(1)
    }
  }

  // 验证包
  console.log('🔍 Validating packages...')
  const invalidPackages: string[] = []
  for (const pkg of packages) {
    if (!validatePackage(pkg, options.dryRun)) {
      invalidPackages.push(pkg.name)
    }
  }
  if (invalidPackages.length > 0) {
    console.error(`❌ ${invalidPackages.length} package(s) failed validation`)
    process.exit(1)
  }
  console.log('✅ All packages validated\n')

  // 拓扑排序
  const sortedPackages = topologicalSort(packages)

  // 发布
  console.log('📦 Publishing packages...\n')
  const succeeded: string[] = []
  const failed: string[] = []

  for (const pkg of sortedPackages) {
    if (publishPackage(pkg, options)) {
      if (!pkg.private) {
        succeeded.push(pkg.name)
      }
    } else {
      failed.push(pkg.name)
    }
  }

  // 创建 git 标签
  if (succeeded.length > 0 && !options.dryRun) {
    createGitTags(
      packages.filter(p => succeeded.includes(p.name)),
      options.dryRun,
    )
  }

  // 显示摘要
  showSummary(sortedPackages, options, succeeded, failed)

  if (failed.length > 0) {
    process.exit(1)
  }

  console.log('\n🎉 All packages published successfully!')
}

main().catch(error => {
  console.error('Unexpected error:', error)
  process.exit(1)
})
