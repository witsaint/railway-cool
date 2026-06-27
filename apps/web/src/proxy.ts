import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Better Auth OAuth state cookies are host-scoped. `localhost` and `127.0.0.1`
 * are different sites, so visiting via 127.0.0.1 while BETTER_AUTH_URL is
 * localhost causes state_mismatch on the GitHub callback.
 */
export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.next();
  }

  const host = request.headers.get("host");
  if (!host?.startsWith("127.0.0.1:")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.host = host.replace("127.0.0.1", "localhost");
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
