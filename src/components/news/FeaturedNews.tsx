"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FeaturedNewsProps {
    post: {
        title: string;
        slug: { current: string };
        mainImage: any;
        excerpt: string;
        category: string;
        publishedAt: string;
    };
}

export default function FeaturedNews({ post }: FeaturedNewsProps) {
    if (!post) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl mb-16 group"
        >
            <Link href={`/news/${post.slug.current}`} className="block w-full h-full">
                {/* Background Image */}
                {post.mainImage?.asset ? (
                    <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-law-navy" />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-law-navy via-law-navy/40 to-transparent opacity-90" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-end gap-8">
                    <div className="flex-1 max-w-3xl">
                        <span className="inline-block bg-law-gold text-white text-xs font-bold px-4 py-1.5 uppercase tracking-widest rounded-full mb-6">
                            Featured Story
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight mb-6">
                            {post.title}
                        </h2>
                        <p className="text-gray-200 text-lg md:text-xl font-serif italic border-l-4 border-law-gold/80 pl-6 max-w-2xl">
                            {post.excerpt}
                        </p>
                    </div>

                    <div className="hidden md:flex items-center justify-center h-16 w-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-law-gold group-hover:border-law-gold transition-all duration-300">
                        <ArrowRight className="h-8 w-8 group-hover:-rotate-45 transition-transform duration-300" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
