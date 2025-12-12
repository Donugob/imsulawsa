"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll and trigger Hero animations
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("nav-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("nav-open");
    }
  }, [isOpen]);

  const navLinks = [
    { name: "The Association", href: "/about" },
    { name: "The Faculty", href: "/faculty" },
    { name: "Library", href: "/library" },
    { name: "News", href: "/news" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled || isOpen
            ? "bg-white/90 backdrop-blur-md py-3 border-law-navy/5 shadow-sm"
            : "bg-transparent py-6 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* --- BRAND LOCKUP --- */}
          <Link
            href="/"
            className="group flex items-center gap-3 z-50 relative"
          >
            {/* The Logo Container */}
            <div className="relative h-12 w-12 md:h-14 md:w-14 flex-shrink-0">
              <Image
                src="/lawsa-logo.webp"
                alt="LAWSA Logo"
                fill
                className="object-contain drop-shadow-sm"
              />
            </div>

            {/* The Typography - Now Navy for Light Theme */}
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl tracking-wide text-law-navy font-bold leading-none group-hover:text-law-gold transition-colors">
                LAWSA
              </span>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-[1px] w-4 bg-law-gold"></div>
                <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-500 group-hover:text-law-gold transition-colors">
                  Imo State University
                </span>
              </div>
            </div>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group py-2"
              >
                {/* Text is now Navy */}
                <span className="text-xs uppercase tracking-widest text-law-navy font-semibold group-hover:text-law-gold transition-colors">
                  {link.name}
                </span>
                {/* Golden Underline */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-law-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* CTA Button - Navy Border Style */}
            <Link
              href="/login"
              className="ml-4 px-6 py-2.5 border border-law-navy/20 text-law-navy hover:bg-law-navy hover:text-white hover:border-law-navy text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm"
            >
              Login
            </Link>
          </nav>

          {/* --- MOBILE TOGGLE --- */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 relative text-law-navy hover:text-law-gold transition-colors p-2"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </header>

      {/* --- MOBILE CURTAIN MENU (LIGHT THEME) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-law-light z-40 flex flex-col pt-32 px-8 md:hidden"
          >
            {/* Background Decoration (Subtle Gold/Red on Cream) */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-law-gold/10 to-transparent pointer-events-none" />

            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between text-2xl font-serif text-law-navy border-b border-law-navy/10 pb-4"
                  >
                    <span className="group-hover:text-law-gold transition-colors">
                      {link.name}
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-law-gold" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-8"
              >
                {/* Mobile Button - Solid Navy */}
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 w-full bg-law-navy text-white font-bold py-4 rounded-sm uppercase tracking-wider shadow-lg hover:bg-law-navy/90"
                >
                  <User className="h-5 w-5" />
                  Student Portal
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
