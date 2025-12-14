"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Gavel, BookOpen, Users } from "lucide-react";

const NAV_OPEN_CLASS = "nav-open";
const MOBILE_SRC = "/hero_mobile.webp";
const MASKED_SRC = "/hero_masked.webp";

function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, -20]);
  const cardY = useTransform(scrollY, [0, 600], [0, -8]);

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const check = () =>
      setIsNavOpen(document.body.classList.contains(NAV_OPEN_CLASS));
    check();
    const mo = new MutationObserver(() => check());
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  return (
    <section
      aria-label="IMSU Faculty of Law hero"
      className="relative bg-law-light text-law-dark overflow-hidden min-h-screen flex items-center pt-28 lg:pt-32 pb-12"
    >
      <div className="pointer-events-none absolute -top-14 -left-28 w-[500px] h-[500px] bg-law-gold/10 rounded-full blur-[100px] -z-20 mix-blend-multiply" />
      <div className="pointer-events-none absolute top-1/2 right-0 w-[600px] h-[600px] bg-law-red/5 rounded-full blur-[120px] -z-20 mix-blend-multiply" />

      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* LEFT: Text content */}
        <div className="lg:col-span-7 z-30 order-1">
          {/* Micro-brand */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-[2px] w-10 lg:w-14 bg-law-gold" />
            <span className="text-law-gold uppercase tracking-widest text-[10px] lg:text-xs font-bold">
              Digital Secretariat
            </span>
            <span className="text-gray-500 text-[10px] lg:text-xs ml-3 font-medium uppercase tracking-wider">
              Law Students' Association of Nigeria

            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-6 text-law-navy"
          >
            <span className="block">Defending</span>
            <span className="block italic text-gray-500 font-light">the</span>
            <span className="block">
              Future{" "}
              <span className="relative inline-block text-law-gold">
                of Justice
                {/* Underline decoration */}
                <svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-law-gold/30"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </span>
              .
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="text-gray-600 text-sm md:text-lg max-w-2xl leading-relaxed mb-8 border-l-2 border-law-navy/10 pl-4 lg:pl-6"
          >
            A student-centered hub for resources, advocacy, and practical legal
            experience, powered by the IMSU Faculty of Law community.
          </motion.p>

          {/* Buttons - Adjusted for Light Theme */}
          <motion.div
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <motion.a
              href="/portal"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-law-navy text-white font-bold text-sm uppercase tracking-wider rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                Enter Portal
                <ArrowRight className="w-4 h-4 text-law-gold transition-transform group-hover:translate-x-1" />
              </span>
              {/* Gold hover effect */}
              <div className="absolute inset-0 bg-law-gold transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </motion.a>

            <motion.a
              href="#history"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52 }}
              className="px-8 py-4 border border-law-navy/20 text-law-navy font-bold text-sm uppercase tracking-wider hover:bg-law-navy/5 transition-colors rounded-sm inline-flex items-center justify-center"
            >
              Explore History
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT: Image Composition */}
        <div className="lg:col-span-5 relative order-2 mt-8 lg:mt-0">
          <motion.div
            style={{ y: imageY }}
            className="relative w-full aspect-[4/3] lg:h-[600px] lg:aspect-auto z-10"
          >
            {/* Image Container - White Border / Shadow */}
            <div
              className="absolute inset-0 lg:-right-12 lg:-top-4 w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-law-navy/20 border border-white/50"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 85%, 8% 100%)",
                backgroundColor: "#e5e5e5", // Placeholder color
              }}
            >
              <picture>
                <source srcSet={MOBILE_SRC} media="(max-width: 768px)" />
                <img
                  src={MASKED_SRC} // Make sure this image looks good on white!
                  alt="IMSU Senate Building"
                  className="w-full h-full object-cover"
                />
              </picture>

              {/* Light Theme Blend Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-law-light/80 via-transparent to-transparent mix-blend-normal pointer-events-none" />
            </div>

            {/* FLOATING CARD - White Glassmorphism */}
            <motion.div
              style={{ y: cardY }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              // ADDED: scale-75 origin-bottom-left lg:scale-100
              // EXPLANATION: Shrinks card to 75% size on mobile, anchored to bottom-left. Resets to 100% on desktop.
              className="absolute bottom-0 -left-4 lg:bottom-12 lg:-left-12 z-40 bg-white/40 lg:bg-white/80 backdrop-blur-md lg:backdrop-blur-xl border border-white/30 lg:border-white/40 p-4 lg:p-6 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-[70%] sm:w-[280px] lg:w-[320px] scale-75 origin-bottom-left lg:scale-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-law-navy text-law-gold rounded-md">
                  <Gavel className="h-5 w-5" />
                </div>
                <span className="text-law-gold text-[11px] font-bold uppercase tracking-widest">
                  Est. 1992
                </span>
              </div>
              <h3 className="text-law-navy font-serif text-xl leading-tight">
                Lex Nullius
              </h3>
              <p className="text-gray-600 text-xs mt-2 leading-relaxed font-medium">
                "The law respects no one." Upholding integrity, practical
                training, and excellence.
              </p>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-law-gold" />
                <span className="text-xs text-gray-500 font-medium">
                  Academic Library Access
                </span>
              </div>
            </motion.div>

            {/* Decorative Element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:block absolute -top-8 -right-4 bg-law-gold text-white p-4 rounded-lg shadow-lg z-50"
            >
              <Users className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
