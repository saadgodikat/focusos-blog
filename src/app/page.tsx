import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="max-w-4xl mx-auto p-6 min-h-screen">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          FocusOS
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Exploring productivity, focus, and AI-powered discovery
        </p>
      </header>

      <div className="space-y-6">
        {posts.map((post) => (
          <article 
            key={post.slug} 
            className="border border-gray-200 dark:border-gray-800 p-6 rounded-xl hover:shadow-lg transition-shadow bg-white dark:bg-gray-900"
          >
            <h2 className="text-2xl font-semibold mb-2">
              <Link 
                href={`/posts/${post.slug}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            <time className="text-sm text-gray-500 dark:text-gray-400 block mb-3">
              {post.date}
            </time>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {post.description}
            </p>
            {post.tags && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>FocusOS — An Agentic SEO Experiment</p>
      </footer>
    </main>
  );
}