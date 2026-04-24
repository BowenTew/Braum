#!/usr/bin/env node

import * as fs from 'node:fs'
import * as path from 'node:path'

import { packagesDir, toolsDir } from './workspace'

export interface BasePackageInfo {
  name: string
  path: string
  fullPath: string
}

export interface PackageInfo extends BasePackageInfo {
  version: string
  private: boolean
  dependencies: string[]
  hasBuildScript: boolean
}

export interface PackageFilter {
  /** 是否需要有 build 脚本 */
  requireBuildScript?: boolean
}

/**
 * 读取并解析 package.json
 */
export function readPackageJson(dir: string): Record<string, unknown> | null {
  const packageJsonPath = path.join(dir, 'package.json')
  if (!fs.existsSync(packageJsonPath)) return null

  try {
    return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  } catch {
    return null
  }
}

/**
 * 获取基础包信息
 */
export function getBasePackageInfo(dir: string, packagePath: string): BasePackageInfo | null {
  const packageJson = readPackageJson(dir)
  if (!packageJson) return null

  return {
    name: (packageJson.name as string) || path.basename(dir),
    path: packagePath,
    fullPath: dir,
  }
}

/**
 * 获取完整包信息（用于发布）
 */
export function getPackageInfo(dir: string, packagePath: string): PackageInfo | null {
  const packageJson = readPackageJson(dir)
  if (!packageJson) return null

  const deps = [
    ...Object.keys((packageJson.dependencies as Record<string, string>) || {}),
    ...Object.keys((packageJson.devDependencies as Record<string, string>) || {}),
    ...Object.keys((packageJson.peerDependencies as Record<string, string>) || {}),
  ].filter(dep => dep.startsWith('@pixelastic-ai/'))

  return {
    name: (packageJson.name as string) || path.basename(dir),
    path: packagePath,
    fullPath: dir,
    version: (packageJson.version as string) || '0.0.0',
    private: packageJson.private === true,
    dependencies: deps,
    hasBuildScript: !!(
      packageJson.scripts &&
      typeof packageJson.scripts === 'object' &&
      (packageJson.scripts as Record<string, string>).build
    ),
  }
}

/**
 * 递归获取所有包
 * @param dir 扫描目录
 * @param basePath 基础路径
 * @param filter 过滤器
 * @returns 包列表
 */
export function getAllPackages(dir: string, basePath = '', filter?: PackageFilter): PackageInfo[] {
  const packages: PackageInfo[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(dir, entry.name)
      const packagePath = basePath ? `${basePath}/${entry.name}` : entry.name
      const packageInfo = getPackageInfo(fullPath, packagePath)

      if (packageInfo) {
        // 应用过滤器
        if (filter?.requireBuildScript && !packageInfo.hasBuildScript) {
          continue
        }
        packages.push(packageInfo)
      } else {
        // 继续递归查找子目录
        const subPackages = getAllPackages(fullPath, packagePath, filter)
        packages.push(...subPackages)
      }
    }
  }

  return packages
}

/**
 * 从 packages 和 tools 目录获取所有包
 * @param filter 过滤器
 * @returns 合并后的包列表
 */
export function getAllWorkspacePackages(filter?: PackageFilter): PackageInfo[] {
  const packagesFromPackages = fs.existsSync(packagesDir) ? getAllPackages(packagesDir, '', filter) : []
  const packagesFromTools = fs.existsSync(toolsDir) ? getAllPackages(toolsDir, '', filter) : []

  return [...packagesFromPackages, ...packagesFromTools]
}
