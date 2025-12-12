import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import SingleArticleView from "@/components/news/single-article-view";

// 1. Defined return type for safety
type PostData = {
  post: any;
  relatedPosts: any[];
};

async function getData(slug: string): Promise<PostData | null> {
  // Query 1: Get the Main Post
  // Note: I changed 'category->{title}' back to 'category' assuming it is a simple string field
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    publishedAt,
    author, 
    role,
    category,
    body,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 + 1)
  }`;

  const post = await client.fetch(query, { slug }, { next: { revalidate: 60 } });

  if (!post) return null;

  // Query 2: Get Related Posts
  // We initialize as empty array first
  let relatedPosts = [];

  // SAFETY CHECK: Only try to fetch related posts if the current post HAS a category
  if (post.category) {
    const relatedQuery = `*[_type == "post" && slug.current != $slug && category == $category] | order(publishedAt desc)[0..2] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      category,
      "excerpt": array::join(string::split((pt::text(body)), "")[0..100], "") + "..."
    }`;

    // We fetch using the string value of the category
    relatedPosts = await client.fetch(
      relatedQuery,
      { slug, category: post.category },
      { next: { revalidate: 60 } }
    );
  }

  return { post, relatedPosts };
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function SingleNewsPage({ params }: Props) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data) {
    return notFound();
  }

  return <SingleArticleView post={data.post} relatedPosts={data.relatedPosts} />;
}