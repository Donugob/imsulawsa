import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import connectDB from '@/lib/db';
import User from '@/models/User';

// GET: Fetch all Pending Users
export async function GET() {
  const session = await auth();

  // Security Check: Only Admins can see this
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  await connectDB();

  const pendingUsers = await User.find({ verificationStatus: 'pending' })
    .select('-password')
    .sort({ createdAt: -1 });

  return NextResponse.json(pendingUsers);
}

// PUT: Approve or Reject a User
export async function PUT(req: Request) {
  const session = await auth();

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  const { userId, action, reason } = await req.json();

  await connectDB();

  const newStatus = action === 'approve' ? 'verified' : 'rejected';

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      verificationStatus: newStatus,
      rejectionReason: reason || ''
    },
    { new: true }
  );

  return NextResponse.json({ message: `User ${newStatus} successfully`, user: updatedUser });
}