<script setup lang="ts">
interface MenuItem {
  path: string
  name: string
  title: string
  icon: string
}

interface Props {
  menuItems: MenuItem[]
  activeMenu: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  menuClick: [path: string]
}>()

const handleClick = (path: string) => {
  emit('menuClick', path)
}

// 计算菜单项的样式类
const getMenuItemClass = (path: string) => {
  return props.activeMenu === path ? 'menu-item-active' : ''
}
</script>

<template>
  <div class="sidebar">
    <!-- Logo区域 -->
    <div class="sidebar-header">
      <div class="logo-container">
        <div class="logo-shapes">
          <div class="logo-shape logo-shape-1"></div>
          <div class="logo-shape logo-shape-2"></div>
        </div>
        <!-- 放到图片的下边 -->
        <span class="logo-text">yanwei</span>
      </div>
    </div>

    <!-- 菜单区域 -->
    <div class="nav-section">
      <div class="section-title">HOME</div>
      <div
        v-for="item in menuItems"
        :key="item.path"
        :class="['menu-item', getMenuItemClass(item.path)]"
        @click="handleClick(item.path)"
      >
        <van-icon :name="item.icon" class="menu-icon" />
        <span class="menu-title">{{ item.title.toUpperCase() }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  border-right: 1px solid #e8ecf1;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
  border-bottom: 1px solid #e8ecf1;
  flex-shrink: 0;

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .logo-shapes {
    position: relative;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }

  .logo-shape {
    position: absolute;
    border-radius: 6px;
  }

  .logo-shape-1 {
    width: 24px;
    height: 24px;
    background: #5d87ff;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .logo-shape-2 {
    width: 24px;
    height: 24px;
    background: #49beff;
    bottom: 0;
    right: 0;
    z-index: 1;
    opacity: 0.8;
  }

  .logo-text {
    color: #2a3547;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
}

.nav-section {
  flex: 1;
  padding: 12px 0;
  overflow-y: auto;

  .section-title {
    color: #8c8c8c;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 8px 16px;
    text-transform: uppercase;
  }

  .menu-item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 16px;
    margin: 2px 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    color: #5a6c7d;

    .menu-icon {
      font-size: 18px;
      margin-right: 10px;
      color: inherit;
      flex-shrink: 0;
    }

    .menu-title {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.3px;
      white-space: nowrap;
      flex: 1;
    }

    &:hover {
      background: #f5f7fa;
      color: #2a3547;
    }

    &.menu-item-active {
      background: #5d87ff;
      color: #fff;
      box-shadow: 0 2px 8px rgba(93, 135, 255, 0.3);

      .menu-icon {
        color: #fff;
      }

      .menu-title {
        color: #fff;
      }
    }
  }
}
</style>

