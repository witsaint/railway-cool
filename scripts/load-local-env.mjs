/**
 * Load monorepo root env files for local development.
 * Precedence (later wins): .env → .env.local
 * On Railway, process.env is already set — missing files are ignored.
 */
import { config } from "dotenv";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

export function loadLocalEnv() {
  for (const file of [".env", ".env.local"]) {
    const path = join(repoRoot, file);
    if (existsSync(path)) {
      config({ path, override: true });
    }
  }
}
