import { NextResponse } from 'next/server';
import { DBConnection } from '@/lib/db_connection/db_connection';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { uploadToCloudinaryLoggedUserImage } from '@/utils/cloudinary/cloudinary';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const timeStamp = Date.now();

    const { email, password, image, ...rest } = body;

    if (!email || !password || !image) {
      return NextResponse.json(
        { message: 'Email, Password, and Image are required', success: false },
        { status: 400 }
      );
    }

    const client = await DBConnection();
    const db = client.db('User');
    const usersCollection = db.collection('users');

    // ✅ Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'A user already exists with this email.', success: false },
        { status: 409 }
      );
    }

    // ✅ Upload image to Cloudinary
    const uploadResult = await uploadToCloudinaryLoggedUserImage(image);
    if (!uploadResult?.secure_url || !uploadResult?.public_id) {
      return NextResponse.json(
        { message: 'Image upload failed', success: false },
        { status: 500 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userToSave = {
      _id: new ObjectId(),
      email,
      password: hashedPassword,
      timeStamp,
      image: {
        secure_url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      ...rest,
    };

    const savedUser = await usersCollection.insertOne(userToSave);

    // ✅ Generate token with secure_url
    const tokenPayload = {
      id: userToSave._id,
      email: userToSave.email,
      image: uploadResult.secure_url, // included in token
    };

    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET as string, {
      expiresIn: '7d',
    });

    const response = NextResponse.json(
      {
        message: 'User created successfully!',
        success: true,
        id: savedUser.insertedId,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong', success: false },
      { status: 500 }
    );
  }
}
