"use client";

import { PrimaryButton } from "@repo/ui";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  return (
    <PrimaryButton
      variant="outline"
      onPress={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => router.push("/login"),
          },
        })
      }
    >
      退出登录
    </PrimaryButton>
  );
}
