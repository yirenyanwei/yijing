/**
 * 路由配置
 * 定义应用的所有路由规则和路由守卫
 */
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Layout from '@/components/Layout.vue'

/**
 * 路由配置数组
 * 定义所有路由路径、组件和元信息
 */
const routes: RouteRecordRaw[] = [
  // 登录页路由（不需要认证）
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'), // 懒加载登录组件
    meta: {
      title: '登录',
      requiresAuth: false // 不需要登录即可访问
    }
  },
  // 注册页路由（不需要认证）
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'), // 懒加载注册组件
    meta: {
      title: '注册',
      requiresAuth: false // 不需要登录即可访问
    }
  },
  // 主布局路由（需要认证）
  {
    path: '/',
    component: Layout, // 使用 Layout 布局组件
    redirect: '/', // 默认重定向到根路径
    meta: {
      requiresAuth: true // 需要登录才能访问
    },
    children: [
      // 主页（嵌套在 Layout 中）
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: '主页',
          requiresAuth: true
        }
      },
      // 页面一（嵌套在 Layout 中）
      {
        path: '/page1',
        name: 'Page1',
        component: () => import('@/views/Page1.vue'),
        meta: {
          title: '页面一',
          requiresAuth: true
        }
      },
      // 页面二（嵌套在 Layout 中）
      {
        path: '/page2',
        name: 'Page2',
        component: () => import('@/views/Page2.vue'),
        meta: {
          title: '页面二',
          requiresAuth: true
        }
      }
    ]
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式
  routes
})

/**
 * 全局路由守卫
 * 在每次路由跳转前执行，用于权限控制和页面标题设置
 */
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // 根据路由元信息设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  
  // 权限检查：如果需要登录但用户未登录，跳转到登录页
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  } 
  // 已登录用户访问登录/注册页，重定向到主页
  else if ((to.path === '/login' || to.path === '/register') && userStore.isLoggedIn) {
    next('/')
  } 
  // 其他情况正常跳转
  else {
    next()
  }
})

export default router

