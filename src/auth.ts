import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    await connectDB();
                    const user = await User.findOne({ email }).select("+password");
                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) {
                        return {
                            id: user._id.toString(),
                            name: user.fullName,
                            email: user.email,
                            role: user.role,
                            verificationStatus: user.verificationStatus,
                            image: user.idCardUrl
                        };
                    }
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
