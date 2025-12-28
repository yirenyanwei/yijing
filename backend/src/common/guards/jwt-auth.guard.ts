/**
 * JWT 认证守卫
 * 用于保护需要身份验证的路由，验证请求中的 JWT token
 * 继承自 Passport 的 AuthGuard，使用 'jwt' 策略
 */
import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // 使用 Passport 的 JWT 策略进行身份验证
  // 在需要保护的路由中使用 @UseGuards(JwtAuthGuard) 装饰器
}

