"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UploadCloud, Loader2, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { registerUser, getCloudinarySignature } from "@/actions/auth";

const RegisterSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  regNumber: z.string().min(1, "Reg Number is required"),
  level: z.string().min(1, "Level is required"),
});

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  // File State
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB Limit
        setError("File size too large. Max 5MB.");
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const onSubmit = (values: RegisterFormValues) => {
    setError(null);
    if (!file) {
      setError("Please upload your Student ID Card.");
      return;
    }

    startTransition(async () => {
      try {
        // 1. Get Secure Signature from Server
        const { timestamp, signature, cloudName, apiKey } = await getCloudinarySignature();

        // 2. Upload to Cloudinary using Signature
        const imageFormData = new FormData();
        imageFormData.append("file", file);
        imageFormData.append("api_key", apiKey || "");
        imageFormData.append("timestamp", timestamp.toString());
        imageFormData.append("signature", signature);
        imageFormData.append("folder", "lawsa-users");

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: imageFormData }
        );

        if (!uploadRes.ok) throw new Error("Image upload failed. Please try again.");
        const uploadData = await uploadRes.json();
        const imageUrl = uploadData.secure_url;

        // 3. Register User via Server Action
        const formData = new FormData();
        formData.append("fullName", values.fullName);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("regNumber", values.regNumber);
        formData.append("level", values.level);
        formData.append("idCardUrl", imageUrl);

        const result = await registerUser(undefined, formData);

        if (result.success) {
          setSuccess(true);
          setTimeout(() => router.push("/login"), 3000);
        } else {
          setError(result.message || "Registration failed.");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      }
    });
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-law-light px-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-serif text-law-navy mb-2">Registration Successful</h2>
          <p className="text-gray-500 text-sm mb-6">
            Your application has been submitted to the Secretariat. You will be notified once your ID is verified.
          </p>
          <Link href="/login" className="block w-full bg-law-navy text-white font-bold py-3 rounded-md uppercase tracking-wider hover:bg-law-gold transition-colors">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-law-light flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">

        {/* LEFT: BRANDING & INFO */}
        <div className="bg-law-navy text-white p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          <div className="relative z-10">
            <span className="text-law-gold font-bold tracking-widest text-xs uppercase mb-2 block">Student Portal</span>
            <h2 className="text-4xl font-serif mb-4">Join the Network.</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Create your account to access the E-Library, pay dues seamlessly, and stay updated with faculty news.
            </p>
          </div>

          <div className="relative z-10 mt-12 space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="h-2 w-2 rounded-full bg-law-gold" />
              <span>Instant Library Access</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="h-2 w-2 rounded-full bg-law-gold" />
              <span>Digital Receipt Generation</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="h-2 w-2 rounded-full bg-law-gold" />
              <span>Vote in Elections</span>
            </div>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="p-8 lg:p-12">
          <h3 className="text-law-navy font-serif text-2xl mb-6">Create Account</h3>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-start gap-2 rounded-r">
              <AlertCircle className="h-5 w-5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
              <input
                {...register("fullName")}
                type="text" placeholder="Surname Firstname"
                className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:border-law-gold focus:ring-1 focus:ring-law-gold transition-all text-law-navy text-sm"
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Email & Level Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email</label>
                <input
                  {...register("email")}
                  type="email" placeholder="student@example.com"
                  className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:border-law-gold transition-all text-law-navy text-sm"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Level</label>
                <select
                  {...register("level")}
                  className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:border-law-gold transition-all text-law-navy text-sm"
                >
                  <option value="">Select</option>
                  <option value="100L">100L</option>
                  <option value="200L">200L</option>
                  <option value="300L">300L</option>
                  <option value="400L">400L</option>
                  <option value="500L">500L</option>
                </select>
                {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level.message}</p>}
              </div>
            </div>

            {/* Reg Number */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Reg Number / JAMB No</label>
              <input
                {...register("regNumber")}
                type="text" placeholder="e.g. 15/LAW/045"
                className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:border-law-gold transition-all text-law-navy text-sm"
              />
              {errors.regNumber && <p className="text-red-500 text-xs mt-1">{errors.regNumber.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Password</label>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"} placeholder="Min 6 characters"
                className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:border-law-gold transition-all text-law-navy text-sm"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-gray-400 hover:text-law-navy">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* File Upload Area */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Upload School ID / Admission Letter</label>
              <div className="relative group">
                <input
                  type="file" accept="image/*" onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all ${file ? 'border-law-gold bg-law-gold/5' : 'border-gray-300 bg-gray-50 group-hover:bg-gray-100'}`}>
                  {preview ? (
                    <div className="relative h-32 w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-md" />
                      <span className="text-xs text-law-gold font-bold mt-2 block">Click to change</span>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 font-medium">Click or Drag ID Card here</p>
                      <p className="text-xs text-gray-400">Max 5MB (JPG/PNG)</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit" disabled={isPending}
              className="w-full bg-law-navy text-white font-bold py-4 rounded-md uppercase tracking-wider hover:bg-law-gold hover:text-law-navy transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit Application"}
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account? <Link href="/login" className="text-law-gold font-bold hover:underline">Login here</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
