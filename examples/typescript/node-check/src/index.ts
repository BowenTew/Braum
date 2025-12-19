/**
 * Node 环境下的简单工具函数，用于验证 tsconfig.node.json：
 * - target ES2022
 * - module ESNext + moduleResolution node
 * - 生成 .d.ts 与 sourceMap
 */
export interface User {
  id: number
  name: string
}

export function greet(user: User): string {
  return `Hello, ${user.name}!`
}

export async function readEnv(key: string): Promise<string | undefined> {
  // Node ES2022 支持的 API 示例（process.env）
  return process.env[key]
}

if (require.main === module) {
  // 简单运行时示例
  const msg = greet({ id: 1, name: 'Node User' })
  // eslint-disable-next-line no-console
  console.log(msg)
}
