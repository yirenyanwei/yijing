/**
 * 认证模块
 * 负责用户认证、JWT token 生成和验证等功能
 */
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    UserModule, // 导入用户模块，用于查询用户信息
    PassportModule, // Passport 模块，用于身份验证策略
    // JWT 模块配置
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // JWT 签名密钥
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } // Token 过期时间（默认 7 天）
    })
  ],
  controllers: [AuthController], // 认证控制器
  providers: [AuthService, JwtStrategy], // 认证服务和 JWT 策略
  exports: [AuthService] // 导出认证服务，供其他模块使用
})
export class AuthModule {}

