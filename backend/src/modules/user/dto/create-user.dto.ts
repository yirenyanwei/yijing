/**
 * 创建用户数据传输对象（DTO）
 * 用于用户注册接口的请求参数验证
 */
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'john_doe' })
  @IsString() // 必须是字符串类型
  @IsNotEmpty() // 不能为空
  @MinLength(3) // 最小长度为 3
  username: string

  @ApiProperty({ description: '邮箱', example: 'john@example.com' })
  @IsEmail() // 必须是有效的邮箱格式
  @IsNotEmpty() // 不能为空
  email: string

  @ApiProperty({ description: '密码', example: 'password123' })
  @IsString() // 必须是字符串类型
  @IsNotEmpty() // 不能为空
  @MinLength(6) // 最小长度为 6
  password: string
}

