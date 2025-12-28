# H5 移动端应用项目

基于 Vue 3 + NestJS 的 H5 移动端应用全栈项目。

## 📐 技术栈

### 前端
- Vue 3 + Composition API + TypeScript
- Vite 5.x
- Vant 4（移动端 UI 组件库）
- Pinia（状态管理）
- Vue Router 4
- Axios

### 后端
- NestJS 10.x + TypeScript
- TypeORM（ORM）
- MySQL 8.0
- Redis 7+（ioredis）
- JWT 鉴权
- Swagger API 文档

## 🚀 快速开始

### 环境要求

- Node.js 18.0+ LTS
- MySQL 8.0+
- Redis 7.0+
- pnpm（推荐）或 npm

### 安装依赖

#### 前端

```bash
cd frontend
pnpm install
# 或
npm install
```

#### 后端

```bash
cd backend
pnpm install
# 或
npm install
```

### 配置环境变量

#### 后端环境变量

在 `backend` 目录下创建 `.env` 文件：

```env
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
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

### 启动项目

#### 启动后端

```bash
cd backend
pnpm start:dev
# 或
npm run start:dev
```

后端服务运行在：http://localhost:3000
API 文档：http://localhost:3000/api-docs

#### 启动前端

```bash
cd frontend
pnpm dev
# 或
npm run dev
```

前端服务运行在：http://localhost:5173

## 📁 项目结构

```
yijing/
├── frontend/              # 前端项目
│   ├── src/
│   │   ├── api/          # API 接口封装
│   │   ├── assets/       # 静态资源
│   │   ├── components/   # 公共组件
│   │   ├── router/       # 路由配置
│   │   ├── stores/        # Pinia 状态管理
│   │   ├── types/        # TypeScript 类型定义
│   │   ├── utils/        # 工具函数
│   │   └── views/        # 页面组件
│   └── package.json
│
├── backend/               # 后端项目
│   ├── src/
│   │   ├── common/       # 公共模块
│   │   ├── config/       # 配置文件
│   │   ├── modules/      # 业务模块
│   │   │   ├── auth/     # 认证模块
│   │   │   └── user/     # 用户模块
│   │   └── main.ts       # 应用入口
│   └── package.json
│
└── 可行性方案/           # 技术方案文档
```

## 🔧 开发说明

### 前端开发

- 使用 Vue 3 Composition API + `<script setup>`
- 使用 TypeScript 类型定义
- 使用 Vant 组件库（移动端）
- 使用 Pinia 进行状态管理
- API 调用使用 Axios 封装

### 后端开发

- 使用 NestJS 框架
- 使用 TypeORM 操作数据库
- 使用 ioredis 操作 Redis
- 使用 JWT 进行鉴权
- 使用 class-validator 进行数据验证
- 使用 Swagger 装饰器生成 API 文档

## 📝 注意事项

1. **数据库初始化**：首次运行前需要创建数据库，后端会自动创建表结构（开发环境）
2. **Redis 连接**：确保 Redis 服务已启动
3. **环境变量**：生产环境必须修改 `.env` 中的敏感信息
4. **包管理器**：推荐使用 pnpm，如果使用 npm 需要先修复 npm 缓存权限问题

## 🐛 常见问题

### npm 权限问题

如果遇到 npm 权限问题，运行：

```bash
sudo chown -R $(whoami) ~/.npm
```

### 数据库连接失败

检查：
1. MySQL 服务是否启动
2. 数据库用户和密码是否正确
3. 数据库是否已创建

### Redis 连接失败

检查：
1. Redis 服务是否启动
2. Redis 配置是否正确

## 📚 相关文档

- [技术架构配置](./可行性方案/技术架构配置.md)
- [最终方案](./可行性方案/最终方案.md)
- [可行性分析](./可行性方案/可行性分析.md)

## 📄 License

MIT

