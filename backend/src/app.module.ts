/**
 * 应用根模块
 * 负责导入和配置所有子模块、数据库、Redis 等核心服务
 */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getDatabaseConfig } from './config/database.config'
import { redisConfig } from './config/redis.config'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [
    // 环境变量配置模块（必须最先加载，其他模块依赖环境变量）
    ConfigModule.forRoot({
      isGlobal: true, // 全局模块，所有模块都可以使用 ConfigService
      envFilePath: '.env' // 指定环境变量文件路径
    }),
    // 数据库配置（使用异步方式，确保环境变量已加载）
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig, // 使用工厂函数获取数据库配置
      inject: [ConfigService] // 注入 ConfigService 以读取环境变量
    }),
    // 业务模块
    UserModule, // 用户模块
    AuthModule // 认证模块
  ],
  providers: [redisConfig], // Redis 配置提供者
  exports: [redisConfig] // 导出 Redis 配置，供其他模块使用
})
export class AppModule {}

