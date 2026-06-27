#!/usr/bin/env node
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadLocalEnv } from "../../../scripts/load-local-env.mjs";

loadLocalEnv();

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const prismaBin = join(packageRoot, "node_modules", ".bin", "prisma");
const prismaArgs = process.argv.slice(2);

if (prismaArgs.length === 0) {
  console.error("Usage: with-local-env.mjs <prisma-args...>");
  process.exit(1);
}

execSync(`"${prismaBin}" ${prismaArgs.map((arg) => JSON.stringify(arg)).join(" ")}`, {
  cwd: packageRoot,
  stdio: "inherit",
  env: process.env,
  shell: true,
});
