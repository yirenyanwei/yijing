/**
 * 登录数据传输对象（DTO）
 * 用于用户登录接口的请求参数验证
 */
import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ description: '用户名', example: 'john_doe' })
  @IsString() // 必须是字符串类型
  @IsNotEmpty() // 不能为空
  username: string

  @ApiProperty({ description: '密码', example: 'password123' })
  @IsString() // 必须是字符串类型
  @IsNotEmpty() // 不能为空
  password: string
}

