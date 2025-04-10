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
      return NextResponse.json(
        { message: "Please provide both email and password." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await DBConnection();
    const db = client.db("User");
    const usersCollection = db.collection("users");

    // Check if the user exists by email
    const user = await usersCollection.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return NextResponse.json({ message: "Email not found" }, { status: 404 });
    }

    // Compare password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Password is incorrect", success: false },
        { status: 400 }
      );
    }

    // Generate JWT token with the payload
    const tokenPayload = {
      id: user?._id,
      email: user?.email,
      image: user?.image?.secure_url, // Assuming you store user images in `secure_url`
    };

    // Sign the token with the secret and set expiration to 7 days
    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET as string, {
      expiresIn: "7d",
    });

    // Create a response with success message and token in cookies
    const response = NextResponse.json(
      { message: "Login successful", success: true },
      { status: 200 }
    );

    // Set the token in a secure, HTTP-only cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true, // Ensures the cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Secure flag for HTTPS
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 60 * 60 * 24 * 7, // Token will be valid for 7 days
      path: "/", // The cookie is accessible on all routes
    });

    return response;
  } catch (error: any) {
    // Catch any errors and send a 500 response with the error message
    return NextResponse.json(
      { message: error.message || "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
