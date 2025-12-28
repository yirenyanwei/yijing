# 解决 Docker 网络连接问题

## 问题诊断结果

- ✅ 基本网络连接正常（可以 ping 通 8.8.8.8）
- ❌ DNS 无法解析镜像加速器域名
- ❌ 无法连接 Docker Hub
- ⚠️  需要管理员权限配置 DNS

## 解决方案（按优先级）

### 方案一：手动配置 DNS（推荐）

由于需要管理员密码，请手动执行：

#### 步骤 1: 配置 DNS

**方法 A：通过系统设置（最简单）**

1. 打开"系统偏好设置"（或"系统设置"）
2. 点击"网络"
3. 选择"Wi-Fi"（或你当前使用的网络）
4. 点击"高级"
5. 选择"DNS"标签
6. 点击左下角"+"添加以下 DNS 服务器：
   - `8.8.8.8` (Google DNS)
   - `114.114.114.114` (国内 DNS)
   - `223.5.5.5` (阿里 DNS)
7. 点击"好"保存
8. 应用更改

**方法 B：通过命令行**

在终端执行（需要输入密码）：

```bash
# 配置 DNS
sudo networksetup -setdnsservers Wi-Fi 8.8.8.8 114.114.114.114 223.5.5.5

# 刷新 DNS 缓存
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
```

#### 步骤 2: 重启 Docker Desktop

完全退出并重新启动 Docker Desktop。

#### 步骤 3: 测试连接

```bash
docker pull hello-world
```

### 方案二：使用手机热点（临时方案）

如果 DNS 配置后仍无法连接：

1. 打开手机热点
2. Mac 连接到手机热点
3. 执行：
   ```bash
   docker pull mysql:8.0
   ```
4. 拉取成功后，即使切换回原网络，镜像也会保留
5. 然后运行 MySQL 容器

### 方案三：使用阿里云容器镜像服务

如果上述方案都不行，使用阿里云个人镜像加速器：

1. **注册并开通阿里云容器镜像服务**
   - 访问：https://cr.console.aliyun.com/
   - 免费开通"容器镜像服务"

2. **获取个人加速地址**
   - 登录后，进入"镜像加速器"
   - 复制你的专属加速地址（格式：`https://xxxxx.mirror.aliyuncs.com`）

3. **更新 Docker 配置**
   
   编辑 `~/.docker/daemon.json`：
   ```bash
   nano ~/.docker/daemon.json
   ```
   
   替换为你的阿里云地址：
   ```json
   {
     "registry-mirrors": [
       "https://xxxxx.mirror.aliyuncs.com"
     ]
   }
   ```

4. **重启 Docker Desktop**

### 方案四：离线导入镜像

如果完全无法联网，可以：

1. **在其他有网络的机器上：**
   ```bash
   docker pull mysql:8.0
   docker save mysql:8.0 -o mysql-8.0.tar
   ```

2. **传输到当前机器后：**
   ```bash
   docker load -i mysql-8.0.tar
   docker images | grep mysql
   ```

3. **然后运行容器：**
   ```bash
   docker run --name mysql-h5 \
     -e MYSQL_ROOT_PASSWORD=root123456 \
     -e MYSQL_DATABASE=h5_db \
     -p 3306:3306 \
     -d mysql:8.0 \
     --character-set-server=utf8mb4 \
     --collation-server=utf8mb4_unicode_ci
   ```

## 快速检查清单

执行以下命令检查当前状态：

```bash
# 1. 检查 DNS 配置
scutil --dns | grep nameserver

# 2. 测试 DNS 解析
nslookup docker.mirrors.ustc.edu.cn 8.8.8.8

# 3. 测试网络连接
ping -c 2 8.8.8.8

# 4. 检查 Docker 配置
cat ~/.docker/daemon.json

# 5. 检查 Docker 状态
docker info | grep -A 5 "Registry Mirrors"
```

## 推荐操作顺序

1. ✅ **首先尝试方案一**（配置 DNS）- 最根本的解决方案
2. ✅ **如果不行，尝试方案二**（手机热点）- 快速临时解决
3. ✅ **长期使用方案三**（阿里云镜像）- 稳定可靠
4. ✅ **最后备选方案四**（离线导入）- 完全离线环境

## 配置 DNS 后的验证

配置 DNS 后，执行：

```bash
# 测试 DNS 解析
nslookup docker.mirrors.ustc.edu.cn

# 如果成功解析，重启 Docker 后测试
docker pull hello-world

# 如果成功，拉取 MySQL
docker pull mysql:8.0
```

## 注意事项

- 配置 DNS 需要管理员权限
- 修改 DNS 后需要刷新缓存
- Docker Desktop 需要完全重启才能应用新配置
- 如果使用公司/学校网络，可能需要联系网络管理员

