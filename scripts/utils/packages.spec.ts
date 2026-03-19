import fs from 'node:fs'
import path from 'node:path'

import { describe, it, expect, beforeAll, afterAll } from 'vitest'

import { readPackageJson, getPackageInfo, getAllPackages, getAllWorkspacePackages } from './packages'

const testDir = path.join(import.meta.dirname, 'pkgtest')

describe('utils', () => {
  // 创建测试用的 mock 包结构
  beforeAll(() => {
    // 清理测试目录
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true })
    }

    // 创建测试包结构
    // pkg-a: 普通包，有 build 脚本
    fs.mkdirSync(path.join(testDir, 'pkg-a'), { recursive: true })
    fs.writeFileSync(
      path.join(testDir, 'pkg-a', 'package.json'),
      JSON.stringify({
        name: '@braum/pkg-a',
        version: '1.0.0',
        scripts: { build: 'echo build' },
      }),
    )

    // pkg-b: 没有 build 脚本
    fs.mkdirSync(path.join(testDir, 'pkg-b'), { recursive: true })
    fs.writeFileSync(
      path.join(testDir, 'pkg-b', 'package.json'),
      JSON.stringify({
        name: '@braum/pkg-b',
        version: '2.0.0',
      }),
    )

    // pkg-c: private 包
    fs.mkdirSync(path.join(testDir, 'pkg-c'), { recursive: true })
    fs.writeFileSync(
      path.join(testDir, 'pkg-c', 'package.json'),
      JSON.stringify({
        name: '@braum/pkg-c',
        version: '3.0.0',
        private: true,
        scripts: { build: 'echo build' },
      }),
    )

    // nested/pkg-d: 嵌套包，有内部依赖
    fs.mkdirSync(path.join(testDir, 'nested', 'pkg-d'), { recursive: true })
    fs.writeFileSync(
      path.join(testDir, 'nested', 'pkg-d', 'package.json'),
      JSON.stringify({
        name: '@braum/pkg-d',
        version: '4.0.0',
        scripts: { build: 'echo build' },
        dependencies: {
          '@braum/pkg-a': 'workspace:*',
        },
      }),
    )

    // 非包目录（没有 package.json）
    fs.mkdirSync(path.join(testDir, 'not-a-package'), { recursive: true })
  })

  afterAll(() => {
    // 清理测试目录
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true })
    }
  })

  describe('readPackageJson', () => {
    it('should read existing package.json', () => {
      const result = readPackageJson(path.join(testDir, 'pkg-a'))
      expect(result).toEqual({
        name: '@braum/pkg-a',
        version: '1.0.0',
        scripts: { build: 'echo build' },
      })
    })

    it('should return null for non-existing package.json', () => {
      const result = readPackageJson(path.join(testDir, 'not-a-package'))
      expect(result).toBeNull()
    })

    it('should return null for non-existing directory', () => {
      const result = readPackageJson(path.join(testDir, 'non-existing'))
      expect(result).toBeNull()
    })
  })

  describe('getPackageInfo', () => {
    it('should get full package info', () => {
      const result = getPackageInfo(path.join(testDir, 'pkg-a'), 'pkg-a')
      expect(result).toMatchObject({
        name: '@braum/pkg-a',
        path: 'pkg-a',
        version: '1.0.0',
        private: false,
        hasBuildScript: true,
        dependencies: [],
      })
      expect(result?.fullPath).toBeDefined()
    })

    it('should detect private flag', () => {
      const result = getPackageInfo(path.join(testDir, 'pkg-c'), 'pkg-c')
      expect(result?.private).toBe(true)
    })

    it('should detect build script absence', () => {
      const result = getPackageInfo(path.join(testDir, 'pkg-b'), 'pkg-b')
      expect(result?.hasBuildScript).toBe(false)
    })

    it('should extract @braum dependencies', () => {
      const result = getPackageInfo(path.join(testDir, 'nested', 'pkg-d'), 'nested/pkg-d')
      expect(result?.dependencies).toEqual(['@braum/pkg-a'])
    })

    it('should return null for non-package directory', () => {
      const result = getPackageInfo(path.join(testDir, 'not-a-package'), 'not-a-package')
      expect(result).toBeNull()
    })
  })

  describe('getAllPackages', () => {
    it('should get all packages without filter', () => {
      const result = getAllPackages(testDir)
      expect(result).toHaveLength(4)
      const names = result.map(p => p.name).sort()
      expect(names).toEqual(['@braum/pkg-a', '@braum/pkg-b', '@braum/pkg-c', '@braum/pkg-d'])
    })

    it('should filter packages with build script', () => {
      const result = getAllPackages(testDir, '', { requireBuildScript: true })
      expect(result).toHaveLength(3)
      const names = result.map(p => p.name).sort()
      expect(names).toEqual(['@braum/pkg-a', '@braum/pkg-c', '@braum/pkg-d'])
    })

    it('should preserve path structure', () => {
      const result = getAllPackages(testDir)
      const pkgD = result.find(p => p.name === '@braum/pkg-d')
      expect(pkgD?.path).toBe('nested/pkg-d')
    })

    it('should return empty array for empty directory', () => {
      const emptyDir = path.join(testDir, 'empty')
      fs.mkdirSync(emptyDir, { recursive: true })
      const result = getAllPackages(emptyDir)
      expect(result).toEqual([])
      fs.rmdirSync(emptyDir)
    })

    it('should handle non-existing directory', () => {
      expect(() => {
        getAllPackages(path.join(testDir, 'non-existing'))
      }).toThrow()
    })
  })

  describe('getAllWorkspacePackages', () => {
    it('should get packages from workspace', () => {
      // 这个测试依赖于实际的 packages/ 和 tools/ 目录
      const result = getAllWorkspacePackages()
      expect(result.length).toBeGreaterThan(0)

      // 检查是否包含已知的包
      const names = result.map(p => p.name)
      expect(names).toContain('@braum/eslint')
      expect(names).toContain('@braum/prettier')
    })

    // it('should filter workspace packages with build script', () => {
    //   const result = getAllWorkspacePackages({ requireBuildScript: true })
    //   // @braum/typescript-config 没有 build 脚本
    //   const names = result.map(p => p.name)
    //   expect(names).not.toContain('@braum/typescript-config')
    // })

    // it('should include private packages', () => {
    //   const result = getAllWorkspacePackages()
    //   // @braum/typescript-config 是 private
    //   const tsconfig = result.find(p => p.name === '@braum/typescript-config')
    //   expect(tsconfig?.private).toBe(true)
    // })
  })

  describe('PackageInfo structure', () => {
    it('should have all required fields', () => {
      const result = getPackageInfo(path.join(testDir, 'pkg-a'), 'pkg-a')
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('path')
      expect(result).toHaveProperty('fullPath')
      expect(result).toHaveProperty('version')
      expect(result).toHaveProperty('private')
      expect(result).toHaveProperty('dependencies')
      expect(result).toHaveProperty('hasBuildScript')
    })

    it('should have correct types', () => {
      const result = getPackageInfo(path.join(testDir, 'pkg-a'), 'pkg-a')
      expect(typeof result?.name).toBe('string')
      expect(typeof result?.path).toBe('string')
      expect(typeof result?.fullPath).toBe('string')
      expect(typeof result?.version).toBe('string')
      expect(typeof result?.private).toBe('boolean')
      expect(typeof result?.hasBuildScript).toBe('boolean')
      expect(Array.isArray(result?.dependencies)).toBe(true)
    })
  })
})
