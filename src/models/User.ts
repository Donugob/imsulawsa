import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false, // Don't return password by default in queries
  },
  
  // Academic Identity
  regNumber: {
    type: String,
    required: [true, 'Please provide Matric No or JAMB Reg'],
    unique: true,
    uppercase: true,
    trim: true,
  },
  level: {
    type: String, // "100L", "200L", etc.
    required: true,
  },
  
  // Verification Logic
  idCardUrl: {
    type: String, // The Image Link from Cloudinary
    required: [true, 'Student ID upload is required'],
  },
  idCardPublicId: {
    type: String, // Needed to delete the image from Cloudinary if user deletes account
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
  },
  rejectionReason: {
    type: String, // If rejected, Admin types why (e.g., "Blurry Image")
  },

  // Role Management
  role: {
    type: String,
    enum: ['student', 'admin', 'super-admin'],
    default: 'student',
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model overwrite error in Next.js
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
