"use client";

import { PrimaryButton } from "@repo/ui";
import { authClient } from "@/lib/auth-client";

export function GitHubLoginButton() {
  return (
    <PrimaryButton
      onPress={() =>
        authClient.signIn.social({
          provider: "github",
          callbackURL: "/dashboard",
        })
      }
    >
      GitHub 登录
    </PrimaryButton>
  );
}
