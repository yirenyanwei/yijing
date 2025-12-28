#!/bin/bash

# MySQL 安装和数据库创建脚本

echo "🚀 开始安装 MySQL 和创建数据库..."

# 检查 Homebrew 是否安装
if ! command -v brew &> /dev/null; then
    echo "📦 检测到 Homebrew 未安装，开始安装 Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # 添加 Homebrew 到 PATH（根据架构）
    if [ -f "/opt/homebrew/bin/brew" ]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    elif [ -f "/usr/local/bin/brew" ]; then
        echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/usr/local/bin/brew shellenv)"
    fi
else
    echo "✅ Homebrew 已安装"
fi

# 检查 MySQL 是否安装
if ! command -v mysql &> /dev/null; then
    echo "📦 开始安装 MySQL..."
    brew install mysql
    
    echo "🔧 启动 MySQL 服务..."
    brew services start mysql
    
    echo "⏳ 等待 MySQL 启动（10秒）..."
    sleep 10
    
    echo "🔐 设置 MySQL root 密码..."
    echo "请设置一个安全的 root 密码（建议使用强密码）"
    mysql_secure_installation
else
    echo "✅ MySQL 已安装"
    
    # 检查 MySQL 服务是否运行
    if ! brew services list | grep -q "mysql.*started"; then
        echo "🔧 启动 MySQL 服务..."
        brew services start mysql
        echo "⏳ 等待 MySQL 启动（10秒）..."
        sleep 10
    else
        echo "✅ MySQL 服务正在运行"
    fi
fi

# 创建数据库
echo "📊 创建数据库 h5_db..."
mysql -u root -p <<EOF
CREATE DATABASE IF NOT EXISTS h5_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES LIKE 'h5_db';
EOF

if [ $? -eq 0 ]; then
    echo "✅ 数据库 h5_db 创建成功！"
    echo ""
    echo "📋 数据库信息："
    echo "   数据库名: h5_db"
    echo "   字符集: utf8mb4"
    echo "   排序规则: utf8mb4_unicode_ci"
    echo ""
    echo "🎉 安装完成！"
else
    echo "❌ 数据库创建失败，请检查 MySQL 连接和权限"
    exit 1
fi

