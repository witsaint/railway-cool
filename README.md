# Railway Monorepo

基于 pnpm workspaces + Turborepo 的全栈 monorepo，包含 Next.js Web 应用与后台 Worker，使用 Prisma + PostgreSQL 与 Better Auth（GitHub OAuth）。

## 项目结构

```
railway/
├── apps/web/          # Next.js 16 + HeroUI + Tailwind v4 + Better Auth
├── apps/worker/       # Node.js TypeScript 后台 Worker
├── packages/db/       # Prisma 数据库层
├── packages/ui/       # HeroUI 组件封装
├── packages/shared/   # 共享工具
└── packages/tsconfig/ # 共享 TypeScript 配置
```

## 环境要求

- Node.js 24（见 `.nvmrc`）
- pnpm 9+
- Docker（本地 PostgreSQL）

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 填入以下变量（详见下方清单）。

### 3. 启动本地数据库

```bash
docker compose up -d
```

### 4. 初始化数据库

```bash
pnpm db:push
pnpm db:generate
```

### 5. 启动开发服务

```bash
# 终端 1：Web
pnpm --filter @repo/web dev

# 终端 2：Worker
pnpm --filter @repo/worker dev
```

访问 http://localhost:3000

## 环境变量清单

| 变量 | 必填 | 说明 |
|------|------|------|
| `DATABASE_URL` | 是 | PostgreSQL 连接字符串 |
| `BETTER_AUTH_SECRET` | 是 | Better Auth 密钥（至少 32 字符随机字符串） |
| `BETTER_AUTH_URL` | 是 | Web 应用公网 URL（本地：`http://localhost:3000`） |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | 是 | 客户端使用的 Auth URL（通常与 `BETTER_AUTH_URL` 相同） |
| `GITHUB_CLIENT_ID` | 是 | GitHub OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | 是 | GitHub OAuth App Client Secret |
| `WORKER_POLL_INTERVAL_MS` | 否 | Worker 轮询间隔（毫秒，默认 5000） |

## GitHub OAuth 配置

1. 打开 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 **New OAuth App**
3. 填写：
   - **Application name**：任意名称
   - **Homepage URL**：`http://localhost:3000`（生产环境改为 Railway 域名）
   - **Authorization callback URL**：`http://localhost:3000/api/auth/callback/github`
4. 创建后将 **Client ID** 和 **Client Secret** 写入 `.env`
5. 部署到 Railway 后，将 callback URL 更新为 `https://<your-domain>/api/auth/callback/github`

## 常用命令

```bash
pnpm build              # 构建所有包
pnpm dev                # 并行启动 dev（turbo）
pnpm db:generate        # 生成 Prisma Client
pnpm db:push            # 推送 schema 到数据库
pnpm db:migrate         # 运行迁移
pnpm db:studio          # 打开 Prisma Studio
```

## Railway 部署

GitHub 仓库：[https://github.com/witsaint/railway-cool](https://github.com/witsaint/railway-cool)

### 从 GitHub 部署

1. 将本仓库推送到 GitHub（若尚未推送）：
   ```bash
   git remote add origin https://github.com/witsaint/railway-cool.git  # 若尚未添加
   git push -u origin main
   ```
2. 登录 [Railway](https://railway.app)，点击 **New Project** → **Deploy from GitHub repo**
3. 选择仓库 **witsaint/railway-cool**，授权 Railway 访问
4. 按下方 Web / Worker 服务说明分别配置两个 Service

本仓库包含两个独立服务，各自有 `railway.toml`：

### Web 服务（`apps/web`）

1. 在 Railway 项目中连接 GitHub 仓库 **witsaint/railway-cool**（见上方「从 GitHub 部署」）
2. 添加 **PostgreSQL** 插件，复制 `DATABASE_URL`
3. 新建 Service，Root Directory 设为 `apps/web`（或在 monorepo 根目录部署并指定 build/start 命令）
4. 设置环境变量：
   - `DATABASE_URL`（来自 PostgreSQL 插件）
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL`（Railway 分配的 Web 域名，如 `https://xxx.up.railway.app`）
   - `NEXT_PUBLIC_BETTER_AUTH_URL`（同上）
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
5. Build Command（如使用根目录）：`pnpm install && pnpm db:generate && pnpm --filter @repo/web build`
6. Start Command：`pnpm --filter @repo/web start`
7. 健康检查路径：`/api/health`

### Worker 服务（`apps/worker`）

1. 在同一 Railway 项目中新建第二个 Service
2. Root Directory 设为 `apps/worker`
3. 共享同一 `DATABASE_URL`
4. 可选设置 `WORKER_POLL_INTERVAL_MS`
5. Build Command：`pnpm install && pnpm db:generate && pnpm --filter @repo/worker build`
6. Start Command：`pnpm --filter @repo/worker start`

### Monorepo 部署提示

- 在 Railway 项目 Settings 中将 **Root Directory** 留空（仓库根目录），使用各 `railway.toml` 中的 build/start 命令
- 首次部署前运行 `pnpm db:push` 或通过 CI 执行迁移
- 更新 GitHub OAuth callback URL 为生产域名

## 技术栈

- **Web**：Next.js 16、HeroUI 3、Tailwind CSS 4、Better Auth
- **Worker**：Node.js + TypeScript
- **数据库**：PostgreSQL + Prisma
- **构建**：pnpm workspaces + Turborepo
