import { createAuthClient } from "better-auth/react";

function resolveClientBaseURL(): string {
  if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
    return process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}

export const authClient = createAuthClient({
  baseURL: resolveClientBaseURL(),
});
