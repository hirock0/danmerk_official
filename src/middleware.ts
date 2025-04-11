import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_SECRET!);

export async function middleware(request: NextRequest) {


  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Logged-in user tries to visit /user/register or /user/login
  if ((pathname === "/user/register" || pathname === "/user/login") && token) {
      try {

        const veryfiedToken = await jwtVerify(token, secret);
        if (veryfiedToken?.payload?.role === "admin") {
          return NextResponse.redirect(
            new URL("/admin/dashboard", request.url)
          );
        }

        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (err) {
        // Token invalid, let them access login/register
        return NextResponse.next();
      }
  }

  // Root path: redirect to dashboard if logged in, else to register
  if (pathname === "/") {
    if (token) {
      try {
        const veryfiedToken = await jwtVerify(token, secret);
        if (veryfiedToken?.payload?.role === "admin") {
          return NextResponse.redirect(
            new URL("/admin/dashboard", request.url)
          );
        }
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (err) {
        return NextResponse.redirect(new URL("/user/login", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/user/login", request.url));
    }
  }

  // Protected route: /dashboard
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/user/login", request.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/user/register", request.url));
    }
  }

  // Allow access to all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/user/login",
    "/user/register",
    "/admin/dashboard/:path*",
  ],
};