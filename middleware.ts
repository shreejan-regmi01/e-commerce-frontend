import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";

const protectedRoutes = ["/cart", "/profile"];
const authRoutes = ["/login", "/register"];
const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
  // get the token from cookies
  // console.log(request);
  let isAdmin;
  const token = request.cookies.get("accessToken")?.value;

  if (token) {
    isAdmin = decodeJwt(token).role === "admin";
  }

  // check where the user is trying to go
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // user tries to access protected route without valid token
  if (isProtectedRoute && !token) {
    const loginUrl = new URL(
      `/login?returnUrl=${request.nextUrl.pathname}&msg=You need to login to access this page`,
      request.url
    );
    return NextResponse.redirect(loginUrl);
  }

  // prevent customer and seller from accessing admin routes
  if (isAdminRoute && (!token || !isAdmin)) {
    const loginUrl = new URL(`/login?msg=Access denied`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // redirect / to /admin if user is admin
  if (request.nextUrl.pathname == "/" && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // user tries to access login/register while already logged in
  if (isAuthRoute && token) {
    // return NextResponse.redirect(new URL("/", request.url));
  }

  // allow the request to proceed if no issue
  return NextResponse.next();
}

// which paths the middleware should run on.
// exclude static files, images, etc., to keep performance high.
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
