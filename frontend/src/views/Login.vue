<script setup lang="ts">
/**
 * 登录页面组件
 * 提供用户登录功能，包括用户名密码输入、记住设备选项等
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showSuccessToast } from 'vant'
import { useUserStore } from '@/stores/user'
import { login } from '@/api/user'

const router = useRouter() // 路由实例
const userStore = useUserStore() // 用户状态管理

// 表单数据（响应式）
const username = ref('') // 用户名
const password = ref('') // 密码
const rememberDevice = ref(true) // 是否记住设备
const loading = ref(false) // 登录加载状态

/**
 * 处理登录提交
 * 验证表单数据，调用登录 API，保存 token 和用户信息
 */
const handleLogin = async () => {
  // 表单验证
  if (!username.value) {
    showToast('请输入用户名')
    return
  }
  if (!password.value) {
    showToast('请输入密码')
    return
  }

  loading.value = true // 开始加载
  try {
    // 调用登录 API
    const result = await login({
      username: username.value,
      password: password.value
    })
    
    // 保存 token 和用户信息到 store
    userStore.setToken(result.token)
    userStore.setUserInfo(result.userInfo)
    
    // 如果勾选了记住设备，保存标记到 localStorage
    if (rememberDevice.value) {
      localStorage.setItem('rememberDevice', 'true')
    }
    
    showSuccessToast('登录成功')
    // 跳转到主页
    router.push('/')
  } catch (error: any) {
    // 登录失败，显示错误提示
    showToast(error.message || '登录失败')
  } finally {
    loading.value = false // 结束加载
  }
}

/**
 * 跳转到注册页面
 */
const goToRegister = () => {
  router.push('/register')
}

/**
 * 处理忘记密码
 * 目前显示提示信息，功能待开发
 */
const handleForgotPassword = () => {
  showToast('忘记密码功能开发中')
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Logo 和品牌 -->
      <div class="login-header">
        <div class="logo-container">
          <div class="logo-shapes">
            <div class="logo-shape logo-shape-1"></div>
            <div class="logo-shape logo-shape-2"></div>
          </div>
          <span class="logo-text">Modernize</span>
        </div>
        <p class="login-tagline">Your Social Campaigns</p>
      </div>

      <!-- 登录表单 -->
      <div class="login-form">
        <div class="form-group">
          <label class="form-label">Username</label>
          <input
            v-model="username"
            type="text"
            class="form-input"
            placeholder=""
          />
        </div>

        <div class="form-group">
          <label class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-input"
            placeholder=""
          />
        </div>

        <div class="form-options">
          <label class="checkbox-label">
            <input
              v-model="rememberDevice"
              type="checkbox"
              class="checkbox-input"
            />
            <span class="checkbox-text">Remember this Device</span>
          </label>
          <span class="forgot-link" @click="handleForgotPassword">
            Forgot Password?
          </span>
        </div>

        <button
          class="signin-button"
          :disabled="loading"
          @click="handleLogin"
        >
          <span v-if="!loading">Sign In</span>
          <span v-else>Signing In...</span>
        </button>

        <div class="login-footer">
          <span class="footer-text">New to Modernize?</span>
          <span class="register-link" @click="goToRegister">
            Create an account
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  height: 100vh;
  background: linear-gradient(180deg, #f5f7fa 0%, #e8ecf1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto;
}

.login-container {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 10px;
  padding: 32px 28px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin: auto;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    max-width: 100%;
    padding: 24px 20px;
  }
}

.login-header {
  text-align: center;
  margin-bottom: 24px;

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 6px;
  }

  .logo-shapes {
    position: relative;
    width: 40px;
    height: 40px;
  }

  .logo-shape {
    position: absolute;
    border-radius: 8px;
  }

  .logo-shape-1 {
    width: 32px;
    height: 32px;
    background: #5d87ff;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .logo-shape-2 {
    width: 32px;
    height: 32px;
    background: #49beff;
    bottom: 0;
    right: 0;
    z-index: 1;
    opacity: 0.8;
  }

  .logo-text {
    color: #2a3547;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .login-tagline {
    font-size: 14px;
    color: #8c8c8c;
    margin: 0;
    font-weight: 400;
  }
}

.login-form {
  .form-group {
    margin-bottom: 16px;

    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: #2a3547;
      margin-bottom: 8px;
    }

    .form-input {
      width: 100%;
      height: 44px;
      padding: 0 16px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      font-size: 14px;
      color: #2a3547;
      transition: all 0.3s;
      background: #fff;
      box-sizing: border-box;

      &:focus {
        outline: none;
        border-color: #5d87ff;
        box-shadow: 0 0 0 3px rgba(93, 135, 255, 0.1);
      }

      &::placeholder {
        color: #bfbfbf;
      }
    }
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .checkbox-label {
      display: flex;
      align-items: center;
      cursor: pointer;

      .checkbox-input {
        width: 18px;
        height: 18px;
        margin-right: 8px;
        cursor: pointer;
        accent-color: #5d87ff;
      }

      .checkbox-text {
        font-size: 14px;
        color: #2a3547;
      }
    }

    .forgot-link {
      font-size: 14px;
      color: #5d87ff;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #4a75e6;
      }
    }
  }

  .signin-button {
    width: 100%;
    height: 44px;
    background: #5d87ff;
    border: none;
    border-radius: 6px;
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    margin-bottom: 16px;
    margin-top: 4px;

    &:hover:not(:disabled) {
      background: #4a75e6;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(93, 135, 255, 0.3);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .login-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    padding-top: 0;
    margin-top: 8px;

    .footer-text {
      font-size: 14px;
      color: #8c8c8c;
    }

    .register-link {
      font-size: 14px;
      color: #5d87ff;
      cursor: pointer;
      font-weight: 500;
      text-decoration: underline;
      transition: color 0.3s;

      &:hover {
        color: #4a75e6;
      }
    }
  }
}
</style>

