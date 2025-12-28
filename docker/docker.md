# Docker 服务管理

## 使用 Docker Compose（推荐）

项目根目录已包含 `docker-compose.yml` 文件，可以同时管理 MySQL 和 Redis。

### 启动所有服务

```bash
docker-compose up -d
```

### 停止所有服务

```bash
docker-compose down
```

### 查看服务状态

```bash
docker-compose ps
```

### 查看服务日志

```bash
# 查看所有服务日志
docker-compose logs

# 查看 MySQL 日志
docker-compose logs mysql

# 查看 Redis 日志
docker-compose logs redis

# 实时查看日志
docker-compose logs -f mysql
```

### 重启服务

```bash
docker-compose restart
```

## 单独管理 MySQL

### 启动 MySQL 容器

```bash
docker start mysql-h5
```

### 停止 MySQL 容器

```bash
docker stop mysql-h5
```

### 重启 MySQL 容器

```bash
docker restart mysql-h5
```

### 查看 MySQL 状态

```bash
docker ps -a | grep mysql-h5
```

### 查看 MySQL 日志

```bash
docker logs mysql-h5
```

### 进入 MySQL 命令行

```bash
docker exec -it mysql-h5 mysql -uroot -proot123456
```

### 执行 SQL 命令

```bash
docker exec -it mysql-h5 mysql -uroot -proot123456 -e "SHOW DATABASES;"
```

### 验证数据库

```bash
docker exec -it mysql-h5 mysql -uroot -proot123456 -e "SHOW DATABASES LIKE 'h5_db';"
```

## 单独管理 Redis

### 启动 Redis 容器

```bash
docker start redis-h5
```

### 停止 Redis 容器

```bash
docker stop redis-h5
```

### 重启 Redis 容器

```bash
docker restart redis-h5
```

### 查看 Redis 状态

```bash
docker ps -a | grep redis-h5
```

### 查看 Redis 日志

```bash
docker logs redis-h5
```

### 进入 Redis 命令行

```bash
docker exec -it redis-h5 redis-cli
```

### 测试 Redis 连接

```bash
docker exec -it redis-h5 redis-cli ping
# 应该返回: PONG
```

### Redis 常用命令

```bash
# 查看所有 key
docker exec -it redis-h5 redis-cli KEYS "*"

# 设置值
docker exec -it redis-h5 redis-cli SET test "hello"

# 获取值
docker exec -it redis-h5 redis-cli GET test

# 删除 key
docker exec -it redis-h5 redis-cli DEL test
```

## 删除容器（注意：会删除所有数据）

```bash
# 删除 MySQL 容器
docker rm -f mysql-h5

# 删除 Redis 容器
docker rm -f redis-h5

# 删除所有服务（包括数据卷）
docker-compose down -v
```

## 服务配置信息

### MySQL 配置
- **容器名**: mysql-h5
- **端口**: 3306
- **用户名**: root
- **密码**: root123456
- **数据库**: h5_db
- **字符集**: utf8mb4
- **排序规则**: utf8mb4_unicode_ci

### Redis 配置
- **容器名**: redis-h5
- **端口**: 6379
- **密码**: 无（开发环境）
- **数据持久化**: 已启用（AOF）

## 数据持久化

使用 Docker Compose 时，数据会自动保存在 Docker 卷中：
- MySQL 数据: `mysql-data` 卷
- Redis 数据: `redis-data` 卷

即使删除容器，数据也不会丢失（除非使用 `docker-compose down -v`）。

## 健康检查

两个服务都配置了健康检查，可以通过以下命令查看：

```bash
docker-compose ps
```

健康状态会显示在 STATUS 列中。