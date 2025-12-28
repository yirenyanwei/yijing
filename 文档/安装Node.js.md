# 使用 nvm 安装最新稳定版 Node.js

## 📋 当前状态

- **nvm 版本**：0.39.0 ✅ 已安装
- **当前 Node.js 版本**：v16.19.1
- **目标版本**：Node.js 20.x LTS（最新稳定版）

## 🚀 安装步骤

### 方法一：安装最新的 LTS 版本（推荐）

在终端中运行以下命令：

```bash
# 加载 nvm
source ~/.nvm/nvm.sh

# 安装最新的 LTS 版本
nvm install --lts

# 或者直接安装 Node.js 20（当前最新的 LTS）
nvm install 20

# 设置为默认版本
nvm alias default 20

# 使用新版本
nvm use 20

# 验证安装
node --version
npm --version
```

### 方法二：安装特定版本

如果你想安装最新的 Node.js 22：

```bash
source ~/.nvm/nvm.sh
nvm install 22
nvm alias default 22
nvm use 22
node --version
```

### 方法三：查看所有可用版本

```bash
source ~/.nvm/nvm.sh

# 查看所有 LTS 版本
nvm ls-remote --lts

# 查看所有版本（包括非 LTS）
nvm ls-remote
```

## ✅ 验证安装

安装完成后，运行以下命令验证：

```bash
source ~/.nvm/nvm.sh
node --version  # 应该显示 v20.x.x 或更高版本
npm --version   # 应该显示对应的 npm 版本
nvm current     # 显示当前使用的 Node.js 版本
```

## 🔧 常用 nvm 命令

```bash
# 查看已安装的版本
nvm list
nvm ls

# 切换版本
nvm use 20
nvm use 16

# 设置默认版本
nvm alias default 20

# 查看当前使用的版本
nvm current

# 卸载某个版本
nvm uninstall 16.19.1

# 查看所有可用的 LTS 版本
nvm ls-remote --lts
```

## 📝 注意事项

1. **每次新开终端都需要加载 nvm**：
   ```bash
   source ~/.nvm/nvm.sh
   ```
   
   或者将以下内容添加到 `~/.zshrc` 或 `~/.bash_profile`：
   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
   ```

2. **推荐使用 Node.js 20 LTS**：
   - 长期支持版本
   - 稳定可靠
   - 兼容性好

3. **安装后需要重新安装项目依赖**：
   ```bash
   # 前端
   cd frontend
   rm -rf node_modules package-lock.json
   pnpm install  # 或 npm install
   
   # 后端
   cd backend
   rm -rf node_modules package-lock.json
   pnpm install  # 或 npm install
   ```

## 🐛 常见问题

### 问题 1：nvm 命令找不到

**解决方案**：
```bash
# 检查 nvm 是否已安装
ls -la ~/.nvm

# 如果没有，重新安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### 问题 2：安装速度慢

**解决方案**：
- 使用国内镜像（如果在中国）
- 或者使用代理

### 问题 3：权限问题

**解决方案**：
```bash
# 确保 nvm 目录权限正确
sudo chown -R $(whoami) ~/.nvm
```

## 🎯 快速安装脚本

你也可以直接运行以下命令（一行命令）：

```bash
source ~/.nvm/nvm.sh && nvm install 20 && nvm alias default 20 && nvm use 20 && node --version
```

## 📚 参考资源

- [nvm 官方文档](https://github.com/nvm-sh/nvm)
- [Node.js 官方下载页面](https://nodejs.org/)
- [Node.js LTS 版本列表](https://nodejs.org/en/about/releases/)

