# TypeScript 严格配置验证 (ts-check)

这个验证项目位于 `examples/ts-check/`，用于测试 TypeScript 严格配置的各项规则。

## 📁 文件结构

```
ts-check/
├── src/
│   ├── 01-基础严格检查-good.ts    # 基础严格检查 - 正确示例
│   ├── 01-基础严格检查-bad.ts     # 基础严格检查 - 错误示例
│   ├── 02-代码质量检查-good.ts    # 代码质量检查 - 正确示例
│   ├── 02-代码质量检查-bad.ts     # 代码质量检查 - 错误示例
│   ├── 03-高级严格检查-good.ts    # 高级严格检查 - 正确示例
│   ├── 03-高级严格检查-bad.ts     # 高级严格检查 - 错误示例
│   ├── 04-模块解析-good.ts        # 模块解析 - 正确示例
│   └── 04-模块解析-bad.ts         # 模块解析 - 错误示例
├── package.json
└── tsconfig.json                  # 包含所有严格配置的 TypeScript 配置
```

## 🎯 验证的配置规则

### 🔒 基础严格检查

- `strict`, `noImplicitAny`, `strictNullChecks`
- `strictFunctionTypes`, `strictBindCallApply`
- `strictPropertyInitialization`, `noImplicitThis`

### 🚨 代码质量强制

- `noUnusedLocals`, `noUnusedParameters`
- `noImplicitReturns`, `noFallthroughCasesInSwitch`
- `noImplicitOverride`

### 🔍 高级严格检查

- `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- `allowUnusedLabels`, `allowUnreachableCode`

### 📦 模块解析和互操作性

- `allowSyntheticDefaultImports`, `esModuleInterop`
- `verbatimModuleSyntax`, `resolveJsonModule`
- `forceConsistentCasingInFileNames`

## 🚀 使用方法

```bash
# 安装依赖
pnpm install

# 类型检查（会显示所有错误）
pnpm type-check

# 类型检查监控模式
pnpm type-check:watch

# 尝试编译（会失败，因为有故意设置的类型错误）
pnpm build
```

## 📊 预期结果

### ✅ Good 文件

所有 `*-good.ts` 文件应该 **没有类型错误**，展示如何正确编写符合严格配置的代码。

### ❌ Bad 文件

所有 `*-bad.ts` 文件应该 **有多个类型错误**，展示各种违反严格配置的情况。

## 💡 学习建议

1. **先看 good 文件**: 了解正确的写法
2. **再运行 type-check**: 查看 bad 文件的错误信息
3. **对比分析**: 理解每个规则的具体要求
4. **逐步应用**: 在自己的项目中逐步启用这些严格配置

## 🎓 规则分级

### 🔰 入门级（推荐全部启用）

- 基础严格检查配置
- 基本的代码质量规则

### 📈 进阶级（推荐重要项目）

- 高级严格检查
- 更严格的代码质量要求

### 🛡️ 专家级（推荐 TypeScript 专家团队）

- 所有严格配置全开
- 需要丰富的 TypeScript 经验

这个验证环境帮助你理解和掌握 TypeScript 的严格类型系统！
