/**
 * 用户实体类
 * 定义用户数据表结构和字段约束
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('users') // 指定数据表名称为 'users'
export class User {
  @PrimaryGeneratedColumn() // 主键，自动递增
  id: number

  @Column({ length: 50, unique: true }) // 用户名，最大长度50，唯一约束
  username: string

  @Column({ length: 100, unique: true }) // 邮箱，最大长度100，唯一约束
  email: string

  @Column({ length: 255 }) // 密码（存储哈希值），最大长度255
  password: string

  @Column({ length: 200, nullable: true }) // 头像URL，最大长度200，可为空
  avatar: string

  @CreateDateColumn() // 创建时间，自动生成
  createdAt: Date

  @UpdateDateColumn() // 更新时间，自动更新
  updatedAt: Date
}

