"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";

interface NewsCardProps {
    post: {
        title: string;
        slug: { current: string };
        mainImage: any;
        category: string;
        publishedAt: string;
        excerpt: string;
    };
    index: number;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export default function NewsCard({ post, index }: NewsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
            <Link href={`/news/${post.slug.current}`} className="flex-1 flex flex-col">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                    {post.mainImage?.asset ? (
                        <Image
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-law-light flex items-center justify-center text-law-navy/20">
                            <span className="font-serif italic">No visual</span>
                        </div>
                    )}
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-law-navy text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full shadow-sm">
                            {post.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.publishedAt)}
                    </div>

                    <h3 className="text-xl font-serif font-bold text-law-navy leading-snug mb-3 group-hover:text-law-gold transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center text-law-gold text-sm font-bold uppercase tracking-wide mt-auto">
                        Read Story
                        <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
