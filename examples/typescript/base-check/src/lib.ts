// ============================================
// TypeScript 严格配置验证示例
// ============================================

// 1. noImplicitAny - 隐式 any 类型会报错
function testImplicitAny(x) {
  // ❌ 错误：参数 'x' 隐式具有 'any' 类型
  return x
}

// ✅ 正确：显式声明类型
function testExplicitType(x: number): number {
  return x * 2
}

// 2. strictNullChecks - 严格的 null 检查
function testNullCheck(value: string | null): number {
  // ❌ 错误：对象可能为 "null"
  return value.length

  // ✅ 正确：需要先检查
  // if (value === null) {
  //   return 0;
  // }
  // return value.length;
}

// 3. strictPropertyInitialization - 类的属性必须初始化
class TestClass {
  name: string
  // ❌ 错误：属性 'name' 没有初始化表达式，且未在构造函数中明确赋值

  age: number | undefined // ✅ 正确：使用 undefined 或可选属性

  constructor(name: string) {
    this.name = name // ✅ 在构造函数中初始化
  }
}

// 4. noUnusedLocals - 未使用的局部变量
function testUnusedLocal(): void {
  const unused = 42 // ❌ 错误：'unused' 已声明但从未使用
  const used = 10
  console.log(used)
}

// 5. noUnusedParameters - 未使用的参数
function testUnusedParam(used: number, unused: string): number {
  // ❌ 错误：'unused' 已声明但从未使用
  return used * 2

  // ✅ 正确：使用下划线前缀表示故意不使用
  // function testUnusedParam(used: number, _unused: string): number {
  //   return used * 2;
  // }
}

// 6. noImplicitReturns - 函数必须显式返回
function testImplicitReturn(value: number): string {
  if (value > 0) {
    return 'positive' // ✅ 有这个就 OK
  }
  // ❌ 错误：函数缺少返回语句，或者不是所有代码路径都返回值
}

// ✅ 正确：所有路径都有返回值
function testExplicitReturn(value: number): string {
  if (value > 0) {
    return 'positive'
  }
  return 'non-positive'
}

// 7. noFallthroughCasesInSwitch - switch 不能 fallthrough
function testSwitchFallthrough(value: number): string {
  switch (value) {
    case 1:
      return 'one'
    case 2:
      console.log('two') // ❌ 错误：Case 2 的 fallthrough 不受支持
    case 3:
      return 'three'
    default:
      return 'other'
  }
}

// ✅ 正确：每个 case 都有 return 或 break
function testSwitchNoFallthrough(value: number): string {
  switch (value) {
    case 1:
      return 'one'
    case 2:
      console.log('two')
      return 'two'
    case 3:
      return 'three'
    default:
      return 'other'
  }
}

// 8. noUncheckedIndexedAccess - 索引访问可能是 undefined
function testIndexedAccess(arr: number[]): void {
  const first = arr[0] // first 的类型是 number | undefined
  // ❌ 错误：'first' 可能为 "undefined"
  const doubled = first * 2

  // ✅ 正确：需要检查
  // if (first !== undefined) {
  //   const doubled = first * 2;
  // }
}

// 9. exactOptionalPropertyTypes - 精确的可选属性类型
interface TestInterface {
  name?: string // 类型是 string | undefined，但不能是 null
  age?: number
}

function testOptionalProps(obj: TestInterface): void {
  obj.name = undefined // ✅ 正确
  // obj.name = null; // ❌ 错误：不能将类型 "null" 分配给类型 "string | undefined"
}

// 10. allowUnreachableCode - 不允许不可达代码
function testUnreachableCode(): number {
  return 42
  console.log('unreachable') // ❌ 错误：无法访问的代码
}

// 11. strictFunctionTypes - 严格的函数类型
interface Animal {
  name: string
}

interface Dog extends Animal {
  breed: string
}

function testFunctionTypes(): void {
  let takeAnimal = (animal: Animal) => animal.name
  let takeDog = (dog: Dog) => dog.breed

  // ❌ 错误：类型不兼容
  // takeDog = takeAnimal; // 不允许，因为函数类型不兼容

  // ✅ 这是正确的：更具体的类型可以赋值给更宽泛的类型（协变）
  takeAnimal = takeDog
}

// 12. verbatimModuleSyntax - 需要显式类型导入
import type { SomeType } from './types' // ✅ 正确：使用 type 关键字
// import { SomeType } from "./types"; // ❌ 如果只是类型导入，需要用 import type

// 13. noImplicitThis - 隐式 this
class TestThis {
  value = 10

  getValue(): number {
    return this.value // ✅ 正确
  }

  getValueArrow = (): number => {
    return this.value // ✅ 箭头函数保留 this 上下文
  }

  callback(): void {
    function innerFunction() {
      // ❌ 错误：'this' 隐式具有类型 'any'，因为它没有类型注释
      // console.log(this.value);
    }

    // ✅ 正确：使用箭头函数
    const innerArrow = () => {
      console.log(this.value)
    }
  }
}

// 14. 综合示例：展示多个规则
export function comprehensiveExample(input: string | null, multiplier: number): string | null {
  if (input === null) {
    return null
  }

  if (multiplier <= 0) {
    return 'invalid multiplier'
  }

  const result = input.repeat(multiplier)
  return result
}

// ✅ 所有验证通过的代码示例
export function allPassExample(): {
  success: boolean
  message: string
} {
  const numbers: number[] = [1, 2, 3]
  const firstNumber = numbers[0]

  if (firstNumber === undefined) {
    return {
      success: false,
      message: 'Array is empty',
    }
  }

  return {
    success: true,
    message: `First number is ${firstNumber}`,
  }
}
