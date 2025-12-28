<script setup lang="ts">
/**
 * 根组件
 * 作为应用的入口组件，渲染路由视图
 */
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- 路由视图容器，根据当前路由渲染对应的页面组件 -->
  <RouterView />
</template>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* 使用 border-box 盒模型 */
}

html,
body {
  width: 100%;
  height: 100%;
  /* 使用系统字体栈，提供更好的跨平台字体渲染 */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  /* 字体平滑渲染，提升显示效果 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  height: 100%;
}
</style>

