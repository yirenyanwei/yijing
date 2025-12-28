# Docker 服务使用指南

## 快速开始

### 启动所有服务（MySQL + Redis）

```bash
# 方式一：使用脚本（推荐）
./docker-start.sh start

# 方式二：使用 docker-compose
docker-compose up -d
```

### 停止所有服务

```bash
# 方式一：使用脚本
./docker-start.sh stop

# 方式二：使用 docker-compose
docker-compose down
```

## 服务管理

### 使用管理脚本

```bash
# 启动服务
./docker-start.sh start

# 停止服务
./docker-start.sh stop

# 重启服务
./docker-start.sh restart

# 查看状态
./docker-start.sh status

# 查看日志
./docker-start.sh logs
./docker-start.sh logs mysql
./docker-start.sh logs redis

# 连接 MySQL
./docker-start.sh mysql

# 连接 Redis
./docker-start.sh redis

# 测试连接
./docker-start.sh test
```

### 使用 Docker Compose

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 查看状态
docker-compose ps

# 查看日志
docker-compose logs
docker-compose logs -f mysql
docker-compose logs -f redis
```

## 服务配置

### MySQL 配置

- **容器名**: mysql-h5
- **端口**: 3306
- **用户名**: root
- **密码**: root123456
- **数据库**: h5_db（自动创建）
- **字符集**: utf8mb4
- **排序规则**: utf8mb4_unicode_ci

### Redis 配置

- **容器名**: redis-h5
- **端口**: 6379
- **密码**: 无（开发环境）
- **数据持久化**: 已启用（AOF）

## 验证服务

### 验证 MySQL

```bash
# 查看数据库
docker exec -it mysql-h5 mysql -uroot -proot123456 -e "SHOW DATABASES;"

# 验证 h5_db 数据库
docker exec -it mysql-h5 mysql -uroot -proot123456 -e "SHOW DATABASES LIKE 'h5_db';"
```

### 验证 Redis

```bash
# 测试连接
docker exec -it redis-h5 redis-cli ping
# 应该返回: PONG

# 查看 Redis 信息
docker exec -it redis-h5 redis-cli INFO
```

## 后端环境变量配置

在 `backend` 目录创建 `.env` 文件：

```env
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root123456
DB_NAME=h5_db

# Redis 配置
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# JWT 配置
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRES_IN=7d

# 服务配置
PORT=3000
NODE_ENV=development
```

## 数据持久化

数据会自动保存在 Docker 卷中：
- MySQL 数据: `mysql-data` 卷
- Redis 数据: `redis-data` 卷

即使删除容器，数据也不会丢失（除非使用 `docker-compose down -v`）。

## 常见问题

### 问题 1: 端口被占用

如果 3306 或 6379 端口被占用：

1. 修改 `docker-compose.yml` 中的端口映射
2. 同时更新后端 `.env` 文件中的端口配置

### 问题 2: 服务启动失败

```bash
# 查看详细日志
docker-compose logs mysql
docker-compose logs redis

# 检查容器状态
docker-compose ps
```

### 问题 3: 忘记密码

MySQL root 密码在 `docker-compose.yml` 中配置为 `root123456`，如需修改：

1. 修改 `docker-compose.yml` 中的 `MYSQL_ROOT_PASSWORD`
2. 重新创建容器：`docker-compose down && docker-compose up -d`
3. 更新后端 `.env` 文件

### 问题 4: 数据丢失

如果数据丢失，检查数据卷：

```bash
# 查看数据卷
docker volume ls

# 查看数据卷详情
docker volume inspect yijing_mysql-data
docker volume inspect yijing_redis-data
```

## 备份和恢复

### 备份 MySQL

```bash
# 备份数据库
docker exec mysql-h5 mysqldump -uroot -proot123456 h5_db > backup.sql

# 或使用 docker-compose
docker-compose exec mysql mysqldump -uroot -proot123456 h5_db > backup.sql
```

### 恢复 MySQL

```bash
# 恢复数据库
docker exec -i mysql-h5 mysql -uroot -proot123456 h5_db < backup.sql
```

### 备份 Redis

```bash
# Redis 数据已自动持久化到数据卷
# 如需手动备份
docker exec redis-h5 redis-cli SAVE
```

## 清理

### 停止并删除容器（保留数据）

```bash
docker-compose down
```

### 停止并删除容器和数据

```bash
docker-compose down -v
```

⚠️ **警告**: 这会删除所有数据，请谨慎操作！

## 下一步

服务启动后：

1. ✅ 验证服务运行正常
2. ✅ 配置后端 `.env` 文件
3. ✅ 启动后端服务测试连接
4. ✅ 开始开发！

