# Docker 网络问题解决方案

## 当前问题诊断

1. ✅ Docker 已安装并运行
2. ✅ 镜像加速器已配置
3. ❌ 无法访问 Docker Hub
4. ❌ DNS 无法解析镜像加速器域名

## 解决方案

### 方案一：修复 DNS 配置（推荐）

#### 检查当前 DNS

```bash
# 查看 DNS 配置
scutil --dns | grep nameserver
```

#### 配置可靠的 DNS

1. **系统设置方式：**
   - 打开"系统偏好设置" → "网络"
   - 选择当前网络连接
   - 点击"高级" → "DNS"
   - 添加以下 DNS 服务器：
     - `8.8.8.8` (Google DNS)
     - `114.114.114.114` (国内 DNS)
     - `223.5.5.5` (阿里 DNS)

2. **命令行方式：**
   ```bash
   # 查看当前网络服务
   networksetup -listallnetworkservices
   
   # 设置 DNS（替换 Wi-Fi 为你的网络服务名）
   sudo networksetup -setdnsservers Wi-Fi 8.8.8.8 114.114.114.114
   ```

#### 刷新 DNS 缓存

```bash
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

### 方案二：使用代理（如果有）

如果使用代理，配置 Docker 使用代理：

1. **Docker Desktop 设置：**
   - 打开 Docker Desktop
   - 设置 → Resources → Proxies
   - 配置 HTTP/HTTPS 代理
   - 重启 Docker

2. **环境变量方式：**
   ```bash
   # 在 ~/.zshrc 中添加
   export HTTP_PROXY=http://proxy.example.com:8080
   export HTTPS_PROXY=http://proxy.example.com:8080
   export NO_PROXY=localhost,127.0.0.1
   ```

### 方案三：使用国内镜像仓库

#### 使用阿里云容器镜像服务

1. **注册阿里云账号并开通容器镜像服务**
   - 访问：https://cr.console.aliyun.com/
   - 开通"容器镜像服务"

2. **获取个人镜像加速地址**
   - 登录后，在"镜像加速器"页面获取你的专属地址
   - 格式类似：`https://xxxxx.mirror.aliyuncs.com`

3. **配置 Docker**
   ```bash
   # 编辑配置文件
   nano ~/.docker/daemon.json
   ```
   
   添加你的阿里云加速地址：
   ```json
   {
     "registry-mirrors": [
       "https://xxxxx.mirror.aliyuncs.com"
     ]
   }
   ```

4. **重启 Docker Desktop**

### 方案四：手动导入镜像（离线方案）

如果网络完全无法连接，可以：

1. **在其他有网络的机器上下载镜像**
   ```bash
   docker pull mysql:8.0
   docker save mysql:8.0 -o mysql-8.0.tar
   ```

2. **传输到当前机器后导入**
   ```bash
   docker load -i mysql-8.0.tar
   ```

### 方案五：使用手机热点

临时解决方案：
1. 连接手机热点
2. 重新尝试拉取镜像
3. 拉取成功后，即使切换回原网络，镜像也会保留

## 快速测试命令

### 测试 DNS 解析

```bash
# 测试 Google DNS
nslookup docker.mirrors.ustc.edu.cn 8.8.8.8

# 测试国内 DNS
nslookup docker.mirrors.ustc.edu.cn 114.114.114.114
```

### 测试网络连接

```bash
# 测试基本网络
ping -c 2 8.8.8.8

# 测试 HTTPS 连接
curl -I https://www.baidu.com
```

### 测试 Docker 连接

```bash
# 重启 Docker 后测试
docker pull hello-world
```

## 推荐的完整解决步骤

1. **首先修复 DNS：**
   ```bash
   # 添加可靠的 DNS
   sudo networksetup -setdnsservers Wi-Fi 8.8.8.8 114.114.114.114 223.5.5.5
   
   # 刷新 DNS 缓存
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   ```

2. **重启 Docker Desktop**

3. **测试连接：**
   ```bash
   docker pull hello-world
   ```

4. **如果仍然失败，使用阿里云镜像加速器**

5. **最后尝试使用手机热点临时解决**

## 验证修复

修复后，执行：

```bash
# 测试拉取镜像
docker pull hello-world

# 如果成功，拉取 MySQL
docker pull mysql:8.0

# 运行 MySQL 容器
docker run --name mysql-h5 \
  -e MYSQL_ROOT_PASSWORD=root123456 \
  -e MYSQL_DATABASE=h5_db \
  -p 3306:3306 \
  -d mysql:8.0 \
  --character-set-server=utf8mb4 \
  --collation-server=utf8mb4_unicode_ci
```

