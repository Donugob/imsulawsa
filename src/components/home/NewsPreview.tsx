"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Bell, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NewsPreview = () => {
  const updates = [
    {
      id: 1,
      category: "Academic",
      date: "Oct 24",
      title: "Second Semester Exam Timetable Released",
      desc: "The faculty management has released the final draft for the 2023/2024 session exams.",
      isImportant: true,
    },
    {
      id: 2,
      category: "Events",
      date: "Oct 20",
      title: "Law Week 2025: Call for Papers",
      desc: "Submissions are now open for the annual Student Law Journal.",
      isImportant: false,
    },
    {
      id: 3,
      category: "Notice",
      date: "Oct 18",
      title: "Notice on Moot Court Dress Code",
      desc: "All participants are reminded to adhere strictly to the 'Black & White' regulation.",
      isImportant: false,
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-law-gold font-bold tracking-[0.2em] text-[10px] uppercase mb-3 block">
              The Docket
            </span>
            <h2 className="text-4xl font-serif text-law-navy">
              News & Notices
            </h2>
          </motion.div>

          <Link
            href="/news"
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-law-navy transition-colors"
          >
            View Archive{" "}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: FEATURED STORY (Big Visual) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative group cursor-pointer"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
              {/* Placeholder for News Image */}
              <div className="absolute inset-0 bg-law-navy/10 group-hover:bg-law-navy/5 transition-colors" />
              <Image
                src="/news-event.webp"
                alt="Event"
                fill
                className="object-cover"
              />

              <div className="absolute top-4 left-4 bg-law-gold text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                Featured
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Nov 02, 2025
                </span>
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span className="uppercase tracking-wider font-bold text-law-gold">
                  Student Life
                </span>
              </div>
              <h3 className="text-3xl font-serif text-law-navy mb-3 group-hover:text-law-red transition-colors leading-tight">
                The 25th Annual LAWSA Dinner: "A Night of Legal Elegance"
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Join us as we celebrate excellence, honoring the graduating
                class of '24. Tickets are now available via the portal.
              </p>
              <div className="mt-4 flex items-center text-xs font-bold uppercase tracking-wider text-law-navy underline decoration-gray-300 underline-offset-4 group-hover:decoration-law-gold transition-all">
                Read Full Story
              </div>
            </div>
          </motion.div>

          {/* RIGHT: THE NOTICE BOARD (List) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">
                Latest Memos
              </h4>

              {updates.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="group block p-4 rounded-lg hover:bg-gray-50 transition-colors border-l-2 border-transparent hover:border-law-gold cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                        item.isImportant
                          ? "bg-red-50 text-red-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {item.date}
                    </span>
                  </div>
                  <h5 className="font-serif text-lg text-law-navy leading-snug mb-1 group-hover:text-law-gold transition-colors">
                    {item.title}
                  </h5>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Subscription Box */}
            <div className="mt-8 bg-law-navy p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-law-gold/20 rounded-full blur-2xl translate-x-10 -translate-y-10" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-law-gold mb-2">
                  <Bell className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Get Notified
                  </span>
                </div>
                <h4 className="text-white font-serif text-lg mb-4">
                  Never miss an update.
                </h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm text-white placeholder:text-gray-400 w-full focus:outline-none focus:border-law-gold"
                  />
                  <button className="bg-law-gold text-law-dark px-3 py-2 rounded-md font-bold text-sm hover:bg-white transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsPreview;
