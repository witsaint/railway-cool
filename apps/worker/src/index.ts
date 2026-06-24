import { prisma } from "@repo/db";
import { getWorkerPollInterval } from "@repo/shared";

const pollIntervalMs = getWorkerPollInterval();

async function tick(): Promise<void> {
  const userCount = await prisma.user.count();
  console.log(
    `[worker] ${new Date().toISOString()} — users in database: ${userCount}`,
  );
}

async function main(): Promise<void> {
  console.log(`[worker] starting (poll every ${pollIntervalMs}ms)`);

  await tick();

  setInterval(() => {
    tick().catch((error) => {
      console.error("[worker] tick failed:", error);
    });
  }, pollIntervalMs);
}

main().catch((error) => {
  console.error("[worker] fatal:", error);
  process.exit(1);
});
