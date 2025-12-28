/**
 * 用户控制器
 * 处理用户相关的 HTTP 请求，包括用户信息查询、用户列表、用户注册等
 */
import { Controller, Get, Post, Body, UseGuards, Request, ConflictException } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'

@ApiTags('用户') // Swagger 文档标签
@Controller('user') // 路由前缀：/api/user
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 获取当前登录用户信息
   * 需要 JWT 认证，从 token 中提取用户 ID
   */
  @Get('info')
  @UseGuards(JwtAuthGuard) // 使用 JWT 认证守卫
  @ApiBearerAuth() // Swagger 文档中标记需要 Bearer Token
  @ApiOperation({ summary: '获取当前用户信息' })
  async getUserInfo(@Request() req) {
    // req.user 由 JwtStrategy 挂载，包含用户 ID 和用户名
    return this.userService.getUserInfo(req.user.id)
  }

  /**
   * 获取所有用户列表
   * 返回所有用户信息（不包含密码）
   */
  @Get('list')
  @ApiOperation({ summary: '获取所有用户列表' })
  async findAll() {
    return this.userService.findAll()
  }

  /**
   * 创建新用户（用户注册）
   * 检查用户名和邮箱是否已存在，避免重复注册
   */
  @Post()
  @ApiOperation({ summary: '创建用户（注册）' })
  async create(@Body() createUserDto: CreateUserDto) {
    // 检查用户名是否已存在
    const existingUser = await this.userService.findByUsername(createUserDto.username)
    if (existingUser) {
      throw new ConflictException('用户名已存在')
    }
    
    // 检查邮箱是否已存在
    const existingEmail = await this.userService.findByEmail(createUserDto.email)
    if (existingEmail) {
      throw new ConflictException('邮箱已被注册')
    }
    
    try {
      // 创建用户（密码会自动加密）
      const user = await this.userService.create(createUserDto)
      // 返回用户信息，排除密码字段
      const { password, ...result } = user
      return result
    } catch (error: any) {
      // 处理数据库唯一约束错误（防止并发注册导致的重复）
      if (error.code === 'ER_DUP_ENTRY') {
        if (error.message.includes('username')) {
          throw new ConflictException('用户名已存在')
        }
        if (error.message.includes('email')) {
          throw new ConflictException('邮箱已被注册')
        }
      }
      throw error
    }
  }
}

