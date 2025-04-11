import { NextResponse } from "next/server";
import { DBConnection } from "@/lib/db_connection/db_connection";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadToCloudinaryLoggedUserImage } from "@/utils/cloudinary/cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, rePassword, userImage, termsChecked, role } =
      body;

    const client = await DBConnection();
    const db = client.db("User");
    const usersCollection = db.collection("users");
    const findUser = await usersCollection.findOne({ email: email });

    if (findUser) {
      return NextResponse.json({
        message: "User already exists",
        success: false,
      });
    } else {

      const uploadResult = await uploadToCloudinaryLoggedUserImage(userImage);
      if (!uploadResult?.secure_url || !uploadResult?.public_id) {
        return NextResponse.json({
          message: "Image upload failed",
          success: false,
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userToSave = {
          _id: new ObjectId(),
          name,
          email,
          password: hashedPassword,
          timeStamp: Date.now(),
          role,
          image: {
            secure_url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
          },
          termsChecked,
        };

        const savedUser = await usersCollection.insertOne(userToSave);

        const tokenPayload = {
          id: savedUser?.insertedId,
          email: userToSave?.email,
          role: userToSave?.role,
          image: userToSave?.image?.secure_url,
        };
        const token = jwt.sign(
          tokenPayload,
          process.env.NEXT_PUBLIC_TOKEN_SECRET!,
          {
            expiresIn: "7d",
          }
        );

        const response = NextResponse.json({
          message: "User created successfully!",
          success: true,
        });

        response.cookies.set("token", token, { httpOnly: true });
        return response;
      }
    }
  } catch (error: any) {
    
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
