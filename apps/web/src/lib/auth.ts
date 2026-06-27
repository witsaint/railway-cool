import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/db";

const baseURL =
  process.env.BETTER_AUTH_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined);

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
  trustedOrigins: baseURL ? [baseURL] : ["http://localhost:3000"],
});

export type Session = typeof auth.$Infer.Session;
