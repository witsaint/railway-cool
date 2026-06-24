import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PageShell } from "@repo/ui";
import { SignOutButton } from "@/components/sign-out-button";
import { APP_NAME } from "@repo/shared";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <PageShell title="控制台">
      <p className="mb-2 text-default-500">欢迎回来，{user.name ?? user.email}。</p>
      <p className="mb-6 text-sm text-default-400">{APP_NAME}</p>
      <SignOutButton />
    </PageShell>
  );
}
