"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Printer,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    ChevronRight
} from "lucide-react";

// --- Types ---
interface SingleArticleViewProps {
    post: any;
    relatedPosts: any[];
}

// --- Date Helper ---
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};

// --- Rich Text Components (Styled for Pro Readability) ---
const ptComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) return null;
            return (
                <div className="my-12">
                    <div className="relative rounded-lg overflow-hidden shadow-md bg-gray-100">
                        <Image
                            src={urlFor(value).url()}
                            alt={value.alt || "Article visualization"}
                            width={1000}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    {value.caption && (
                        <p className="mt-3 text-sm text-gray-500 text-center border-b border-gray-100 pb-2 italic font-medium">
                            {value.caption}
                        </p>
                    )}
                </div>
            );
        },
    },
    block: {
        normal: ({ children }: any) => (
            <p className="mb-6 text-gray-800 text-[1.05rem] leading-[1.8] font-serif antialiased">{children}</p>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-3xl font-serif text-slate-900 mt-14 mb-6 font-bold tracking-tight border-l-4 border-amber-500 pl-4">
                {children}
            </h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-2xl font-serif text-slate-800 mt-10 mb-4 font-semibold">
                {children}
            </h3>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="relative p-8 my-10 bg-slate-50 rounded-r-xl border-l-4 border-slate-900">
                <p className="text-xl font-serif italic text-slate-700 leading-relaxed">
                    "{children}"
                </p>
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc pl-5 mb-8 space-y-3 text-gray-800 font-serif text-[1.05rem] leading-relaxed marker:text-amber-500">
                {children}
            </ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal pl-5 mb-8 space-y-3 text-gray-800 font-serif text-[1.05rem] leading-relaxed marker:font-bold marker:text-slate-900">
                {children}
            </ol>
        ),
    },
};

// --- Sub-Component: Social Icon Button ---
const SocialButton = ({ href, icon: Icon, colorClass }: any) => (
    <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`p-3 rounded-full bg-gray-50 text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-sm border border-gray-100 ${colorClass}`}
    >
        <Icon className="w-5 h-5" />
    </Link>
);

export default function SingleArticleView({ post, relatedPosts }: SingleArticleViewProps) {
    const pathname = usePathname();
    const [fullUrl, setFullUrl] = useState("");

    // Scroll Progress Logic
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        setFullUrl(`${window.location.origin}${pathname}`);
    }, [pathname]);

    if (!post) return null; // Or your 404 component

    return (
        <article className="min-h-screen bg-white selection:bg-amber-100 selection:text-slate-900">
            {/* 1. Reading Progress Bar (Fixed Top) */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-amber-600 origin-left z-50"
                style={{ scaleX }}
            />

            {/* 2. Header / Hero Section */}
            <div className="bg-slate-50 border-b border-gray-200 pt-32 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Breadcrumb / Back */}
                    <Link href="/news" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-amber-600 mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Gazette
                    </Link>

                    {/* Meta Tags */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-sm font-medium text-slate-500 uppercase tracking-wider">
                        <span className="text-amber-600">{post.category}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {formatDate(post.publishedAt)}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.estimatedReadingTime || 3} min read</span>
                    </div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 leading-[1.15] mb-8"
                    >
                        {post.title}
                    </motion.h1>

                    {/* Author Chip */}
                    <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-sm border border-gray-100 gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-serif text-lg font-bold">
                            {post.author ? post.author[0] : "A"}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-slate-900 leading-none">{post.author || "Editorial Team"}</p>
                            <p className="text-xs text-slate-500 mt-1">{post.role || "Contributor"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Main Image (Wide) */}
            {post.mainImage?.asset && (
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                    >
                        <Image
                            src={urlFor(post.mainImage).url()}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </div>
            )}

            {/* 4. Content Layout (Grid) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12">

                    {/* LEFT SIDEBAR (Desktop Only - Sticky Share) */}
                    <div className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-32 flex flex-col items-center gap-4">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest writing-vertical-lr mb-2">Share</span>
                            <SocialButton href={`https://twitter.com/intent/tweet?url=${fullUrl}`} icon={Twitter} colorClass="hover:bg-black" />
                            <SocialButton href={`https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`} icon={Facebook} colorClass="hover:bg-blue-600" />
                            <SocialButton href={`https://www.linkedin.com/shareArticle?mini=true&url=${fullUrl}`} icon={Linkedin} colorClass="hover:bg-blue-700" />
                            <div className="w-px h-12 bg-gray-200 my-2"></div>
                            <button onClick={() => window.print()} className="p-3 text-slate-400 hover:text-slate-900 transition-colors">
                                <Printer className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* MAIN CONTENT CENTER */}
                    <div className="col-span-12 lg:col-span-8">
                        {/* Mobile Share (Visible only on mobile) */}
                        <div className="lg:hidden flex gap-4 mb-8 justify-center">
                            <SocialButton href={`https://twitter.com/intent/tweet?url=${fullUrl}`} icon={Twitter} colorClass="hover:bg-black" />
                            <SocialButton href={`https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`} icon={Facebook} colorClass="hover:bg-blue-600" />
                            <SocialButton href={`https://www.linkedin.com/shareArticle?mini=true&url=${fullUrl}`} icon={Linkedin} colorClass="hover:bg-blue-700" />
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="prose prose-lg prose-slate max-w-none"
                        >
                            <PortableText value={post.body} components={ptComponents} />
                        </motion.div>

                        {/* Article Footer */}
                        <div className="mt-16 pt-8 border-t border-gray-200">
                            <div className="bg-slate-50 rounded-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                                <div className="w-16 h-16 rounded-full bg-amber-600 text-white flex shrink-0 items-center justify-center font-serif text-2xl font-bold shadow-lg">
                                    {post.author ? post.author[0] : "L"}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">About the Author</h4>
                                    <p className="text-slate-600 mt-2">
                                        This article was written by {post.author}, a key contributor to our publication.
                                        Follow for more insights on {post.category}.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT GUTTER (Whitespace for aesthetic breathing room) */}
                    <div className="hidden lg:block lg:col-span-2"></div>
                </div>
            </div>

            {/* 5. Related Articles (Dark Mode Contrast) */}
            {relatedPosts.length > 0 && (
                <section className="bg-slate-900 py-20 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-serif font-bold">More from the Gazette</h2>
                            <Link href="/news" className="text-amber-500 hover:text-amber-400 flex items-center gap-2 font-medium">
                                View all <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((related, i) => (
                                <Link key={related._id} href={`/news/${related.slug.current}`} className="group block">
                                    <article className="h-full flex flex-col">
                                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-5 bg-slate-800">
                                            {related.mainImage?.asset && (
                                                <Image
                                                    src={urlFor(related.mainImage).url()}
                                                    alt={related.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-2">
                                                {formatDate(related.publishedAt)}
                                            </div>
                                            <h3 className="text-xl font-serif font-bold leading-tight group-hover:text-amber-400 transition-colors">
                                                {related.title}
                                            </h3>
                                            <p className="text-slate-400 mt-3 text-sm line-clamp-3">
                                                {related.excerpt}
                                            </p>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </article>
    );
}