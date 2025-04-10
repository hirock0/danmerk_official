import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.TOKEN_SECRET as string);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Logged-in user tries to visit /user/register or /user/login
  if ((pathname === '/user/register' || pathname === '/user/login') && token) {
    try {
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (err) {
      // Token invalid, let them access login/register
      return NextResponse.next();
    }
  }

  // Root path: redirect to dashboard if logged in, else to register
  if (pathname === '/') {
    if (token) {
      try {
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } catch (err) {
        return NextResponse.redirect(new URL('/user/login', request.url));
      }
    } else {
      return NextResponse.redirect(new URL('/user/login', request.url));
    }
  }

  // Protected route: /dashboard
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/user/register', request.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL('/user/register', request.url));
    }
  }

  // Allow access to all other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/user/login', '/user/register'],
};
