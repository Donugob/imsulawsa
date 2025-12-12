"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const RegisterSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    regNumber: z.string().min(1, "Reg Number is required"),
    level: z.string().min(1, "Level is required"),
    idCardUrl: z.string().url("ID Card URL is required"),
});

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        const result = await signIn("credentials", {
            ...Object.fromEntries(formData),
            redirect: false,
        });

        if (result?.error) {
            return "Invalid credentials.";
        }

        return null; // Null means success in this pattern (error is string | undefined)?? 
        // Wait, the client expects "Invalid credentials" string on error.
        // If success, it used to throw redirect. Now it returns.
        // If I return NULL, the client might interpret that as "no error", which is true.
        // But I need to signal success so client can redirect. 
        // Existing client code: if (result) setError(result).
        // So returning null/undefined implies success. This works!
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}

export async function registerUser(prevState: any, formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries());

    const validatedFields = RegisterSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Register.",
        };
    }

    const { fullName, email, password, regNumber, level, idCardUrl } = validatedFields.data;

    try {
        await connectDB();

        // Check existing
        const existingUser = await User.findOne({
            $or: [{ email }, { regNumber }]
        });

        if (existingUser) {
            return {
                message: 'User with this Email or Reg Number already exists.',
                success: false
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            regNumber,
            level,
            idCardUrl,
        });

        // Auto login after registration? Or just redirect to login.
        // The previous implementation redirected to login. We will return success and let client handle redirect.

        return { success: true, message: 'Registration successful!', userId: newUser._id.toString() };

    } catch (error) {
        console.error('Signup Error:', error);
        return {
            message: 'Database Error: Failed to Create User.',
        };
    }
}

// Securely generate signature for Cloudinary upload on the server
export async function getCloudinarySignature() {
    const cloudinary = require('cloudinary').v2;

    // Ensure config is loaded
    cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const timestamp = Math.round((new Date).getTime() / 1000);

    // Use a signed upload preset or no preset if using manual signature
    // We will assume "lawsa_signed_uploads" or similar, BUT to make it compatible with existing "lawsa_uploads" (likely unsigned)
    // we might need to stick to the existing client-side logic OR upgrade to signed.
    // CRITICAL: The user wants "best practices that are scalable and secure". 
    // Unsigned uploads are NOT secure. 
    // We will generate a signature for a SECURE (signed) upload. 

    // We'll return the timestamp and signature to the client
    const signature = cloudinary.utils.api_sign_request({
        timestamp: timestamp,
        folder: 'lawsa-users', // Organize files
    }, process.env.CLOUDINARY_API_SECRET);

    return { timestamp, signature, cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, apiKey: process.env.CLOUDINARY_API_KEY };
}
