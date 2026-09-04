#!/usr/bin/env bash
# ============================================
#  阀门销售官网 — 一键启动脚本
#  用法: ./start.sh
# ============================================

set -e
cd "$(dirname "$0")"

echo "🚀 阀门销售官网 — 启动中..."
echo ""

# 1. 安装依赖
if [ ! -d "node_modules" ]; then
  echo "📦 首次运行，安装依赖..."
  npm install
  echo ""
fi

# 2. 生成 Prisma Client
echo "🔧 生成 Prisma Client..."
npx prisma generate
echo ""

# 3. 初始化数据库（首次或迁移）
if [ ! -f "prisma/dev.db" ]; then
  echo "🗄️  初始化数据库..."
  npx prisma migrate dev --name init --skip-seed
  echo ""
fi

# 4. 填充种子数据
echo "🌱 填充示例数据..."
npm run seed
echo ""

# 5. 启动开发服务器
echo "✅ 准备就绪！启动开发服务器..."
echo "   访问 http://localhost:3000"
echo ""
npm run dev
