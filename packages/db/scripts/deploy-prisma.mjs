#!/usr/bin/env node
/**
 * Railway deploy helper: run Prisma against process.env.DATABASE_URL only.
 * Does not load local .env files (removes any that leaked into the image).
 */
import { execSync } from "node:child_process";
import { existsSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const repoRoot = join(packageRoot, "../..");

const command = process.argv[2];
if (!command || !["push", "migrate"].includes(command)) {
  console.error("Usage: deploy-prisma.mjs <push|migrate>");
  process.exit(1);
}

function removeEnvFile(path) {
  if (!existsSync(path)) return;
  if (process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID) {
    try {
      unlinkSync(path);
      console.warn(`Removed ${path} (deploy uses Railway process.env only)`);
    } catch {
      // Ignore — file may be read-only or already gone
    }
  }
}

for (const envPath of [
  join(repoRoot, ".env"),
  join(repoRoot, ".env.local"),
  join(packageRoot, ".env"),
  join(packageRoot, "prisma", ".env"),
]) {
  removeEnvFile(envPath);
}

const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) {
  console.error(
    [
      "DATABASE_URL is not set.",
      "",
      "On Railway, add DATABASE_URL to the Web service Variables before deploy:",
      "  Add Variable → Reference → Postgres service → DATABASE_URL",
      "  Example: ${{Postgres.DATABASE_URL}}",
    ].join("\n"),
  );
  process.exit(1);
}

if (/localhost|127\.0\.0\.1/i.test(databaseUrl)) {
  console.error(
    [
      "DATABASE_URL points to localhost, which is unavailable on Railway.",
      "",
      "Remove any manual localhost value and reference Postgres instead:",
      "  Add Variable → Reference → Postgres service → DATABASE_URL",
      "  Example: ${{Postgres.DATABASE_URL}}",
    ].join("\n"),
  );
  process.exit(1);
}

try {
  const url = new URL(databaseUrl);
  console.log(`Using database host: ${url.hostname}:${url.port || "5432"}`);
} catch {
  console.log("Using DATABASE_URL from environment");
}

const prismaBin = join(packageRoot, "node_modules", ".bin", "prisma");
const prismaCmd =
  command === "push"
    ? `"${prismaBin}" db push --skip-generate --schema prisma/schema.prisma`
    : `"${prismaBin}" migrate deploy --schema prisma/schema.prisma`;

execSync(prismaCmd, {
  cwd: packageRoot,
  stdio: "inherit",
  env: process.env,
  shell: true,
});
