/**
 * 数据库配置
 * 从环境变量读取数据库连接信息，返回 TypeORM 配置对象
 */
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { User } from '../modules/user/user.entity'

/**
 * 获取数据库配置
 * @param configService - 配置服务，用于读取环境变量
 * @returns TypeORM 模块配置选项
 */
export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql', // 数据库类型
  host: configService.get('DB_HOST', 'localhost'), // 数据库主机地址
  port: configService.get<number>('DB_PORT', 3306), // 数据库端口
  username: configService.get('DB_USER', 'root'), // 数据库用户名
  password: configService.get('DB_PASSWORD', ''), // 数据库密码
  database: configService.get('DB_NAME', 'h5_db'), // 数据库名称
  entities: [User], // 实体类列表，TypeORM 会自动加载这些实体
  synchronize: configService.get('NODE_ENV') === 'development', // 自动同步数据库结构（仅开发环境，生产环境必须为 false）
  logging: configService.get('NODE_ENV') === 'development', // 是否打印 SQL 日志（仅开发环境）
  charset: 'utf8mb4', // 字符集，支持 emoji 等特殊字符
  timezone: '+08:00' // 时区设置（中国时区）
})

