import { client } from "@/sanity/lib/client";
import { MotionDiv } from "@/components/ui/motion-wrapper";
import FeaturedNews from "@/components/news/FeaturedNews";
import NewsCard from "@/components/news/NewsCard";

// 1. Define the TypeScript Shape of a Post
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  category: string;
  publishedAt: string;
  excerpt: string;
}

// 2. The GROQ Query
const query = `*[_type == "post"] | order(publishedAt desc)[0..10] {
  _id,
  title,
  slug,
  mainImage,
  category,
  publishedAt,
  "excerpt": array::join(string::split((pt::text(body)), "")[0..150], "") + "..."
}`;

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function NewsPage() {
  const posts: Post[] = await client.fetch(query);

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-law-light pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- HEADER --- */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-law-gold font-bold tracking-[0.2em] uppercase text-sm mb-3">
            The Official Records
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-law-navy font-extrabold tracking-tight mb-6">
            The Gazette
          </h1>
          <div className="h-1 w-24 bg-law-gold mx-auto" />
        </MotionDiv>

        {/* --- FEATURED SECTION --- */}
        {featuredPost && <FeaturedNews post={featuredPost} />}

        {/* --- LATEST NEWS GRID --- */}
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-law-navy flex items-center gap-3">
            Latest Stories
            <div className="h-px w-12 bg-gray-300" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <NewsCard key={post._id} post={post} index={index} />
          ))}
        </div>

        {regularPosts.length === 0 && !featuredPost && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 font-serif italic text-lg">
              No entries found at this time.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}