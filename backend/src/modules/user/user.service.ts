/**
 * 用户服务
 * 负责用户相关的业务逻辑，包括用户查询、创建、信息获取等
 * 使用 Redis 缓存提升查询性能
 */
import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Redis } from 'ioredis'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  // Redis 缓存键前缀
  private readonly CACHE_PREFIX = 'user:'
  private readonly CACHE_TTL = 3600 // 缓存过期时间（秒），1小时

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // 用户数据仓库，用于数据库操作
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis // Redis 客户端，用于缓存操作
  ) {}

  /**
   * 根据 ID 查找用户（带 Redis 缓存）
   * @param id - 用户 ID
   * @returns 返回用户实体对象
   */
  async findOne(id: number): Promise<User> {
    const cacheKey = `${this.CACHE_PREFIX}id:${id}`
    
    // 1. 先尝试从 Redis 缓存获取
    const cached = await this.redis.get(cacheKey)
    if (cached) {
      return JSON.parse(cached)
    }
    
    // 2. 缓存未命中，从 MySQL 查询
    const user = await this.userRepository.findOne({ where: { id } })
    
    // 3. 如果查询到用户，存入 Redis 缓存
    if (user) {
      await this.redis.setex(cacheKey, this.CACHE_TTL, JSON.stringify(user))
    }
    
    return user
  }

  /**
   * 根据用户名查找用户（带 Redis 缓存）
   * @param username - 用户名
   * @returns 返回用户实体对象，不存在则返回 null
   */
  async findByUsername(username: string): Promise<User | null> {
    const cacheKey = `${this.CACHE_PREFIX}username:${username}`
    
    // 1. 先尝试从 Redis 缓存获取
    const cached = await this.redis.get(cacheKey)
    if (cached) {
      return JSON.parse(cached)
    }
    
    // 2. 缓存未命中，从 MySQL 查询
    const user = await this.userRepository.findOne({ where: { username } })
    
    // 3. 如果查询到用户，存入 Redis 缓存
    if (user) {
      await this.redis.setex(cacheKey, this.CACHE_TTL, JSON.stringify(user))
      // 同时缓存用户 ID 映射，方便后续通过 ID 查询
      await this.redis.setex(
        `${this.CACHE_PREFIX}id:${user.id}`,
        this.CACHE_TTL,
        JSON.stringify(user)
      )
    }
    
    return user
  }

  /**
   * 根据邮箱查找用户（带 Redis 缓存）
   * @param email - 邮箱地址
   * @returns 返回用户实体对象，不存在则返回 null
   */
  async findByEmail(email: string): Promise<User | null> {
    const cacheKey = `${this.CACHE_PREFIX}email:${email}`
    
    // 1. 先尝试从 Redis 缓存获取
    const cached = await this.redis.get(cacheKey)
    if (cached) {
      return JSON.parse(cached)
    }
    
    // 2. 缓存未命中，从 MySQL 查询
    const user = await this.userRepository.findOne({ where: { email } })
    
    // 3. 如果查询到用户，存入 Redis 缓存
    if (user) {
      await this.redis.setex(cacheKey, this.CACHE_TTL, JSON.stringify(user))
      // 同时缓存用户 ID 映射
      await this.redis.setex(
        `${this.CACHE_PREFIX}id:${user.id}`,
        this.CACHE_TTL,
        JSON.stringify(user)
      )
    }
    
    return user
  }

  /**
   * 创建新用户（注册）
   * 使用 bcrypt 对密码进行哈希加密后存储
   * 创建成功后清除相关缓存
   * @param createUserDto - 用户创建数据传输对象
   * @returns 返回创建的用户实体对象（包含加密后的密码）
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto
    // 使用 bcrypt 对密码进行哈希加密，salt rounds 为 10
    const hashedPassword = await bcrypt.hash(password, 10)
    // 创建用户实体
    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword // 存储加密后的密码
    })
    // 保存到数据库
    const savedUser = await this.userRepository.save(user)
    
    // 清除用户列表缓存（因为新增了用户）
    await this.clearUserListCache()
    
    return savedUser
  }

  /**
   * 获取用户信息（不包含密码）
   * @param id - 用户 ID
   * @returns 返回用户信息对象（排除密码字段），用户不存在则返回 null
   */
  async getUserInfo(id: number) {
    const user = await this.findOne(id)
    if (!user) {
      return null
    }
    // 解构排除密码字段，只返回用户信息
    const { password, ...userInfo } = user
    return userInfo
  }

  /**
   * 获取所有用户列表（带 Redis 缓存）
   * @returns 返回所有用户信息数组（排除密码字段），按创建时间倒序排列
   */
  async findAll() {
    const cacheKey = `${this.CACHE_PREFIX}list:all`
    
    // 1. 先尝试从 Redis 缓存获取
    const cached = await this.redis.get(cacheKey)
    if (cached) {
      return JSON.parse(cached)
    }
    
    // 2. 缓存未命中，从 MySQL 查询
    const users = await this.userRepository.find({
      order: { createdAt: 'DESC' } // 按创建时间倒序
    })
    
    // 3. 映射所有用户，排除密码字段
    const userList = users.map(({ password, ...user }) => user)
    
    // 4. 存入 Redis 缓存（用户列表缓存时间稍短，30分钟）
    await this.redis.setex(cacheKey, 1800, JSON.stringify(userList))
    
    return userList
  }

  /**
   * 清除指定用户的缓存
   * @param userId - 用户 ID
   */
  private async clearUserCache(userId: number): Promise<void> {
    const patterns = [
      `${this.CACHE_PREFIX}id:${userId}`,
      `${this.CACHE_PREFIX}username:*`,
      `${this.CACHE_PREFIX}email:*`
    ]
    
    // 删除所有匹配的缓存键
    for (const pattern of patterns) {
      const keys = await this.redis.keys(pattern)
      if (keys.length > 0) {
        await this.redis.del(...keys)
      }
    }
  }

  /**
   * 清除用户列表缓存
   */
  private async clearUserListCache(): Promise<void> {
    const cacheKey = `${this.CACHE_PREFIX}list:all`
    await this.redis.del(cacheKey)
  }
}

