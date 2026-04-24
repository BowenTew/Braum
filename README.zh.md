# Braum - 前端配置工具集

## 📖 项目介绍

Braum 是一个前端配置工具 Monorepo，旨在收集和整理常用的前端开发配置。通过统一的仓库管理，为团队提供标准化的开发体验，为各种开发工具提供一致、经过实战检验的配置文件。

## 🏗️ 项目结构

```
braum/
├── packages/                    # 核心配置包
│   ├── commitlint/              # @fetuye/commitlint - 提交信息规范
│   ├── eslint/                  # @fetuye/eslint - ESLint 配置
│   ├── prettier/                # @fetuye/prettier - Prettier 配置
│   ├── stylelint/               # @fetuye/stylelint - Stylelint 配置
│   └── tsconfig/                # @fetuye/typescript-config - TypeScript 预设
├── tools/                       # 开发工具
│   └── cz/                      # @fetuye/cz - Commitizen 命令行工具
├── examples/                    # 示例项目
│   ├── eslint/                  # ESLint 使用示例
│   ├── react/                   # React 项目示例
│   ├── stylelint/               # Stylelint 使用示例
│   ├── typescript/              # TypeScript 配置示例
│   └── vue/                     # Vue 项目示例
├── scripts/                     # 构建和开发脚本
└── doc/                         # 文档
```

## 📦 核心包

### @fetuye/eslint

ESLint 配置，支持 JavaScript、TypeScript、React 和 Vue。

```bash
pnpm add -D @fetuye/eslint
```

**使用方式：**

```javascript
// eslint.config.js
import { defineESLintConfig } from '@fetuye/eslint'

const config = await defineESLintConfig({
  enableReact: true, // 启用 React 支持
  enableVue: false, // 启用 Vue 支持
  enableTypescript: true, // 启用 TypeScript 支持
  enableNode: true, // 启用 Node.js 支持
  enablePrettier: true, // 启用 Prettier 集成
})

export default config
```

**配置选项：**

| 选项               | 类型    | 默认值 | 说明                 |
| ------------------ | ------- | ------ | -------------------- |
| `enableVue`        | boolean | false  | 启用 Vue 支持        |
| `enableReact`      | boolean | false  | 启用 React 支持      |
| `enableJSX`        | boolean | false  | 启用 JSX 支持        |
| `enableNode`       | boolean | false  | 启用 Node.js 支持    |
| `enableTypescript` | boolean | true   | 启用 TypeScript 支持 |
| `enablePrettier`   | boolean | true   | 启用 Prettier 集成   |
| `enableImports`    | boolean | true   | 启用导入规则         |
| `enablePromise`    | boolean | true   | 启用 Promise 规则    |
| `enableComments`   | boolean | true   | 启用 ESLint 注释规则 |

### @fetuye/prettier

Prettier 配置，支持 XML 插件。

```bash
pnpm add -D @fetuye/prettier
```

**使用方式：**

```javascript
// prettier.config.js
import { definePrettierConfig } from '@fetuye/prettier'

export default definePrettierConfig({
  xml: true, // 启用 XML 插件
  userOverrides: {
    // 自定义覆盖配置
    printWidth: 100,
  },
})
```

### @fetuye/stylelint

Stylelint 配置，支持 CSS、SCSS、Less 和 styled-components。

```bash
pnpm add -D @fetuye/stylelint
```

**使用方式：**

```javascript
// stylelint.config.js
import { defineStylelintConfig } from '@fetuye/stylelint'

export default defineStylelintConfig({
  enableVue: false, // 启用 Vue 单文件组件支持
  enableScss: true, // 启用 SCSS 支持
  enableLess: false, // 启用 Less 支持
  enableStyledComponents: false, // 启用 styled-components 支持
})
```

### @fetuye/commitlint

Commitlint 配置，支持约定式提交规范。

```bash
pnpm add -D @fetuye/commitlint
```

**使用方式：**

```javascript
// commitlint.config.js
import { defineCommitlintConfig } from '@fetuye/commitlint'

export default defineCommitlintConfig({
  extendConfig: base => ({
    ...base,
    // 自定义规则
  }),
})
```

**默认提交类型：** `feat`（新功能）、`fix`（修复）、`docs`（文档）、`style`（格式）、`refactor`（重构）、`perf`（性能）、`test`（测试）、`build`（构建）、`ci`（CI）、`chore`（其他）、`revert`（回滚）

### @fetuye/cz

Commitizen 命令行工具，提供交互式提交体验。

```bash
pnpm add -D @fetuye/cz
```

**使用方式：**

在 `package.json` 中添加：

```json
{
  "scripts": {
    "commit": "cz"
  }
}
```

然后运行：

```bash
pnpm commit
```

### @fetuye/typescript-config

TypeScript 配置预设。

```bash
pnpm add -D @fetuye/typescript-config
```

**使用方式：**

```json
// tsconfig.json
{
  "extends": "@fetuye/typescript-config/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

**可用预设：**

- `tsconfig.base.json` - 基础严格配置
- `tsconfig.lib.json` - 库项目配置
- `tsconfig.node.json` - Node.js 项目配置
- `tsconfig.web.json` - Web 项目配置

## 🛠️ 开发指南

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装与使用

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 类型检查
pnpm type-check

# 代码检查
pnpm lint:check

# 格式化检查
pnpm format:check

# CI 检查（格式 + 检查 + 类型）
pnpm ci-check
```

### 开发流程

1. **Fork 仓库** 并创建新的分支
2. **安装依赖** 使用 `pnpm install`
3. **开发功能** 在对应的 packages 目录下
4. **构建** 运行 `pnpm build`
5. **提交代码** 遵循约定式提交规范
6. **创建 PR** 等待代码审查

## 📝 贡献指南

我们欢迎所有形式的贡献：

- 🐛 **Bug 报告** - 帮助我们发现配置问题
- 💡 **配置建议** - 分享您的配置改进
- 🔧 **代码贡献** - 直接参与开发
- 📖 **文档改进** - 完善使用文档

## 🎯 设计原则

- **模块化** - 每个配置都是独立的包，可以单独使用
- **可配置** - 提供灵活的配置选项，适应不同项目需求
- **实战检验** - 所有配置都在真实项目中测试过
- **框架无关** - 适用于任何前端框架或原生 JavaScript
- **类型安全** - 优先使用 TypeScript，提供完整的类型定义
- **向后兼容** - 遵循语义化版本规范，确保平滑升级

## 📄 开源协议

本项目基于 [Apache License 2.0](./LICENSE) 开源协议。

## 🏷️ 包标签说明

| 标签                       | 说明                  |
| -------------------------- | --------------------- |
| `@fetuye/eslint`            | ESLint 配置           |
| `@fetuye/prettier`          | Prettier 配置         |
| `@fetuye/stylelint`         | Stylelint 配置        |
| `@fetuye/commitlint`        | Commitlint 配置       |
| `@fetuye/cz`                | Commitizen 命令行工具 |
| `@fetuye/typescript-config` | TypeScript 配置预设   |

---

<p align="center">
  <sub>用 ❤️ 由 <a href="https://github.com/BowenTew">Bowen Tew</a> 构建</sub>
</p>
