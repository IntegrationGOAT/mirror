import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/signup", "/"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authToken = request.cookies.get("sb-auth-token");

  // If user is authenticated and tries to access login/signup, redirect to dashboard
  if (authToken && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is not authenticated and tries to access protected routes, redirect to login
  if (!authToken && !PUBLIC_ROUTES.includes(pathname) && pathname !== "/auth") {
    // Don't redirect if it's an API route or callback
    if (!pathname.startsWith("/api") && !pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
