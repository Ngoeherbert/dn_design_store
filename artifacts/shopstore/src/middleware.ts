import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    try {
      const sessionRes = await fetch(new URL("/api/auth/get-session", request.url), {
        headers: { cookie: request.headers.get("cookie") ?? "" },
        cache: "no-store",
      });

      if (!sessionRes.ok) {
        return NextResponse.redirect(new URL("/login?redirect=/admin", request.url));
      }

      const session = await sessionRes.json();

      if (!session?.user) {
        return NextResponse.redirect(new URL("/login?redirect=/admin", request.url));
      }

      if (session.user.role !== "admin") {
        return NextResponse.redirect(new URL("/?unauthorized=1", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login?redirect=/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
