<template>
  <div class="vue-scss-test">
    <div class="card">Card</div>
    <span class="badge">Badge</span>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'VueScssTest' })
</script>

<style lang="scss" scoped>
// Vue SFC + SCSS 测试用例：会触发 stylelint 错误的示例

.vue-scss-test {
  display: flex;
  gap: 8px; // ❌ declaration-strict-value: gap 需用变量
}

.card {
  color: red; // ❌ declaration-strict-value: 颜色需用变量/函数
  font-size: 16px; // ❌ declaration-strict-value: font-size 需用变量
  margin: 10px; // ❌ declaration-strict-value: margin 需用变量
  padding: 8px; // ❌ declaration-strict-value: padding 需用变量
  border-radius: 4px; // ❌ declaration-strict-value: 需用变量

  &:hover {
    transition: width 0.3s ease; // ❌ no-low-performance: width 触发 layout
  }
}

@mixin card-mixin {
  display: block;
}

.badge {
  @include card-mixin;
  z-index: 1; // ❌ declaration-strict-value: z-index 裸值
  top: 0; // ❌ declaration-strict-value
}

@keyframes bad-scss-animation {
  from {
    left: 0; // ❌ no-low-performance
  }
  to {
    left: 100px; // ❌ no-low-performance
  }
}

.vue-scss-test .badge {
  animation: bad-scss-animation 1s ease;
}
</style>
