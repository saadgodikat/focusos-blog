import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { generateMetadata as genMeta, generateBlogPostingSchema } from "@/lib/metadata";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Post } from "@/types/post";

export async function generateStaticParams() {
  const posts: Post[] = getAllPosts();
  return posts.map((p: Post) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  return genMeta(post);
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  const url = `https://focusos.com/posts/${resolvedParams.slug}`;
  
  const schema = generateBlogPostingSchema(post, url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">F</span>
                </div>
                <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">FocusOS</span>
              </Link>
              <Link 
                href="/" 
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Articles
              </Link>
            </div>
          </div>
        </nav>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Article Header Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200/60 mb-8">
            <header className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <time className="text-sm font-medium text-slate-500 bg-slate-100 px-4 py-2 rounded-full">
                  {post.date}
                </time>
                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                <span className="text-sm text-slate-500">5 min read</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {post.description}
              </p>
              
              {post.tags && (
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
          </div>

          {/* Article Body Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200/60">
            <div className="prose prose-lg prose-slate max-w-none">
              <MDXRemote source={post.content} />
            </div>
          </div>

          {/* Author/CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-slate-200/60">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Enjoyed this article?</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Discover more productivity insights and focus techniques in our other articles.
              </p>
              <Link 
                href="/" 
                className="btn-primary inline-flex items-center gap-2"
              >
                Explore More Articles
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </article>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 mt-20">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="text-center">
              <div className="mb-4">
                <h4 className="text-xl font-bold gradient-text mb-2">FocusOS</h4>
                <p className="text-slate-600 text-sm">An Agentic SEO Experiment</p>
              </div>
              <div className="flex justify-center gap-4 text-xs text-slate-500">
                <span>© 2024 FocusOS</span>
                <span>•</span>
                <span>Built with Next.js</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}