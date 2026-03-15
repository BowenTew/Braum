import type { ConfigRules } from './types'

const styleLintRules = (): ConfigRules => {
  return {
    'plugin/no-low-performance-animation-properties': [
      true,
      {
        ignoreProperties: ['background-color'],
      },
    ],
    'scale-unlimited/declaration-strict-value': [
      [
        // 1. 颜色类属性
        '/color/',
        'fill',
        'stroke',
        // 2. 间距 & 尺寸
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'gap',
        'row-gap',
        'column-gap',
        'width',
        'height',
        'min-width',
        'min-height',
        'max-width',
        'max-height',
        'top',
        'right',
        'bottom',
        'left',
        // 3. 排版
        'font-size',
        'font-weight',
        'line-height',
        // 4. 层级
        'z-index',
        // 5. 圆角 & 边框
        'border-radius',
        'border-width',
        // 6. 动效
        'animation-duration',
        'transition-duration',
      ],
      {
        // 以下裸值可放行
        ignoreValues: {
          // 全局通用
          '/.*/': ['0', 'auto', 'inherit', 'initial', 'unset', 'none', 'transparent'],
          // 尺寸类再额外放行 100% / 0px 等
          width: ['100%', '0px'],
          height: ['100%', '0px'],
          // 字重
          'font-weight': ['400', '500', '600', '700'],
          // 圆角
          'border-radius': ['50%'],
        },

        // 允许变量、函数、calc、env、clamp 等
        ignoreVariables: true,
        ignoreFunctions: true,
      },
    ],
    'plugin/no-browser-hacks': [true],
  }
}

export { styleLintRules }
