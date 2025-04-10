import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Token not found', success: false },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    return NextResponse.json(
      {
        message: 'Token decoded successfully',
        success: true,
        data: decoded,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Invalid or expired token', success: false },
      { status: 401 }
    );
  }
}
