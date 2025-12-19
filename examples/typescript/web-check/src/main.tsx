import ReactDOM from 'react-dom/client'
import { Counter } from './App'

/**
 * 入口文件，用于验证：
 * - DOM / DOM.Iterable lib 是否可用（document / HTMLElement 等）
 * - bundler moduleResolution 下的导入行为
 */
const container = document.getElementById('root')

if (container) {
  const root = ReactDOM.createRoot(container)
  root.render(<Counter initial={1} />)
}
