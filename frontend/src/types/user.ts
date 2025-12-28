/**
 * 用户相关类型定义
 * 定义前端使用的用户信息、登录、注册等接口类型
 */

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: number // 用户 ID
  username: string // 用户名
  email: string // 邮箱
  avatar?: string // 头像 URL（可选）
  createdAt?: string // 创建时间（可选）
  updatedAt?: string // 更新时间（可选）
}

/**
 * 登录请求参数接口
 */
export interface LoginParams {
  username: string // 用户名
  password: string // 密码
}

/**
 * 登录响应接口
 */
export interface LoginResponse {
  token: string // JWT token
  userInfo: UserInfo // 用户信息
}

/**
 * 注册请求参数接口
 */
export interface RegisterParams {
  username: string // 用户名
  email: string // 邮箱
  password: string // 密码
}

/**
 * 注册响应接口
 */
export interface RegisterResponse {
  message?: string // 响应消息（可选）
}

