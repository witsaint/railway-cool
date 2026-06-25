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

> **重要**：这是 pnpm workspace 共享 monorepo，两个 Service 的 **Root Directory 必须留空（仓库根 `/`）**，不要设为 `apps/web` 或 `apps/worker`，否则 `pnpm install` 无法解析 workspace 依赖。

> **Railpack 说明**：Railway 默认使用 [Railpack](https://railpack.com) 构建。仓库根目录的 `package.json` 没有 `start` 脚本，Railpack 无法自动推断启动命令。每个 Service 需通过 **Config File Path** 指向各自的 `railway.toml`，并设置 **`RAILPACK_CONFIG_FILE`** 指向对应的 `railpack.json`（见下方表格）。

### 一、创建项目并连接 GitHub

1. 打开 [Railway Dashboard](https://railway.app/dashboard)，点击 **New Project**
2. 选择 **Deploy from GitHub repo**
3. 授权 Railway 访问 GitHub，选择仓库 **witsaint/railway-cool**，分支 **main**
4. Railway 可能自动创建一个 Service，可保留或删除后手动重建

### 二、PostgreSQL（已有实例）

若项目中已有 Postgres 插件（例如 `reseau.proxy.rlwy.net:46307`）：

1. 在项目画布中点击 **PostgreSQL** 服务
2. 进入 **Variables** 或 **Connect**，复制 `DATABASE_URL`（形如 `postgresql://postgres:xxx@reseau.proxy.rlwy.net:46307/railway`）
3. 在 Web / Worker 服务中通过 **Add Variable → Reference** 引用 Postgres 的 `DATABASE_URL`（推荐），或手动粘贴同一值

引用语法示例：`${{Postgres.DATABASE_URL}}`（服务名以你项目中的 Postgres 服务名为准）

### 三、Web 服务配置

1. 在同一项目中点击 **New Service → GitHub Repo**，再次选择 **witsaint/railway-cool**
2. 进入 Web 服务 **Settings**：

| 设置项 | 值 |
|--------|-----|
| **Root Directory** | 留空（`/`） |
| **Config File Path** | `/apps/web/railway.toml` |
| **Watch Paths** | `/apps/web/**`、`/packages/**`（已在 `railway.toml` 中配置，可在 UI 核对） |

在 **Variables** 中新增（Railpack 从仓库根构建，需显式指定配置文件路径）：

| 变量 | 值 |
|------|-----|
| `RAILPACK_CONFIG_FILE` | `apps/web/railpack.json` |

3. **Build Command**（由 `apps/web/railway.toml` 提供，可在 Settings → Deploy 核对）：

```bash
pnpm install --frozen-lockfile && pnpm db:generate && pnpm --filter @repo/web build
```

4. **Pre-deploy Command**（每次部署前同步 schema）：

```bash
pnpm db:push:deploy
```

5. **Start Command**：

```bash
pnpm --filter @repo/web start
```

6. **Health Check Path**：`/api/health`

7. **Networking**：Settings → Networking → **Generate Domain**，记下域名，例如 `https://web-production-xxxx.up.railway.app`

8. 设置环境变量（见下方表格）

### 四、Worker 服务配置

1. 点击 **New Service → GitHub Repo**，选择同一仓库
2. 进入 Worker 服务 **Settings**：

| 设置项 | 值 |
|--------|-----|
| **Root Directory** | 留空（`/`） |
| **Config File Path** | `/apps/worker/railway.toml` |
| **Watch Paths** | `/apps/worker/**`、`/packages/**` |

在 **Variables** 中新增：

| 变量 | 值 |
|------|-----|
| `RAILPACK_CONFIG_FILE` | `apps/worker/railpack.json` |

3. **Build Command**：

```bash
pnpm install --frozen-lockfile && pnpm db:generate && pnpm --filter @repo/worker build
```

4. **Start Command**：

```bash
pnpm --filter @repo/worker start
```

5. Worker 无需公网域名；共享 Web 服务同一 `DATABASE_URL`

6. 设置环境变量（见下方表格）

### 五、环境变量

#### Web 服务

| 变量 | 必填 | 值 / 说明 |
|------|------|-----------|
| `DATABASE_URL` | 是 | 引用 Postgres：`${{Postgres.DATABASE_URL}}` |
| `BETTER_AUTH_SECRET` | 是 | 至少 32 字符随机字符串（`openssl rand -base64 32`） |
| `BETTER_AUTH_URL` | 是 | Web 公网 URL，见下方占位符 |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | 是 | 与 `BETTER_AUTH_URL` 完全相同 |
| `GITHUB_CLIENT_ID` | 是 | GitHub OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | 是 | GitHub OAuth App Client Secret |
| `NODE_ENV` | 否 | `production`（Railway 通常自动设置） |
| `RAILPACK_CONFIG_FILE` | 是 | `apps/web/railpack.json`（见第三节） |

#### Worker 服务

| 变量 | 必填 | 值 / 说明 |
|------|------|-----------|
| `DATABASE_URL` | 是 | 与 Web 相同，引用 Postgres |
| `WORKER_POLL_INTERVAL_MS` | 否 | 默认 `5000` |
| `NODE_ENV` | 否 | `production` |
| `RAILPACK_CONFIG_FILE` | 是 | `apps/worker/railpack.json`（见第四节） |

**`BETTER_AUTH_URL` 占位符模式**（生成 Railway 域名后替换 `xxxx`）：

```
https://web-production-xxxx.up.railway.app
```

若使用自定义域名：

```
https://your-domain.com
```

`NEXT_PUBLIC_BETTER_AUTH_URL` 必须与 `BETTER_AUTH_URL` 一致（含 `https://`，无尾部斜杠）。

### 六、GitHub OAuth 生产回调

1. 打开 [GitHub Developer Settings → OAuth Apps](https://github.com/settings/developers)
2. 编辑你的 OAuth App：
   - **Homepage URL**：`https://web-production-xxxx.up.railway.app`（你的 Web 域名）
   - **Authorization callback URL**：`https://web-production-xxxx.up.railway.app/api/auth/callback/github`
3. 保存后无需改代码，重启 Web 服务即可

### 七、数据库迁移

本仓库当前使用 `db:push`（无 Prisma migrations 目录）：

- **自动**：Web 服务 `preDeployCommand` 会在每次部署前执行 `pnpm db:push:deploy`
- **手动**（可选）：Railway Web 服务 → **Settings → Deploy → One-off command** 或 Shell：

```bash
pnpm db:push:deploy
```

若后续改用 migrations，将 `preDeployCommand` 改为：

```bash
pnpm db:migrate:deploy
```

并在本地执行 `pnpm db:migrate` 生成迁移文件后推送到 GitHub。

### 八、触发部署

1. 两个 Service 均连接同一 GitHub 仓库后，推送 `main` 分支会自动触发对应 Watch Paths 内的变更
2. 首次配置完成后，可在各 Service 点击 **Deploy → Redeploy** 手动触发
3. Web 部署成功后访问 `https://<your-domain>/api/health`，应返回 `{"status":"ok","service":"web",...}`

### 九、Railway CLI（可选）

```bash
# 安装
npm i -g @railway/cli

# 登录
railway login

# 链接项目（在仓库根目录）
railway link

# 对 Web 服务一次性执行 db push
railway run --service web pnpm db:push:deploy
```

CLI 未安装或未登录时，按上文 Dashboard 步骤即可完成部署。

### 十、故障排查：No start command detected

若构建日志出现：

```text
✖ No start command detected. Specify a start command: https://railpack.com/config/file
```

请逐项核对：

1. **Config File Path** 是否分别为 `/apps/web/railway.toml` 与 `/apps/worker/railway.toml`
2. **Root Directory** 是否留空（不要设为 `apps/web` 或 `apps/worker`）
3. 各 Service 是否设置了 **`RAILPACK_CONFIG_FILE`**（Web：`apps/web/railpack.json`；Worker：`apps/worker/railpack.json`）
4. Settings → Deploy → **Builder** 是否为 **Railpack**（`railway.toml` 中 `builder = "RAILPACK"`）
5. 若仍失败，可在 Variables 中临时添加 **`RAILPACK_START_CMD`** 覆盖启动命令（Web：`pnpm --filter @repo/web start`；Worker：`pnpm --filter @repo/worker start`），确认命令可用后再依赖 `railpack.json`

## 技术栈

- **Web**：Next.js 16、HeroUI 3、Tailwind CSS 4、Better Auth
- **Worker**：Node.js + TypeScript
- **数据库**：PostgreSQL + Prisma
- **构建**：pnpm workspaces + Turborepo
