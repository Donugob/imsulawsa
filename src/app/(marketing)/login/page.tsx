"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { authenticate } from "@/actions/auth";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    setError("");
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);

      try {
        const result = await authenticate(undefined, formData);
        if (result) {
          setError(result);
        } else {
          // Success! The server action has handled the redirect or cookie setting.
          // We can optionally refresh the router to update the session.
          // But usually NextAuth redirect handles it.
          // If we are here, it means no error was returned, so we assume success.
          router.push("/dashboard"); // Explicit redirect fallback
          router.refresh();
        }
      } catch (e) {
        // Redirection errors are thrown by Next.js, so we ignore them
        // Real errors should have been caught in the server action if possible
        // But if it slips through:
        console.error(e);
      }
    });
  };

  return (
    <div className="min-h-screen bg-law-light flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 h-[600px]">

        {/* LEFT: BRANDING */}
        <div className="bg-law-navy text-white p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-serif mb-4">Welcome Back.</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              "The law is reason, free from passion." <br /> — Aristotle
            </p>
            <div className="h-1 w-20 bg-law-gold"></div>
          </div>
        </div>

        {/* RIGHT: LOGIN FORM */}
        <div className="p-12 flex flex-col justify-center">
          <h3 className="text-law-navy font-serif text-2xl mb-2">Student Login</h3>
          <p className="text-gray-400 text-xs mb-8 uppercase tracking-wider">Secure Access Portal</p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {/* CRITICAL Fix: method="POST" prevents sensitive data in URL if JS fails or race conditions occur */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            action={async (formData) => {
              // Fallback if JS fails or for progressive enhancement
              await authenticate(undefined, formData);
            }}
          >

            <div>
              <input
                {...register("email")}
                type="email" placeholder="Email Address"
                className="w-full px-4 py-4 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:border-law-gold text-law-navy text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"} placeholder="Password"
                className="w-full px-4 py-4 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:border-law-gold text-law-navy text-sm"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-gray-400 hover:text-law-navy">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit" disabled={isPending}
              className="w-full bg-law-navy text-white font-bold py-4 rounded-md uppercase tracking-wider hover:bg-law-gold hover:text-law-navy transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Access Portal"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            New Student? <Link href="/register" className="text-law-gold font-bold hover:underline">Register here</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
