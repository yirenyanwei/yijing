/**
 * 用户状态管理 Store
 * 使用 Pinia 管理用户相关的全局状态，包括用户信息、登录 token 等
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo } from '@/types/user'
import { getUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  // 用户信息（响应式引用）
  const userInfo = ref<UserInfo | null>(null)
  
  // 登录 token（从 localStorage 读取，如果存在则初始化）
  const token = ref<string | null>(localStorage.getItem('token'))

  /**
   * 计算属性：判断用户是否已登录
   * 根据 token 是否存在来判断
   */
  const isLoggedIn = computed(() => !!token.value)

  /**
   * 设置登录 token
   * @param newToken - 新的 token 字符串
   */
  const setToken = (newToken: string) => {
    token.value = newToken
    // 同时保存到 localStorage，实现持久化
    localStorage.setItem('token', newToken)
  }

  /**
   * 清除登录 token 和用户信息
   * 用于退出登录
   */
  const clearToken = () => {
    token.value = null
    localStorage.removeItem('token') // 从 localStorage 移除 token
    userInfo.value = null // 清空用户信息
  }

  /**
   * 设置用户信息
   * @param info - 用户信息对象
   */
  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
  }

  /**
   * 从服务器获取用户信息
   * @returns 返回用户信息对象
   * @throws 如果获取失败会抛出错误
   */
  const fetchUserInfo = async (): Promise<UserInfo> => {
    try {
      // 响应拦截器已经处理了数据提取，直接返回 UserInfo
      const data = await getUserInfo()
      userInfo.value = data
      return data
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  }

  // 导出所有状态和方法，供组件使用
  return {
    userInfo,
    token,
    isLoggedIn,
    setToken,
    clearToken,
    setUserInfo,
    fetchUserInfo
  }
})

