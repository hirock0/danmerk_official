import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Clear the JWT token by setting an expired cookie
    const response = NextResponse.json(
      { message: 'Logout successful', success: true },
      { status: 200 }
    );

    // Clear the cookie by setting it to expire immediately
    response.cookies.set({
      name: 'token',
      value: '',
      httpOnly: true,
      path: '/',
      maxAge: 0, // Immediately expire the cookie
      sameSite: 'strict',
    });

    return response;
  } catch (error:any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong', success: false },
      { status: 500 }
    );
  }
}
