"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { TrainSimple } from "@phosphor-icons/react";

export function SiteHeader() {
  const router = useRouter();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#030712]/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sm font-medium text-zinc-100 transition-colors hover:text-white"
        >
          <span className="flex size-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-cyan-400 transition-colors group-hover:border-cyan-400/30 group-hover:text-cyan-300">
            <TrainSimple size={18} weight="duotone" />
          </span>
          <span className="tracking-tight">Railway</span>
          <span className="hidden text-zinc-500 sm:inline">Monorepo</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#features" className="transition-colors hover:text-zinc-100">
            能力模块
          </a>
          <a href="#platform" className="transition-colors hover:text-zinc-100">
            平台架构
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="hidden text-zinc-300 sm:inline-flex"
            onPress={() => router.push("/login")}
          >
            登录
          </Button>
          <Button
            variant="primary"
            className="border border-cyan-400/20 bg-cyan-500/10 text-cyan-100 shadow-[0_0_24px_-6px_rgba(34,211,238,0.35)] transition-all hover:border-cyan-400/40 hover:bg-cyan-500/20"
            onPress={() => router.push("/login")}
          >
            GitHub 登录
          </Button>
        </div>
      </div>
    </header>
  );
}
