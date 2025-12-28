<script setup lang="ts">
/**
 * 注册页面组件
 * 提供用户注册功能，包括姓名、邮箱、密码输入和表单验证
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showSuccessToast } from 'vant'
import { register } from '@/api/user'

const router = useRouter() // 路由实例

// 表单数据（响应式）
const name = ref('') // 姓名/用户名
const email = ref('') // 邮箱
const password = ref('') // 密码
const loading = ref(false) // 注册加载状态

/**
 * 处理注册提交
 * 验证表单数据，调用注册 API，成功后跳转到登录页
 */
const handleRegister = async () => {
  // 表单验证
  if (!name.value) {
    showToast('请输入姓名')
    return
  }
  if (!email.value) {
    showToast('请输入邮箱')
    return
  }
  // 邮箱格式验证（使用正则表达式）
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showToast('请输入正确的邮箱格式')
    return
  }
  if (!password.value) {
    showToast('请输入密码')
    return
  }
  // 密码长度验证（至少6个字符）
  if (password.value.length < 6) {
    showToast('密码至少6个字符')
    return
  }

  loading.value = true // 开始加载
  try {
    // 调用注册 API
    await register({
      username: name.value,
      email: email.value,
      password: password.value
    })
    
    showSuccessToast('注册成功，请登录')
    // 注册成功后跳转到登录页
    router.push('/login')
  } catch (error: any) {
    // 注册失败，显示错误提示
    showToast(error.message || '注册失败')
  } finally {
    loading.value = false // 结束加载
  }
}

/**
 * 跳转到登录页面
 */
const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="register-page">
    <div class="register-container">
      <!-- Logo 和品牌 -->
      <div class="register-header">
        <div class="logo-container">
          <div class="logo-shapes">
            <div class="logo-shape logo-shape-1"></div>
            <div class="logo-shape logo-shape-2"></div>
          </div>
          <span class="logo-text">Modernize</span>
        </div>
        <p class="register-tagline">Your Social Campaigns</p>
      </div>

      <!-- 注册表单 -->
      <div class="register-form">
        <div class="form-group">
          <label class="form-label">Name</label>
          <input
            v-model="name"
            type="text"
            class="form-input"
            placeholder=""
          />
        </div>

        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input
            v-model="email"
            type="email"
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

        <button
          class="signup-button"
          :disabled="loading"
          @click="handleRegister"
        >
          <span v-if="!loading">Sign Up</span>
          <span v-else>Signing Up...</span>
        </button>

        <div class="register-footer">
          <span class="footer-text">Already have an Account?</span>
          <span class="login-link" @click="goToLogin">
            Sign In
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register-page {
  height: 100vh;
  background: linear-gradient(180deg, #f5f7fa 0%, #e8ecf1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto;
}

.register-container {
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

.register-header {
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

  .register-tagline {
    font-size: 14px;
    color: #8c8c8c;
    margin: 0;
    font-weight: 400;
  }
}

.register-form {
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

  .signup-button {
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

  .register-footer {
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

    .login-link {
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

