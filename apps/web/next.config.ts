import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const monorepoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui", "@repo/shared", "@repo/db"],
  outputFileTracingRoot: monorepoRoot,
  env: {
    NEXT_PUBLIC_BETTER_AUTH_URL:
      process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? process.env.BETTER_AUTH_URL,
  },
  turbopack: {
    root: monorepoRoot,
  },
};

export default nextConfig;
