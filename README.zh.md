# 布隆 - 前端配置工具

> 布隆 是弗雷尔卓德的传奇守护者，以他坚不可摧的盾牌和坚定不移的保护他人的决心而闻名。这里我们借用这个名字来构建一个强大的前端配置工具 monorepo，为开发者提供高质量、可复用的开发工具配置，像布隆的盾牌一样保护和守护他们的项目。

## 📖 项目介绍

布隆，以这位持盾守护者的名字命名，是一个前端配置工具 monorepo，旨在收集和整理常用的前端开发配置。通过统一的仓库管理，为团队提供标准化的开发体验，为各种开发工具提供一致、经过实战检验的配置文件。

## 🏗️ 项目结构

```
braum/
├── packages/                    # 配置包目录
│   ├── eslint-base/             # 基础 ESLint 配置
│   ├── eslint-react/            # React ESLint 配置
│   ├── eslint-vue/              # Vue ESLint 配置
│   ├── eslint-typescript/       # TypeScript ESLint 配置
│   ├── prettier-base/           # 基础 Prettier 配置
│   ├── prettier-tailwind/       # Tailwind Prettier 配置
│   ├── stylelint-base/          # 基础 Stylelint 配置
│   ├── stylelint-scss/          # SCSS Stylelint 配置
│   ├── stylelint-styled-components/ # Styled Components Stylelint 配置
│   ├── commitlint-conventional/ # 约定式提交配置
│   └── braum-configs/           # 所有配置组合包
├── scripts/                     # 构建和开发脚本
├── docs/                        # 文档
└── tools/                       # 开发工具
    ├── cli/                     # CLI 工具
    └── vscode-extension/        # VS Code 插件
```

## 📦 安装与使用

### 使用独立包

安装特定的配置包：

```bash
# 安装 ESLint 配置
pnpm add -D @braum/eslint-base
pnpm add -D @braum/eslint-react
pnpm add -D @braum/eslint-vue
pnpm add -D @braum/eslint-typescript

# 安装 Prettier 配置
pnpm add -D @braum/prettier-base
pnpm add -D @braum/prettier-tailwind

# 安装 Stylelint 配置
pnpm add -D @braum/stylelint-base
pnpm add -D @braum/stylelint-scss
pnpm add -D @braum/stylelint-styled-components

# 安装 Commitlint 配置
pnpm add -D @braum/commitlint-conventional
```

### 使用组合配置包

安装主配置包：

```bash
pnpm add -D @braum/configs
```

然后在配置文件中使用：

```javascript
// .eslintrc.js
module.exports = require('@braum/configs/eslint/base')
// 或者 React 项目
module.exports = require('@braum/configs/eslint/react')

// .prettierrc.js
module.exports = require('@braum/configs/prettier/base')

// .stylelintrc.js
module.exports = require('@braum/configs/stylelint/base')

// commitlint.config.js
module.exports = require('@braum/configs/commitlint/conventional')
```

## 🛠️ 开发指南

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0

### 开发命令

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 运行测试
pnpm test

# 运行代码检查
pnpm lint

# 格式化代码
pnpm format

# 发布包
pnpm release
```

### 开发流程

1. **Fork 仓库** 并创建新的分支
2. **安装依赖** 使用 `pnpm install`
3. **开发功能** 在对应的 packages 目录下
4. **编写测试** 确保代码质量
5. **提交代码** 遵循约定式提交规范
6. **创建 PR** 等待代码审查

## 📝 贡献指南

我们欢迎所有形式的贡献，包括但不限于：

- 🐛 **Bug 报告** - 帮助我们发现配置问题
- 💡 **配置建议** - 分享您的配置改进
- 🔧 **代码贡献** - 直接参与开发
- 📖 **文档改进** - 完善使用文档

请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详细信息。

## 🎯 设计原则

- **模块化** - 每个配置都是独立的包，可以单独使用
- **可配置** - 提供灵活的配置选项，适应不同项目需求
- **实战检验** - 所有配置都在真实项目中测试过
- **框架无关** - 适用于任何前端框架或原生JavaScript
- **类型安全** - 优先使用TypeScript，提供完整的类型定义
- **向后兼容** - 遵循语义化版本规范，确保平滑升级

## 📄 开源协议

本项目基于 [MIT License](./LICENSE) 开源协议。

## 🤝 社区支持

- 💬 **讨论** - [GitHub Discussions](https://github.com/your-org/braum-configs/discussions)
- 🐛 **问题** - [GitHub Issues](https://github.com/your-org/braum-configs/issues)
- 📧 **邮件** - support@braum-configs.dev

---

## 🏷️ 标签说明

| 标签                  | 说明              |
| --------------------- | ----------------- |
| `@braum/eslint-*`     | ESLint 配置包     |
| `@braum/prettier-*`   | Prettier 配置包   |
| `@braum/stylelint-*`  | Stylelint 配置包  |
| `@braum/commitlint-*` | Commitlint 配置包 |

## 🔗 相关链接

- [文档网站](https://braum-configs.dev)
- [NPM 组织](https://www.npmjs.com/org/braum-configs)
- [GitHub 仓库](https://github.com/your-org/braum-configs)
- [更新日志](./CHANGELOG.md)
