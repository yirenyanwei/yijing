/**
 * HTTP 请求工具
 * 基于 axios 封装，提供统一的请求配置、拦截器和错误处理
 */
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { showToast } from 'vant'

/**
 * 创建 axios 实例
 * 配置基础 URL、超时时间和默认请求头
 */
const request: AxiosInstance = axios.create({
  baseURL: '/api', // API 基础路径
  timeout: 10000, // 请求超时时间（10秒）
  headers: {
    'Content-Type': 'application/json' // 默认请求头
  }
})

/**
 * 请求拦截器
 * 在发送请求前自动添加 JWT token 到请求头
 */
request.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token')
    if (token) {
      // 将 token 添加到请求头的 Authorization 字段
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 请求配置错误，直接拒绝
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 * 统一处理响应数据和错误
 */
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    
    // 如果响应状态码是 2xx，处理响应数据
    if (response.status >= 200 && response.status < 300) {
      // 如果后端返回的数据有 code 字段，需要判断业务状态码
      if (data.code !== undefined) {
        if (data.code === 200 || data.success) {
          // 业务成功，返回数据部分
          return data.data || data
        } else {
          // 业务失败，显示错误提示并拒绝 Promise
          showToast(data.message || '请求失败')
          return Promise.reject(new Error(data.message || '请求失败'))
        }
      }
      // 没有 code 字段，直接返回数据（如登录接口直接返回 token 和 userInfo）
      return data
    }
    
    // 其他情况，直接返回数据
    return data
  },
  (error) => {
    // 处理 HTTP 错误响应
    if (error.response) {
      // 根据 HTTP 状态码显示不同的错误提示
      switch (error.response.status) {
        case 401:
          showToast('未授权，请重新登录')
          // 清除 token（用户需要重新登录）
          localStorage.removeItem('token')
          // 可以在这里跳转到登录页（需要导入 router）
          // router.push('/login')
          break
        case 403:
          showToast('拒绝访问')
          break
        case 404:
          showToast('请求错误，未找到该资源')
          break
        case 500:
          showToast('服务器错误')
          break
        default:
          showToast(`连接错误${error.response.status}`)
      }
    } else {
      // 网络错误或其他错误
      showToast('网络连接异常')
    }
    return Promise.reject(error)
  }
)

export default request

