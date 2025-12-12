"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { BookOpen, Scale, HeartHandshake, ArrowRight } from "lucide-react";
import Link from "next/link";
import { GoldIcon } from "@/components/ui/GoldIcon";
import Image from "next/image";

const MissionSection = () => {
  const scrollRef = useRef(null);

  const pillars = [
    {
      id: "academics",
      title: "The E-Library",
      subtitle: "Academic Arsenal",
      desc: "Instant access to lecture notes, past questions, and legal journals. Digitizing the archive.",
      icon: BookOpen,
      href: "/library",
      bg: "bg-law-navy",
      text: "text-white",
      border: "border-law-navy",
      // Desktop Bento: Takes the 3rd column and spans 2 rows (Tall)
      desktopClass: "lg:col-start-3 lg:row-start-1 lg:row-span-2",
    },
    {
      id: "welfare",
      title: "Student Welfare",
      subtitle: "The Union's Duty",
      desc: "Lodge complaints and track clearance.",
      icon: HeartHandshake,
      href: "/welfare",
      bg: "bg-[#f5f0e6]",
      text: "text-law-navy",
      border: "border-law-gold/20",
      // Desktop Bento: Bottom row, col 1
      desktopClass: "lg:col-start-1 lg:row-start-2",
    },
    {
      id: "advocacy",
      title: "Chambers & Moot",
      subtitle: "Legal Practice",
      desc: "Register for chambers and schedules.",
      icon: Scale,
      href: "/advocacy",
      bg: "bg-white",
      text: "text-law-navy",
      border: "border-gray-200",
      // Desktop Bento: Bottom row, col 2
      desktopClass: "lg:col-start-2 lg:row-start-2",
    },
  ];

  return (
    <section
      ref={scrollRef}
      className="py-20 lg:py-32 bg-law-light relative overflow-hidden"
    >
      {/* --- BACKGROUND: Artist Grid Pattern (FAINT) --- */}
      <div
        // Changed opacity from 0.4 to 0.15 for a "barely there" look
        className="absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C5A059 1px, transparent 1px),
            linear-gradient(to bottom, #C5A059 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          // Mask keeps the top visible but fades it out completely towards the bottom
          maskImage: "linear-gradient(to bottom, black 20%, transparent 90%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- HEADER --- */}
        <div className="mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-law-gold font-bold tracking-[0.2em] text-[10px] uppercase mb-4 block"
          >
            The Administration's Mandate
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-law-navy leading-tight max-w-2xl"
          >
            Bridging the gap between <br className="hidden md:block" />
            <span className="italic text-gray-400">theory</span> and{" "}
            <span className="underline decoration-law-gold/50 decoration-2 underline-offset-4">
              practice.
            </span>
          </motion.h2>
        </div>

        {/* --- HYBRID LAYOUT WRAPPER --- */}
        {/* Desktop: Grid with 3 columns. Mobile: Flex column. */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:grid-rows-[auto_auto] lg:gap-6">
          {/* 1. PRESIDENT CARD (Always visible, Top Left on Desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 lg:row-span-1 relative bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden group"
          >
            {/* Paper Texture */}
            <div
              className="absolute inset-0 opacity-50 pointer-events-none mix-blend-multiply"
              style={{
                backgroundImage:
                  'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center h-full justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-full bg-law-navy p-1 shrink-0">
                    <div className="relative h-full w-full rounded-full bg-law-gold overflow-hidden">
                      <Image
                        src="/president.webp"
                        alt="President"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-law-gold uppercase tracking-wider">
                      From the President
                    </p>
                    <h4 className="font-serif text-base text-law-navy">
                      U. S. A. Igwe
                    </h4>
                  </div>
                </div>
                <p className="font-serif text-xl md:text-2xl leading-relaxed text-law-navy mb-4">
                  "We are building a faculty where every student has everything
                  they need to succeed."
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-law-navy hover:text-law-gold transition-colors"
                >
                  Manifesto <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* 2. PILLARS WRAPPER 
              Mobile: Horizontal Scroll Container (flex overflow-x-auto)
              Desktop: 'contents' (Disappears, letting children snap to the parent Grid)
          */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 -mr-6 pr-6 scrollbar-hide lg:contents lg:pb-0 lg:pr-0 lg:mr-0">
            {pillars.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className={`
                  /* MOBILE STYLES */
                  relative flex-shrink-0 w-[85vw] sm:w-[350px] snap-center rounded-2xl p-8 flex flex-col justify-between min-h-[280px]
                  
                  /* DESKTOP STYLES */
                  lg:w-auto lg:min-h-0 lg:flex-shrink
                  
                  /* SHARED STYLES */
                  border ${item.border} ${item.bg}
                  group overflow-hidden hover:shadow-2xl transition-all duration-500
                  
                  /* BENTO PLACEMENT */
                  ${item.desktopClass}
                `}
              >
                {/* Paper Texture */}
                <div
                  className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
                  style={{
                    backgroundImage:
                      'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
                  }}
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <GoldIcon icon={item.icon} />
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest opacity-60 ${item.text}`}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  <h3
                    className={`font-serif text-2xl font-bold mb-2 ${item.text}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs uppercase tracking-wider opacity-70 mb-4 ${item.text}`}
                  >
                    {item.subtitle}
                  </p>
                  <p
                    className={`text-sm leading-relaxed opacity-80 ${item.text}`}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Hover Action */}
                <div className="relative z-10 mt-6 pt-6 border-t border-current border-opacity-10 flex items-center justify-between">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${item.text}`}
                  >
                    Access
                  </span>
                  <div
                    className={`p-2 rounded-full bg-white/10 ${item.text} group-hover:bg-white/20 transition-colors`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                <Link
                  href={item.href}
                  className="absolute inset-0 z-20"
                  aria-label={`Go to ${item.title}`}
                />
              </motion.div>
            ))}

            {/* Spacer for Mobile Scroll */}
            <div className="w-2 flex-shrink-0 lg:hidden" />
          </div>
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="flex items-center gap-2 lg:hidden -mt-4 mb-8">
          <div className="h-1 w-12 rounded-full bg-law-gold" />
          <div className="h-1 w-2 rounded-full bg-gray-200" />
          <div className="h-1 w-2 rounded-full bg-gray-200" />
          <span className="text-[10px] text-gray-400 uppercase tracking-widest ml-2">
            Swipe
          </span>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
