/**
 * JWT 认证策略
 * 用于验证 JWT token 并提取用户信息
 */
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '../../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      // 从请求头 Authorization 中提取 Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 不忽略 token 过期时间
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key' // JWT 密钥
    })
  }

  /**
   * 验证 JWT payload 并返回用户信息
   * @param payload - JWT token 解析后的 payload（包含 sub: 用户ID, username: 用户名）
   * @returns 返回用户信息对象，会被挂载到 request.user
   * @throws UnauthorizedException - 用户不存在时抛出
   */
  async validate(payload: any) {
    // 根据 payload 中的用户 ID 查找用户
    const user = await this.userService.findOne(payload.sub)
    if (!user) {
      throw new UnauthorizedException()
    }
    // 返回用户信息，会被挂载到 request.user
    return { id: user.id, username: user.username }
  }
}

