import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { Post } from "@/types/post";

export default function Home() {
  const posts: Post[] = getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <h1 className="text-6xl md:text-7xl font-bold gradient-text float">
                FocusOS
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
            </div>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Exploring productivity, focus, and AI-powered discovery through insightful articles and research
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
                <span className="text-sm font-medium text-slate-600">✨ Latest Insights</span>
              </div>
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
                <span className="text-sm font-medium text-slate-600">🚀 Productivity Tips</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post, index: number) => (
            <article 
              key={post.slug} 
              className={`group bg-white rounded-2xl p-8 shadow-lg border border-slate-200/60 card-hover ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <time className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {post.date}
                  </time>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📖</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  <Link href={`/posts/${post.slug}`} className="block">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-slate-600 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              {/* Tags */}
              {post.tags && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-slate-500 px-2 py-1">
                      +{post.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Read More Button */}
              <Link 
                href={`/posts/${post.slug}`}
                className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors group-hover:gap-3 duration-300"
              >
                Read Article
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-200/60 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">📧</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Stay Updated</h3>
            <p className="text-slate-600 mb-6">Get the latest productivity insights and focus techniques delivered to your inbox.</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="mb-6">
              <h4 className="text-2xl font-bold gradient-text mb-2">FocusOS</h4>
              <p className="text-slate-600">An Agentic SEO Experiment</p>
            </div>
            <div className="flex justify-center gap-6 text-sm text-slate-500">
              <span>© 2024 FocusOS</span>
              <span>•</span>
              <span>Built with Next.js</span>
              <span>•</span>
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}