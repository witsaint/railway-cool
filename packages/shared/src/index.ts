export const APP_NAME = "Railway Monorepo";

export function formatDate(date: Date): string {
  return date.toISOString();
}

export function getWorkerPollInterval(): number {
  const raw = process.env.WORKER_POLL_INTERVAL_MS ?? "5000";
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 5000;
}
