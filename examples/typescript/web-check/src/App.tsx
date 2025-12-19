import { useState } from 'react'

interface CounterProps {
  initial?: number
}

/**
 * 简单计数器组件，用于验证：
 * - `"jsx": "react-jsx"` 配置是否正常工作
 * - `"isolatedModules": true` 下每个文件都可以单独编译
 * - `lib` 中包含 DOM / ESNext 能否正常使用
 */
export function Counter({ initial = 0 }: CounterProps) {
  const [count, setCount] = useState(initial)

  const a = 1
  const handleClick = () => {
    setCount(prev => prev + 1)
  }

  return (
    <button type="button" onClick={handleClick}>
      Count: {count}
    </button>
  )
}
