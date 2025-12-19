import type { SomeType, SomeUnion } from './types'

/**
 * 演示：根据不同 union 值生成不同前缀
 */
export function prefixByUnion(kind: SomeUnion, value: string): string {
  switch (kind) {
    case 'option1':
      return `[ONE] ${value}`
    case 'option2':
      return `[TWO] ${value}`
    case 'option3':
      return `[THREE] ${value}`
    default: {
      // 使用 never 保证 switch 分支覆盖完全
      const _exhaustive: never = kind
      return _exhaustive
    }
  }
}

/**
 * 演示：把 SomeType 格式化成一个字符串
 */
export function formatSomeType(input: SomeType): string {
  return `${input.value} (count=${input.count})`
}

/**
 * 一个简单的公共 API，方便验证构建产物
 */
export function createSample(value: string, count: number): SomeType {
  return { value, count }
}

export type { SomeType, SomeUnion }
