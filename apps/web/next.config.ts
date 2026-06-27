import { loadEnvConfig } from "@next/env";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const monorepoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

// Load root `.env` / `.env.local` (`.env.local` wins). Railway injects vars at runtime.
loadEnvConfig(monorepoRoot);

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui", "@repo/shared", "@repo/db"],
  outputFileTracingRoot: monorepoRoot,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "cdn.simpleicons.org", pathname: "/**" },
    ],
  },
  env: {
    NEXT_PUBLIC_BETTER_AUTH_URL:
      process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? process.env.BETTER_AUTH_URL,
  },
  turbopack: {
    root: monorepoRoot,
  },
};

export default nextConfig;
