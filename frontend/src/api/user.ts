/**
 * 用户相关 API 接口
 * 封装所有与用户相关的 HTTP 请求方法
 */
import request from '@/utils/request'
import type { UserInfo, LoginParams, LoginResponse, RegisterParams, RegisterResponse } from '@/types/user'

/**
 * 获取当前登录用户信息
 * 需要 JWT 认证
 * @returns 返回用户信息对象（响应拦截器已处理数据提取）
 */
export const getUserInfo = (): Promise<UserInfo> => {
  return request.get<UserInfo>('/user/info') as unknown as Promise<UserInfo>
}

/**
 * 用户登录
 * @param params - 登录参数（用户名和密码）
 * @returns 返回登录响应（包含 token 和用户信息，响应拦截器已处理数据提取）
 */
export const login = (params: LoginParams): Promise<LoginResponse> => {
  return request.post<LoginResponse>('/auth/login', params) as unknown as Promise<LoginResponse>
}

/**
 * 用户注册
 * @param params - 注册参数（用户名、邮箱和密码）
 * @returns 返回注册响应（响应拦截器已处理数据提取）
 */
export const register = (params: RegisterParams): Promise<RegisterResponse> => {
  return request.post<RegisterResponse>('/user', params) as unknown as Promise<RegisterResponse>
}

/**
 * 用户退出登录
 * @returns 返回退出响应
 */
export const logout = () => {
  return request.post('/auth/logout')
}

