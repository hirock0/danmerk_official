import { DBConnection } from "@/lib/db_connection/db_connection";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await DBConnection();
    const db =  client.db("User");
    const users = await db.collection("users").find({}).toArray(); 

    return NextResponse.json({
        message: "Data found",
        success: true,
        users
        

    })
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
