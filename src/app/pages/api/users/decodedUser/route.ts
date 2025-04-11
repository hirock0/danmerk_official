
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Token not found', success: false },

      );
    }

    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET!);

    return NextResponse.json(
      {
        message: 'Token decoded successfully',
        success: true,
        data: decoded,
      },

    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Invalid or expired token', success: false }
    );
  }
}
