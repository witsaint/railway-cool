import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PageShell } from "@repo/ui";
import { GitHubLoginButton } from "@/components/github-login-button";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <PageShell title="登录">
      <p className="mb-6 text-default-500">使用 GitHub 账号登录以继续。</p>
      <GitHubLoginButton />
    </PageShell>
  );
}
