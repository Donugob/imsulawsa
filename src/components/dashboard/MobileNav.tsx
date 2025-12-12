"use client";

import { useState, useEffect } from "react";
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
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';

  // Toggle drawer
  const toggleOpen = () => setIsOpen(!isOpen);

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const links = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "E-Library", href: "/dashboard/library", icon: BookOpen },
    { name: "Dues & Payments", href: "/dashboard/payments", icon: CreditCard },
    { name: "Documents", href: "/dashboard/documents", icon: FileText },
    { name: "My Profile", href: "/dashboard/profile", icon: UserCircle },
  ];
  
  if (isAdmin) {
    links.splice(1, 0, { name: "Registrar's Desk", href: "/dashboard/admin/verifications", icon: ShieldCheck });
  }

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-law-dark text-white p-4 sticky top-0 z-40 flex justify-between items-center shadow-lg backdrop-blur-md bg-opacity-90">
        <Link href="/dashboard" className="flex items-center gap-2">
           <span className="font-serif font-bold text-xl">LAWSA</span>
           <span className="text-[10px] bg-law-gold text-law-dark px-1.5 py-0.5 rounded font-bold tracking-wider">PORTAL</span>
        </Link>
        <button 
          onClick={toggleOpen}
          className="p-2 -mr-2 text-white hover:text-law-gold transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-law-dark z-50 lg:hidden shadow-2xl flex flex-col border-l border-white/10"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-law-dark to-law-navy">
                <div>
                    <h2 className="text-white font-serif text-xl font-bold">Menu</h2>
                    <p className="text-gray-400 text-xs mt-1">
                        Welcome, {session?.user?.name?.split(" ")[0]}
                    </p>
                </div>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-white/10 text-law-gold font-bold border border-white/5"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                        <link.icon className={`h-5 w-5 ${isActive ? "text-law-gold" : "text-gray-500 group-hover:text-white"}`} />
                        <span>{link.name}</span>
                    </div>
                    {isActive && <div className="h-1.5 w-1.5 rounded-full bg-law-gold shadow-[0_0_8px_rgba(197,160,89,0.5)]"></div>}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-red-400 bg-red-950/20 border border-red-900/30 rounded-xl hover:bg-red-900/30 transition-all"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
