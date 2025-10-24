import { getAllPosts } from "@/lib/posts";

export default function sitemap() {
  const posts = getAllPosts();
  
  const postUrls = posts.map((post) => ({
    url: `https://focusos.com/posts/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://focusos.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...postUrls,
  ];
}