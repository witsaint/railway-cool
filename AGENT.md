# AGENT.md — AI 代理开发指南

本文档供 Cursor / AI 代理在本 monorepo 中协作开发时参考。

> **语言约定**：项目文档与内部页面可使用中文；**Landing Page（首页营销页）UI 文案使用英文**，见 [design.md](./design.md)。

---

## 项目目的

这是一个基于 **pnpm workspaces + Turborepo** 的全栈 monorepo，面向 **R&D 与 Product 团队** 的内部开发平台：

| 应用/包 | 说明 |
|---------|------|
| `apps/web` | Next.js 16 Web 应用，HeroUI + Tailwind 4 + Better Auth |
| `apps/worker` | Node.js TypeScript 后台 Worker（轮询任务） |
| `packages/db` | Prisma + PostgreSQL 数据层 |
| `packages/ui` | HeroUI 组件封装（`PageShell`、`PrimaryButton` 等） |
| `packages/shared` | 共享工具函数 |
| `packages/tsconfig` | 共享 TypeScript 配置 |

部署目标：**Railway**（Railpack 构建，双 Service：Web + Worker）。

---

## 目录结构

```
railway/
├── apps/
│   ├── web/                 # Next.js App Router
│   │   ├── src/app/         # 路由、layout、globals.css
│   │   ├── src/components/  # Web 专用组件
│   │   └── railway.toml     # Railway Web 服务配置
│   └── worker/              # 后台 Worker
├── packages/
│   ├── db/                  # Prisma schema + client
│   ├── ui/                  # @repo/ui
│   ├── shared/              # @repo/shared
│   └── tsconfig/            # @repo/tsconfig
├── design.md                # 设计系统（UI 必读）
├── AGENT.md                 # 本文件
├── railpack.json            # Railway Railpack 根配置
└── scripts/railway-start.mjs
```

---

## 本地运行

### 环境要求

- Node.js ≥ 24（见 `.nvmrc`）
- pnpm 9+
- Docker（本地 PostgreSQL）

### 步骤

```bash
pnpm install
cp .env.local.example .env.local   # 编辑填入密钥
docker compose up -d
pnpm db:push && pnpm db:generate
pnpm dev                           # 或 pnpm --filter @repo/web dev
```

访问 http://localhost:3000

环境变量从 **monorepo 根目录** 加载（`apps/web/next.config.ts` 使用 `loadEnvConfig`）。本地优先使用 `.env.local`（已 gitignore）。

---

## 设计系统

所有 **营销页 / Landing Page / 对外 UI** 必须遵循 [design.md](./design.md)：

- 风格：**Minimalismo Fotográfico Elegante**（优雅极简、浅色-only）
- 字体：Lora（标题）+ Helvetica Neue（正文）
- 设计 token 定义在 `apps/web/src/app/globals.css`
- 禁止 dark tech 主题用于首页；禁止 emoji 图标

内部页面（dashboard、login）可沿用 HeroUI 默认组件，但新 UI 应倾向 design.md 的浅色极简风格。

---

## 编码规范

### 包引用

- 使用 workspace 包名：`@repo/ui`、`@repo/db`、`@repo/shared`、`@repo/tsconfig`
- Web 内路径别名：`@/` → `apps/web/src/`

### 技术栈约定

| 领域 | 选择 |
|------|------|
| 框架 | Next.js App Router（`apps/web/src/app/`） |
| 样式 | Tailwind CSS 4 + `@theme` + CSS 变量 |
| 组件库 | HeroUI 3（`@heroui/react`），营销页需自定义样式 |
| 认证 | Better Auth + GitHub OAuth |
| 数据库 | Prisma（`packages/db`） |

### 组件约定

- Server Component 为默认；仅 hover/动画/客户端交互时使用 `"use client"`
- 交互元素加 `cursor-pointer transition-all`
- Landing 组件放在 `apps/web/src/components/landing/`

### 类型与 Lint

```bash
pnpm lint          # turbo lint（含 tsc --noEmit）
pnpm build         # 构建全部包
```

---

## 认证与环境变量

### 本地（`.env.local`）

| 变量 | 说明 |
|------|------|
| `DATABASE_URL` | 本地 Postgres |
| `BETTER_AUTH_SECRET` | ≥32 字符随机串 |
| `BETTER_AUTH_URL` | `http://localhost:3000` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | 同上 |
| `GITHUB_CLIENT_ID` | **本地** OAuth App |
| `GITHUB_CLIENT_SECRET` | **本地** OAuth App |

### 生产（Railway Variables）

同上变量，但：

- `BETTER_AUTH_URL` / `NEXT_PUBLIC_BETTER_AUTH_URL` 为 Railway 公网域名
- `GITHUB_*` 使用 **生产** OAuth App（与本地分开）

### 双 OAuth App

GitHub OAuth App 只允许一个 callback URL，因此：

1. **本地 App**：callback = `http://localhost:3000/api/auth/callback/github`
2. **生产 App**：callback = `https://<domain>/api/auth/callback/github`

开发时务必用 `localhost` 而非 `127.0.0.1`（middleware 会自动重定向，避免 `state_mismatch`）。

---

## 部署（Railway）

- 仓库：[witsaint/railway-cool](https://github.com/witsaint/railway-cool)
- **Root Directory 留空**（仓库根 `/`），否则 workspace 依赖无法解析
- Web：`Config File Path` = `/apps/web/railway.toml`
- Worker：`Config File Path` = `/apps/worker/railway.toml`
- 构建：Railpack（根目录 `railpack.json` + `scripts/railway-start.mjs`）
- Web pre-deploy：`pnpm db:push:deploy`
- Health check：`/api/health`

---

## 代理行为准则

### 应该做

- 修改 UI 前先读 [design.md](./design.md)
- 保持改动最小、符合现有 `@repo/*` 模式
- 本地验证：`pnpm build`
- 环境变量写入 `.env.local.example` 文档，不提交真实密钥
- Landing Page 文案用英文；内部工具页可用中文
- 使用 HeroUI Button 时覆盖样式以匹配设计系统

### 不应该做

- **不要提交** `.env`、`.env.local` 或任何密钥
- 不要在 marketing 页面引入 dark mode / 深色 tech 主题
- 不要删除或绕过 Better Auth 会话检查（首页对已登录用户 redirect `/dashboard`）
- 不要将 Railway Root Directory 设为 `apps/web`
- 不要 force push `main`
- 不要未经用户明确要求就 commit / push
- 不要使用 emoji 作为 UI 图标

---

## 常用命令

```bash
pnpm dev                              # 并行 dev
pnpm --filter @repo/web dev           # 仅 Web
pnpm --filter @repo/worker dev        # 仅 Worker
pnpm build                            # 全量构建
pnpm db:generate                      # Prisma generate
pnpm db:push                          # 推送 schema
pnpm db:studio                        # Prisma Studio
```

---

## 路由概览

| 路径 | 说明 |
|------|------|
| `/` | Landing Page（未登录）；已登录 → `/dashboard` |
| `/login` | GitHub OAuth 登录 |
| `/dashboard` | 登录后控制台 |
| `/api/auth/[...all]` | Better Auth API |
| `/api/health` | 健康检查 |
