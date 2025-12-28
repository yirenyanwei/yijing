/**
 * Redis 配置提供者
 * 创建 Redis 客户端实例，供其他模块注入使用
 */
import { Provider } from '@nestjs/common'
import { Redis } from 'ioredis'

/**
 * Redis 配置提供者
 * 使用工厂模式创建 Redis 客户端，从环境变量读取配置
 */
export const redisConfig: Provider = {
  provide: 'REDIS_CLIENT', // 提供者的标识符，其他模块通过此标识符注入
  useFactory: () => {
    // 工厂函数，创建 Redis 客户端实例
    return new Redis({
      host: process.env.REDIS_HOST || 'localhost', // Redis 主机地址
      port: parseInt(process.env.REDIS_PORT) || 6379, // Redis 端口
      password: process.env.REDIS_PASSWORD || undefined, // Redis 密码（可选）
      db: parseInt(process.env.REDIS_DB) || 0 // Redis 数据库编号
    })
  }
}

