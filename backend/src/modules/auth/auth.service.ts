/**
 * 认证服务
 * 负责用户身份验证、JWT token 生成等业务逻辑
 */
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, // 用户服务，用于查询用户信息
    private jwtService: JwtService // JWT 服务，用于生成和验证 token
  ) {}

  /**
   * 验证用户凭证
   * @param username - 用户名
   * @param password - 密码（明文）
   * @returns 验证成功返回用户信息（不含密码），失败返回 null
   */
  async validateUser(username: string, password: string): Promise<any> {
    // 根据用户名查找用户
    const user = await this.userService.findByUsername(username)
    // 使用 bcrypt 比较明文密码和哈希密码
    if (user && (await bcrypt.compare(password, user.password))) {
      // 返回用户信息，排除密码字段
      const { password, ...result } = user
      return result
    }
    return null
  }

  /**
   * 用户登录
   * @param loginDto - 登录数据传输对象
   * @returns 返回 JWT token 和用户信息
   * @throws UnauthorizedException - 用户名或密码错误时抛出
   */
  async login(loginDto: LoginDto) {
    // 验证用户凭证
    const user = await this.validateUser(loginDto.username, loginDto.password)
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误')
    }
    // 构建 JWT payload（包含用户 ID 和用户名）
    const payload = { username: user.username, sub: user.id }
    // 返回 token 和用户信息
    return {
      token: this.jwtService.sign(payload), // 生成 JWT token
      userInfo: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    }
  }
}

