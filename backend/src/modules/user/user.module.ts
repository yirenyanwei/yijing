/**
 * 用户模块
 * 负责用户相关的功能，包括用户管理、用户信息查询等
 */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { User } from './user.entity'
import { redisConfig } from '../../config/redis.config'

@Module({
  imports: [
    // 注册 User 实体到 TypeORM，使其可以在本模块中使用
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController], // 用户控制器
  providers: [UserService, redisConfig], // 用户服务和 Redis 配置
  exports: [UserService] // 导出用户服务，供其他模块（如 AuthModule）使用
})
export class UserModule {}

