import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/cart"];
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  // get the token from cookies
  const token = request.cookies.get("accessToken")?.value;

  // check where the user is trying to go
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // user tries to access protected route without valid token
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // user tries to access login/register while already logged in
  if (isAuthRoute && token) {
    // return NextResponse.redirect(new URL("/", request.url));
  }

  // allow the request to proceed if no issue
  return NextResponse.next();
}

// This tells Next.js which paths the middleware should run on.
// We exclude static files, images, etc., to keep performance high.
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
