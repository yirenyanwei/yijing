#!/bin/bash

# 使用国内镜像安装 Homebrew 和 MySQL 的脚本

echo "🚀 开始使用国内镜像安装 Homebrew 和 MySQL..."

# 步骤 1: 使用中科大镜像安装 Homebrew
echo ""
echo "📦 步骤 1: 安装 Homebrew（使用中科大镜像）"
echo "⚠️  注意：安装过程中需要输入管理员密码"
echo ""
/bin/bash -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/install.sh)"

# 检查安装是否成功
if [ -f "/opt/homebrew/bin/brew" ]; then
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
    echo "✅ Homebrew 安装成功（Apple Silicon）"
elif [ -f "/usr/local/bin/brew" ]; then
    echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
    eval "$(/usr/local/bin/brew shellenv)"
    echo "✅ Homebrew 安装成功（Intel）"
else
    echo "❌ Homebrew 安装失败，请手动执行安装命令"
    exit 1
fi

# 步骤 2: 配置 Homebrew 镜像源
echo ""
echo "📦 步骤 2: 配置 Homebrew 使用国内镜像源"
echo ""

# 替换 brew.git
if [ -d "$(brew --repo)" ]; then
    git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git 2>/dev/null || true
    echo "✅ 已配置 brew.git 镜像"
fi

# 替换 homebrew-core.git
if [ -d "$(brew --repo homebrew/core)" ]; then
    git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git 2>/dev/null || true
    echo "✅ 已配置 homebrew-core.git 镜像"
fi

# 更新 Homebrew
echo ""
echo "🔄 更新 Homebrew..."
brew update

# 步骤 3: 安装 MySQL
echo ""
echo "📦 步骤 3: 安装 MySQL"
echo "这可能需要几分钟时间..."
brew install mysql

if [ $? -eq 0 ]; then
    echo "✅ MySQL 安装成功"
else
    echo "❌ MySQL 安装失败"
    exit 1
fi

# 步骤 4: 启动 MySQL 服务
echo ""
echo "🔧 步骤 4: 启动 MySQL 服务"
brew services start mysql

echo "⏳ 等待 MySQL 启动（15秒）..."
sleep 15

# 检查 MySQL 是否运行
if ps aux | grep -i "[m]ysqld" > /dev/null; then
    echo "✅ MySQL 服务已启动"
else
    echo "⚠️  MySQL 服务可能未完全启动，请稍后重试"
fi

# 步骤 5: 创建数据库
echo ""
echo "📊 步骤 5: 创建数据库 h5_db"
echo ""

# 尝试创建数据库（首次安装可能没有密码）
mysql -u root -e "CREATE DATABASE IF NOT EXISTS h5_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ 数据库 h5_db 创建成功！"
    echo ""
    echo "📋 数据库信息："
    mysql -u root -e "SHOW DATABASES LIKE 'h5_db';" 2>/dev/null
else
    echo "⚠️  数据库创建失败，可能需要设置 MySQL root 密码"
    echo ""
    echo "请手动执行以下命令："
    echo "1. 设置 MySQL root 密码："
    echo "   mysql_secure_installation"
    echo ""
    echo "2. 创建数据库："
    echo "   mysql -u root -p -e \"CREATE DATABASE h5_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\""
fi

echo ""
echo "🎉 安装流程完成！"
echo ""
echo "📝 下一步："
echo "1. 如果数据库创建失败，请手动执行上面的命令"
echo "2. 在 backend 目录创建 .env 文件并配置数据库连接"
echo "3. 启动后端服务进行测试"

