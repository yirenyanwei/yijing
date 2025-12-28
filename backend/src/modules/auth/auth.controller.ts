/**
 * 认证控制器
 * 处理用户登录、注册等认证相关的 HTTP 请求
 */
import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@ApiTags('认证') // Swagger 文档标签
@Controller('auth') // 路由前缀：/api/auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 用户登录接口
   * @param loginDto - 登录数据传输对象，包含用户名和密码
   * @returns 返回 JWT token 和用户信息
   */
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }
}

