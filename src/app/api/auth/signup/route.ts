import { NextResponse } from 'next/server';
import connectDB from '@/lib/db'; // The database connection we built earlier
import User from '@/models/User'; // The User schema we just updated
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming JSON data
    const { fullName, email, password, regNumber, level, idCardUrl } = await req.json();

    // 2. Validate - Ensure all fields are present
    if (!fullName || !email || !password || !regNumber || !level || !idCardUrl) {
      return NextResponse.json(
        { message: 'All fields, including ID Card upload, are required.' },
        { status: 400 }
      );
    }

    // 3. Connect to Database
    await connectDB();

    // 4. Check for duplicates (Email or Reg Number)
    const existingUser = await User.findOne({
      $or: [{ email }, { regNumber }]
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this Email or Reg Number already exists.' },
        { status: 409 } // 409 Conflict
      );
    }

    // 5. Hash the password (Security)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create the new User
    // Note: 'verificationStatus' defaults to 'pending' in the Schema
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      regNumber,
      level,
      idCardUrl,
    });

    // 7. Return Success
    return NextResponse.json(
      { message: 'Registration successful! Please wait for Admin approval.', userId: newUser._id },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
