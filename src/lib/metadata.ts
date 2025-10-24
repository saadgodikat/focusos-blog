import { Post } from "@/types/post";

export function generateMetadata(post: Post) {
  return {
    title: `${post.title} | FocusOS`,
    description: post.description,
    keywords: post.tags?.join(', '),
    authors: [{ name: 'FocusOS' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export function generateBlogPostingSchema(post: Post, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'FocusOS',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FocusOS',
    },
    keywords: post.tags?.join(', '),
    url: url,
  };
}