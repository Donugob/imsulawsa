import { NextResponse } from 'next/server';
import { auth } from "@/auth";

import connectDB from '@/lib/db';
import Material from '@/models/Material';

// POST: Upload a new Material
export async function POST(req: Request) {
  const session = await auth();

  // Security: Only Admins can upload
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, courseCode, level, semester, fileUrl } = body;

    if (!title || !courseCode || !fileUrl) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    await connectDB();

    const newMaterial = await Material.create({
      title,
      courseCode,
      level,
      semester,
      fileUrl,
      uploadedBy: session.user.id,
    });

    return NextResponse.json({ message: 'Material uploaded successfully', material: newMaterial }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

// GET: Fetch Materials (Filtered by Level/Semester)
export async function GET(req: Request) {
  const session = await auth();

  // Security: Only Logged in users
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const level = searchParams.get('level');

  await connectDB();

  // If level is provided, filter. If not, return recent uploads.
  const query = level ? { level } : {};

  const materials = await Material.find(query).sort({ createdAt: -1 });

  return NextResponse.json(materials);
}
