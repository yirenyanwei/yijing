<script setup lang="ts">
/**
 * 顶部导航栏组件
 * 显示通知图标、下载按钮和用户头像，提供退出登录功能
 */
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { showConfirmDialog, showToast } from 'vant'

const router = useRouter() // 路由实例
const userStore = useUserStore() // 用户状态管理

/**
 * 处理退出登录
 * 显示确认对话框，确认后清除 token 并跳转到登录页
 */
const handleLogout = async () => {
  try {
    // 显示确认对话框
    await showConfirmDialog({
      title: '确认退出',
      message: '确定要退出登录吗？'
    })
    
    // 用户确认后，清除 token 和用户信息
    userStore.clearToken()
    showToast('已退出登录')
    // 跳转到登录页
    router.push('/login')
  } catch {
    // 用户取消操作，不执行任何操作
  }
}
</script>

<template>
  <div class="header">
    <div class="header-left">
      <van-icon name="bell" class="notification-icon" />
    </div>
    <div class="header-right">
      <van-button type="primary" class="download-btn">
        Download Free
      </van-button>
      <div class="user-avatar" v-if="userStore.userInfo" @click="handleLogout">
        <div class="avatar-circle">
          {{ userStore.userInfo.username.charAt(0).toUpperCase() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  flex: 1; // header占1份，content占5份，实现1:5比例
  min-height: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  z-index: 100;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
  box-sizing: border-box;
}

.header-left {
  display: flex;
  align-items: center;

  .notification-icon {
    font-size: 20px;
    color: #5a6c7d;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #5d87ff;
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;

  .download-btn {
    height: 36px;
    padding: 0 20px;
    font-size: 13px;
    font-weight: 500;
    border-radius: 6px;
    background: #5d87ff;
    border: none;
    box-shadow: 0 2px 6px rgba(93, 135, 255, 0.3);
    transition: all 0.3s;

    &:hover {
      background: #4a75e6;
      box-shadow: 0 4px 12px rgba(93, 135, 255, 0.4);
    }
  }

  .user-avatar {
    cursor: pointer;

    .avatar-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>

