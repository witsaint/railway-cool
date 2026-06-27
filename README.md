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

### 2. 配置环境变量（本地）

本地开发使用根目录 **`.env.local`**（已 gitignore，不会提交）：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local` 填入本地密钥与 `http://localhost:3000` 相关 URL。

若你已有根目录 `.env`，可迁移本地变量：

```bash
cp .env .env.local
# 按需编辑 .env.local；存在时 `.env.local` 会覆盖 `.env` 中的同名变量
```

**生产环境**（Railway）在 Web / Worker 服务的 **Variables** 中配置，不使用 `.env` / `.env.local` 文件。

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

### 本地（`.env.local`）

| 变量 | 必填 | 说明 |
|------|------|------|
| `DATABASE_URL` | 是 | 本地 Docker Postgres 或 Railway 远程代理 URL |
| `BETTER_AUTH_SECRET` | 是 | Better Auth 密钥（至少 32 字符随机字符串） |
| `BETTER_AUTH_URL` | 是 | `http://localhost:3000`（无尾部斜杠） |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | 是 | 与 `BETTER_AUTH_URL` 相同 |
| `GITHUB_CLIENT_ID` | 是 | **本地开发** GitHub OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | 是 | **本地开发** GitHub OAuth App Client Secret |
| `WORKER_POLL_INTERVAL_MS` | 否 | Worker 轮询间隔（毫秒，默认 5000） |

### 生产（Railway Variables）

| 变量 | 服务 | 说明 |
|------|------|------|
| `DATABASE_URL` | Web、Worker | 引用 Postgres：`${{Postgres.DATABASE_URL}}` |
| `BETTER_AUTH_SECRET` | Web | 生产用随机密钥（与本地可不同） |
| `BETTER_AUTH_URL` | Web | `https://<your-railway-domain>` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Web | 与 `BETTER_AUTH_URL` 相同 |
| `GITHUB_CLIENT_ID` | Web | **生产** GitHub OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | Web | **生产** GitHub OAuth App Client Secret |
| `WORKER_POLL_INTERVAL_MS` | Worker | 可选，默认 `5000` |

## GitHub OAuth 配置（双 App：本地 + 生产）

建议创建 **两个** GitHub OAuth App，避免本地与生产共用回调 URL：

### 本地开发 App（凭证写入 `.env.local`）

