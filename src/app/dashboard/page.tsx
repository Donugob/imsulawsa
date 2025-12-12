"use client";

import { useSession } from "next-auth/react";
import {
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Clock,
  CreditCard,
  User,
  Shield,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();
  const user = session?.user;

  // Status Logic
  const isVerified = user?.verificationStatus === "verified";
  const isPending = user?.verificationStatus === "pending";

  return (
    <div className="space-y-8 animate-fade-in pb-20 lg:pb-0">

      {/* 1. HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-law-dark text-white p-8 md:p-12 shadow-2xl isolate">
        {/* Abstract Background Decoration */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-law-gold/10 blur-3xl z-[-1]"></div>
        <div className="absolute bottom-0 left-0 h-full w-1/3 bg-gradient-to-r from-law-navy to-transparent z-[-1] opacity-50"></div>
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Shield className="h-48 w-48" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/5 text-[10px] uppercase tracking-[0.2em] font-medium text-law-gold backdrop-blur-sm">
              Student Portal
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
              Welcome back,<br />
              <span className="text-law-gold">{user?.name?.split(" ")[0] || "Scholar"}</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-md font-light leading-relaxed">
              Manage your academic profile, access resources, and stay updated with the Moot Court & Secretariat.
            </p>
          </div>

          {/* Status Indicator */}
          <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl border backdrop-blur-md transition-all ${isVerified
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-amber-500/10 border-amber-500/20 text-amber-400"
            }`}>
            {isVerified ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
            <div className="flex flex-col">
              <span className="text-[10px] uppercase opacity-70 font-semibold tracking-wider">Status</span>
              <span className="text-sm font-bold">{isVerified ? "Verified Member" : "Pending Verification"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ALERT BANNER (Floating Glass) */}
      {isPending && (
        <div className="animate-slide-up bg-white border-l-4 border-orange-500 p-6 rounded-xl shadow-lg flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
          <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-law-navy font-bold text-lg font-serif">Verification in Progress</h3>
            <p className="text-gray-600 text-sm mt-1 mb-3 leading-relaxed">
              The Secretariat is currently reviewing your profile details. Full access to library resources and payments will be enabled once approved.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-orange-700 bg-orange-50 px-3 py-1.5 rounded-lg w-fit">
              <Clock className="h-3 w-3" />
              <span>Estimated time: 24-48 hours</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

        {/* Left Column: Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-serif font-bold text-law-navy flex items-center gap-2">
            <div className="h-1 w-6 bg-law-gold rounded-full"></div>
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* E-Library Card */}
            <Link
              href={isVerified ? "/dashboard/library" : "#"}
              className={`group relative overflow-hidden p-8 rounded-2xl border transition-all duration-300 ${isVerified
                  ? "bg-white border-gray-100 hover:border-law-gold/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer"
                  : "bg-gray-50 border-gray-100 opacity-70 cursor-not-allowed"
                }`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300 transform group-hover:scale-110">
                <BookOpen className="h-32 w-32 text-law-navy" />
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div className="h-12 w-12 rounded-xl bg-law-navy text-white flex items-center justify-center shadow-lg group-hover:bg-law-gold transition-colors duration-300">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-law-navy font-serif mb-1 group-hover:text-law-gold transition-colors">E-Library</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Access law reports, lecture notes, and past questions.</p>
                </div>
                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isVerified ? "text-law-navy group-hover:translate-x-1 transition-transform" : "text-gray-400"}`}>
                  <span>Enter Library</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>

            {/* Dues Card */}
            <Link
              href={isVerified ? "/dashboard/payments" : "#"}
              className={`group relative overflow-hidden p-8 rounded-2xl border transition-all duration-300 ${isVerified
                  ? "bg-white border-gray-100 hover:border-green-600/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer"
                  : "bg-gray-50 border-gray-100 opacity-70 cursor-not-allowed"
                }`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300 transform group-hover:scale-110">
                <CreditCard className="h-32 w-32 text-green-800" />
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div className="h-12 w-12 rounded-xl bg-green-900 text-white flex items-center justify-center shadow-lg group-hover:bg-green-700 transition-colors duration-300">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-law-navy font-serif mb-1 group-hover:text-green-800 transition-colors">Pay Dues</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Securely clear your annual association obligations.</p>
                </div>
                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isVerified ? "text-law-navy group-hover:translate-x-1 transition-transform" : "text-gray-400"}`}>
                  <span>Manage Payments</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Column: Profile Summary */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-law-navy flex items-center gap-2">
            <div className="h-1 w-6 bg-law-gold rounded-full"></div>
            My Profile
          </h2>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-law-navy to-law-dark"></div>

            <div className="relative z-10 flex flex-col items-center text-center mt-8">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-gray-100 shadow-lg flex items-center justify-center text-gray-400 overflow-hidden">
                {/* Placeholder for real avatar if available */}
                <User className="h-10 w-10" />
              </div>

              <h3 className="text-lg font-bold font-serif text-law-navy mt-4">{user?.name}</h3>
              <p className="text-sm text-gray-500 font-mono bg-gray-50 px-3 py-1 rounded-full mt-2 border border-gray-100">
                {user?.email}
              </p>

              <div className="w-full mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-sm">
                <span className="text-gray-500">Membership ID</span>
                <span className="font-bold text-law-navy">--/--</span>
              </div>
              <div className="w-full mt-3 flex justify-between items-center text-sm">
                <span className="text-gray-500">Current Level</span>
                <span className="font-bold text-law-navy">-- Level</span>
              </div>

              <button className="w-full mt-6 py-3 border border-gray-200 text-xs font-bold uppercase text-gray-600 rounded-xl hover:bg-gray-50 hover:text-law-navy hover:border-gray-300 transition-all flex items-center justify-center gap-2">
                View Full Profile
                <GraduationCap className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
