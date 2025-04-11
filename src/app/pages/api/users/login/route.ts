import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DBConnection } from "@/lib/db_connection/db_connection"; // MongoDB connection utility
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Extract email and password from the request body
    const { email, password } = await req.json();

    // Check if both email and password are provided
    if (!email || !password) {
      return NextResponse.json({
        message: "Please provide both email and password.",
        success: false,
      });
    }

    // Connect to MongoDB
    const client = await DBConnection();
    const db = client.db("User");
    const usersCollection = db.collection("users");

    // Check if the user exists by email
    const user = await usersCollection.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return NextResponse.json({ message: "Email not found", success: false });
    }

    // Compare password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match
    if (!isPasswordMatch) {
      return NextResponse.json({
        message: "Password is incorrect",
        success: false,
      });
    }

    // Generate JWT token with the payload
    const tokenPayload = {
      id: user?._id,
      email: user?.email,
      role: user?.role,
      image: user?.image?.secure_url, // Assuming you store user images in `secure_url`
    };

    // Sign the token with the secret and set expiration to 7 days
    const token = jwt.sign(
      tokenPayload,
      process.env.NEXT_PUBLIC_TOKEN_SECRET!,
      {
        expiresIn: "7d",
      }
    );
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      role: user?.role,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
    
  } catch (error: any) {
    // Catch any errors and send a 500 response with the error message
    return NextResponse.json({ message: error.message, success: false });
  }
}
