import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const response = NextResponse.json(
      { message: "Logout successful", success: true },
      { status: 200 }
    );

    response.cookies.delete("token");
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
