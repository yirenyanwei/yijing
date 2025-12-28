<script setup lang="ts">
/**
 * 布局组件
 * 提供应用的主布局结构，包括侧边栏和内容区域
 */
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

const route = useRoute() // 当前路由对象
const router = useRouter() // 路由实例

/**
 * 菜单项配置
 * 定义侧边栏显示的菜单项列表
 */
const menuItems = [
  {
    path: '/',
    name: 'Home',
    title: '主页',
    icon: 'home-o' // Vant 图标名称
  },
  {
    path: '/page1',
    name: 'Page1',
    title: '页面一',
    icon: 'apps-o'
  },
  {
    path: '/page2',
    name: 'Page2',
    title: '页面二',
    icon: 'setting-o'
  }
]

// 当前激活的菜单路径（响应式）
const activeMenu = ref(route.path)

/**
 * 处理菜单点击事件
 * 更新激活菜单并跳转到对应路由
 * @param path - 菜单项的路由路径
 */
const handleMenuClick = (path: string) => {
  activeMenu.value = path // 更新激活状态
  router.push(path) // 路由跳转
}
</script>

<template>
  <div class="layout-container">
    <!-- 左侧菜单栏 - 固定240px -->
    <div class="sidebar-wrapper">
      <Sidebar
        :menu-items="menuItems"
        :active-menu="activeMenu"
        @menu-click="handleMenuClick"
      />
    </div>

    <!-- 右侧内容区 - 占据剩余空间 -->
    <div class="main-content-wrapper">
      <!-- 顶部Header -->
      <Header />

      <!-- 内容区域 -->
      <div class="content-area">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #f5f7fa;
}

.sidebar-wrapper {
  flex: 1; // 左侧占1份
  min-width: 0;
  flex-shrink: 0;
}

.main-content-wrapper {
  flex: 4; // 右侧占4份，实现1:4比例
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f5f7fa;
}

.content-area {
  flex: 5; // 内容区占5份，header占1份，实现1:5比例
  overflow-y: auto;
  padding: 24px;
  background: #f5f7fa;
  min-height: 0;
}
</style>