1. 打开 [GitHub Developer Settings](https://github.com/settings/developers) → **New OAuth App**
2. 填写：
   - **Application name**：例如 `railway-dev`
   - **Homepage URL**：`http://localhost:3000`
   - **Authorization callback URL**：`http://localhost:3000/api/auth/callback/github`
3. 将 **Client ID** 和 **Client Secret** 写入根目录 `.env.local`

### 生产 App（凭证写入 Railway Variables）

1. 再创建一个 OAuth App（或编辑现有生产 App）
2. 填写：
   - **Homepage URL**：`https://<your-railway-domain>`
   - **Authorization callback URL**：`https://<your-railway-domain>/api/auth/callback/github`
3. 将 **Client ID** 和 **Client Secret** 写入 Railway Web 服务 **Variables**（不要写入 `.env.local`）

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

> **Railpack 说明**：Railway 默认使用 [Railpack](https://railpack.com) 构建。仓库根目录已提供 `railpack.json` 与 `scripts/railway-start.mjs`：构建阶段 Railpack 会自动读取根目录配置；运行时按 Railway 注入的 `RAILWAY_SERVICE_NAME` 选择 Web 或 Worker 启动命令（服务名建议包含 `web` / `worker`）。各 Service 的 **Config File Path** 仍指向各自的 `railway.toml`（见下方表格）。`railway.toml` **不能**声明 `RAILPACK_*` 环境变量（[官方 schema](https://railway.com/railway.schema.json) 仅支持 build/deploy 字段），因此无需在 Dashboard 手动设置 `RAILPACK_CONFIG_FILE`。

### 一、创建项目并连接 GitHub

1. 打开 [Railway Dashboard](https://railway.app/dashboard)，点击 **New Project**
2. 选择 **Deploy from GitHub repo**
3. 授权 Railway 访问 GitHub，选择仓库 **witsaint/railway-cool**，分支 **main**
4. Railway 可能自动创建一个 Service，可保留或删除后手动重建

### 二、PostgreSQL（已有实例）

> **部署前必做**：在 Web 服务 **Variables** 中设置 `DATABASE_URL`（引用 Postgres），**然后再触发首次部署**。`preDeployCommand` 会在部署阶段执行 `pnpm db:push:deploy`，此时必须能读到 Railway 注入的 `DATABASE_URL`；未设置时会失败，若误用本地 `.env.example` 中的 localhost 会出现 P1001。

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

3. **Build Command**（由 `apps/web/railway.toml` 提供，可在 Settings → Deploy 核对）：

```bash
pnpm install --frozen-lockfile && pnpm db:generate && pnpm --filter @repo/web build
```

4. **Pre-deploy Command**（每次部署前同步 schema；依赖 Web 服务已配置 `DATABASE_URL` 引用）：

```bash
pnpm db:push:deploy
```

该命令**不会**读取本地 `.env` 文件，仅使用 Railway 环境变量中的 `DATABASE_URL`。

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

#### Worker 服务

| 变量 | 必填 | 值 / 说明 |
|------|------|-----------|
| `DATABASE_URL` | 是 | 与 Web 相同，引用 Postgres |
| `WORKER_POLL_INTERVAL_MS` | 否 | 默认 `5000` |
| `NODE_ENV` | 否 | `production` |

**`BETTER_AUTH_URL` 占位符模式**（生成 Railway 域名后替换 `xxxx`）：

```
https://web-production-xxxx.up.railway.app
```

若使用自定义域名：

```
https://your-domain.com
```

`NEXT_PUBLIC_BETTER_AUTH_URL` 必须与 `BETTER_AUTH_URL` 一致（含 `https://`，无尾部斜杠）。

> **Auth 构建说明**：`NEXT_PUBLIC_BETTER_AUTH_URL` 会在 `pnpm build` 时内联进客户端 bundle。Railway Web 服务必须在**首次构建前**设置该变量；若只设置了 `BETTER_AUTH_URL`，`next.config.ts` 会在构建时将其同步到客户端。部署后若仍指向 localhost，请确认 Variables 已保存并 **Redeploy**（重新构建）。

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
3. 仓库根目录是否存在 **`railpack.json`** 与 **`scripts/railway-start.mjs`**，且根 `package.json` 含 **`start`** 脚本
4. Web / Worker 的 **Service 名称** 是否分别包含 `web` / `worker`（用于 `RAILWAY_SERVICE_NAME` 路由；也可在 Variables 中设置 **`RAILPACK_START_CMD`** 强制覆盖）
5. Settings → Deploy → **Builder** 是否为 **Railpack**（`railway.toml` 中 `builder = "RAILPACK"`）
6. 可选：仍可通过 **`RAILPACK_CONFIG_FILE`**（`apps/web/railpack.json` 或 `apps/worker/railpack.json`）覆盖 per-service Railpack 配置

### 十一、故障排查：P1001 Can't reach database at localhost:5432

若 pre-deploy 或 `db:push:deploy` 日志出现：

```text
Error: P1001: Can't reach database server at `localhost:5432`
```

说明 Prisma 使用了 **localhost** 连接串，而非 Railway Postgres。常见原因与处理：

1. **Web 服务未设置 `DATABASE_URL`**  
   进入 Web 服务 → **Variables** → **Add Variable** → **Reference** → 选择 Postgres 服务 → 变量名 `DATABASE_URL`  
   引用值示例：`${{Postgres.DATABASE_URL}}`（`Postgres` 改为你画布上的 Postgres 服务名）

2. **手动填了 localhost**  
   删除 Variables 里指向 `localhost:5432` 的 `DATABASE_URL`，改用上一步的 Reference。

3. **本地 `.env` 被打包进镜像**（少见）  
   仓库已提供 `.dockerignore` 排除 `.env`；部署脚本也会在 pre-deploy 时忽略/移除镜像内的 `.env`，以 **Railway 环境变量为准**。

4. **确认 pre-deploy 能读到变量**  
   `preDeployCommand` 在 **Deploy** 阶段运行，可访问该服务的 Variables（含 Reference）。设置好 `DATABASE_URL` 后 **Redeploy** 即可。

本地开发使用根目录 **`.env.local`**（`cp .env.local.example .env.local`）；`apps/web` 通过 `next.config.ts` 从 monorepo 根加载，`packages/db` 与 Worker 通过 `scripts/load-local-env.mjs` 加载。若仍保留 `.env`，`.env.local` 会覆盖同名变量。**不要提交** `.env` / `.env.local`。

## 技术栈

- **Web**：Next.js 16、HeroUI 3、Tailwind CSS 4、Better Auth
- **Worker**：Node.js + TypeScript
- **数据库**：PostgreSQL + Prisma
- **构建**：pnpm workspaces + Turborepo
