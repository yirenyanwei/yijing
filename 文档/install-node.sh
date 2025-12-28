#!/bin/bash

# 使用 nvm 安装最新稳定版 Node.js 的脚本

echo "🚀 开始安装最新稳定版 Node.js..."

# 加载 nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 检查 nvm 是否可用
if ! command -v nvm &> /dev/null; then
    echo "❌ nvm 未找到，请先安装 nvm"
    echo "安装命令："
    echo "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    exit 1
fi

echo "✅ nvm 已安装，版本：$(nvm --version)"
echo "📋 当前 Node.js 版本：$(node --version 2>/dev/null || echo '未安装')"

# 安装最新的 LTS 版本
echo "📥 正在安装 Node.js 20 LTS..."
nvm install 20

if [ $? -eq 0 ]; then
    echo "✅ Node.js 20 安装成功"
    
    # 设置为默认版本
    echo "⚙️  设置 Node.js 20 为默认版本..."
    nvm alias default 20
    nvm use 20
    
    # 验证安装
    echo ""
    echo "✅ 安装完成！"
    echo "📊 版本信息："
    echo "   Node.js: $(node --version)"
    echo "   npm: $(npm --version)"
    echo "   当前版本: $(nvm current)"
    echo ""
    echo "🎉 现在可以使用 Node.js 20 了！"
else
    echo "❌ 安装失败，请检查网络连接或手动安装"
    exit 1
fi

