"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  UserCircle,
  LogOut,
  FileText,
  ShieldCheck,
  UploadCloud,
  Home
} from "lucide-react";
import { Holtwood_One_SC } from "next/font/google";

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';

  const links = [
    { name: "Home", href: "/", icon: Home },
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "E-Library", href: "/dashboard/library", icon: BookOpen },
    { name: "Dues & Payments", href: "/dashboard/payments", icon: CreditCard },
    { name: "Documents", href: "/dashboard/documents", icon: FileText },
    { name: "My Profile", href: "/dashboard/profile", icon: UserCircle },
  ];
  if (isAdmin) {
    links.splice(1, 0, { name: "Registrar's Desk", href: "/dashboard/admin/verifications", icon: ShieldCheck });
    links.push({ name: "Library Manager", href: "/dashboard/admin/library/upload", icon: UploadCloud });
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-law-navy text-white h-screen fixed left-0 top-0 border-r border-law-gold/10 shadow-xl z-50">

      {/* Brand Header */}
      <div className="p-8 border-b border-white/5">
        <Link href="/" className="group block">
          <span className="font-serif text-2xl font-bold tracking-wide group-hover:text-law-gold transition-colors">LAWSA</span>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-[1px] w-8 bg-law-gold/50"></div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">Student Portal</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-4 px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                ? "bg-white/10 text-white font-bold shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-law-gold"></div>}
              <link.icon className={`h-5 w-5 transition-colors ${isActive ? "text-law-gold" : "text-gray-500 group-hover:text-gray-300"}`} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-6 border-t border-white/5 bg-black/10">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center justify-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 rounded-xl transition-all border border-transparent hover:border-red-900/30"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
