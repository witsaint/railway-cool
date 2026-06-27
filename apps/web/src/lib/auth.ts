import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/db";

const isDev = process.env.NODE_ENV === "development";

const baseURL =
  process.env.BETTER_AUTH_URL ??
  (isDev ? "http://localhost:3000" : undefined);

/** Local loopback variants — cookies are host-scoped; localhost ≠ 127.0.0.1. */
const LOCAL_DEV_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
] as const;

function resolveTrustedOrigins(): string[] {
  const origins = new Set<string>();

  if (isDev) {
    for (const origin of LOCAL_DEV_ORIGINS) origins.add(origin);
  }

  if (baseURL) {
    try {
      origins.add(new URL(baseURL).origin);
    } catch {
      // ignore invalid baseURL
    }
  }

  const fromEnv = process.env.BETTER_AUTH_TRUSTED_ORIGINS;
  if (fromEnv) {
    for (const origin of fromEnv.split(",")) {
      const trimmed = origin.trim();
      if (trimmed) origins.add(trimmed);
    }
  }

  return [...origins];
}

export const auth = betterAuth({
  baseURL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: resolveTrustedOrigins(),
  account: isDev
    ? {
        // OAuth state is also stored in DB; skip the extra signed cookie check
        // when loopback host mismatch prevents the cookie from being sent.
        skipStateCookieCheck: true,
      }
    : undefined,
  advanced: isDev
    ? {
        useSecureCookies: false,
        defaultCookieAttributes: {
          sameSite: "lax",
        },
      }
    : undefined,
});

export type Session = typeof auth.$Infer.Session;
