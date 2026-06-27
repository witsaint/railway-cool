#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { loadLocalEnv } from "./load-local-env.mjs";

loadLocalEnv();

const [command, ...args] = process.argv.slice(2);
if (!command) {
  console.error("Usage: run-with-local-env.mjs <command> [args...]");
  process.exit(1);
}

const result = spawnSync(command, args, {
  stdio: "inherit",
  env: process.env,
  shell: true,
});

process.exit(result.status ?? 1);
