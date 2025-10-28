"use client";
import React, { useState } from "react";
import { FiArrowUpRight, FiSearch, FiX, FiShare2, FiBook, FiClock, FiTag, FiExternalLink, FiCopy, FiCheck } from "react-icons/fi";


type Blog = {
  _id : string; 
  title: string;
  intro: string;
  article_link: string;
  hashtags?: string[];
  publishdate?: string;
  readtime: number;
  tag?: string;
};


type Props = { data?: Blog[] };

const BLOGS: Blog[] = [
  { 
    _id :"sample1",
    title: "React Mastery", 
    intro: "Tips to master React effectively.", 
    article_link: "/blog/react-master", 
    hashtags: ["react", "tips"],
    publishdate: "Oct 20, 2024",
    readtime: 5,
    tag: "Development"
  },
]


export default function BlogMosaic({ data }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Blog | null>(null);
  const [shareTarget, setShareTarget] = useState<Blog | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Use provided data or empty array as fallback
  const blogs = data || BLOGS;

  const filtered = blogs.filter(
    (b) => 
      b.title.toLowerCase().includes(query.toLowerCase()) || 
      b.intro.toLowerCase().includes(query.toLowerCase()) || 
      (b.hashtags || []).some(t => t.includes(query.toLowerCase()))
  );

  const handleCopy = (article_link: string) => {
    const fullarticle_link = typeof window !== 'undefined' ? window.location.origin + article_link : article_link;
    navigator.clipboard?.writeText(fullarticle_link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="blogs"
      className="min-h-screen py-20 px-6 relative overflow-hidden bg-gradient-to-br from-cyan-100/50 via-blue-100/60 via-40% to-indigo-50/40 dark:from-cyan-950/30 dark:via-blue-950/40 dark:via-40% dark:to-indigo-950/20"
    >

 
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-300/30 dark:bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
            <FiBook className="w-4 h-4" />
            <span>Insights & Articles</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-900 dark:from-slate-100 dark:via-emerald-400 dark:to-slate-100 mb-4">
            Featured Articles
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            A curated collection of thoughts, tutorials, and insights on web development
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"></div>
            <div className="relative">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, intro, or tag..."
                className="pl-12 pr-4 py-4 w-full rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-slate-100 shadow-lg focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500 transition-all duration-300"
                aria-label="Search blogs"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Clear search"
                >
                  <FiX className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filtered.map((blog, index) => (
            <article
              key={blog._id}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 dark:border-gray-700"
              onClick={() => setSelected(blog)}
              onMouseEnter={() => setHoveredCard(blog._id)}
              onMouseLeave={() => setHoveredCard(null)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setSelected(blog); }}
              aria-label={`Open ${blog.title}`}
              style={{
                animationName: 'fadeInUp',
                animationDuration: '0.6s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
                animationDelay: `${index * 100}ms`,
                opacity: 0
              }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-teal-400/10 to-blue-400/10 transition-opacity duration-500 ${
                hoveredCard === blog._id ? 'opacity-100' : 'opacity-0'
              }`}></div>

              <div className="relative p-6 flex flex-col h-full">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {blog.tag && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                        <FiTag className="w-3 h-3" />
                        {blog.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    <FiClock className="w-3 h-3" />
                    <span>{blog.readtime || 5} min</span>
                  </div>
                </div>

                {/* Title & intro */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {blog.intro}
                  </p>
                </div>

                {/* hashtags */}
                {blog.hashtags && blog.hashtags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blog.hashtags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-slate-300 text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-gray-700 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {blog.publishdate || 'Recent'}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        window.open(blog.article_link, '_blank'); 
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group/btn"
                    >
                      <span>Read</span>
                      <FiArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setShareTarget(blog); 
                      }}
                      className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700 text-slate-600 dark:text-slate-400 transition-colors"
                      aria-label={`Share ${blog.title}`}
                    >
                      <FiShare2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* Decorative gradient blob */}
              <div className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-200/40 to-teal-300/40 dark:from-emerald-500/20 dark:to-teal-500/20 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
            </article>
          ))}
        </div>

        {/* No Results */}
        {filtered.length === 0 && (
          <div className="mt-16 rounded-2xl border-2 border-dashed border-slate-200 dark:border-gray-700 bg-slate-50/50 dark:bg-gray-800/50 p-12 text-center">
            <FiSearch className="w-12 h-12 mx-auto text-slate-300 dark:text-gray-600 mb-4" />
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">No articles found</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your search or browse all articles</p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setSelected(null)}
            aria-hidden
          />

          <div
            className="relative z-10 max-w-3xl w-full rounded-3xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-500 p-8 text-white">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors"
                aria-label="Close"
              >
                <FiX className="w-5 h-5" />
              </button>

              {selected.tag && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-4">
                  <FiTag className="w-3 h-3" />
                  {selected.tag}
                </div>
              )}

              <h2 className="text-3xl font-bold mb-2">{selected.title}</h2>
              <p className="text-emerald-100 text-lg">{selected.intro}</p>

              <div className="mt-6 flex items-center gap-4 text-sm text-emerald-100">
                {selected.publishdate && (
                  <span className="flex items-center gap-1.5">
                    <FiClock className="w-4 h-4" />
                    {selected.publishdate}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <FiBook className="w-4 h-4" />
                  {selected.readtime || 5} min read
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                    About this article
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    This article provides in-depth coverage and practical insights. Click below to read the full content and discover more.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                    Topics covered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(selected.hashtags || []).map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 dark:border-gray-800">
                <button 
                  onClick={() => setShareTarget(selected)} 
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 text-slate-700 dark:text-slate-300 font-medium transition-all duration-300"
                >
                  <FiShare2 className="w-4 h-4" />
                  Share
                </button>
                <a 
                  href={selected.article_link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span>Read Full Article</span>
                  <FiExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShareTarget(null)}
            aria-hidden
          />

          <div
            className="relative z-10 max-w-md w-full rounded-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Share Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FiShare2 className="w-5 h-5" />
                  Share Article
                </h3>
                <button
                  onClick={() => setShareTarget(null)}
                  className="p-1.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors"
                  aria-label="Close share dialog"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
              <p className="text-emerald-100 text-sm line-clamp-1">{shareTarget.title}</p>
            </div>

            {/* Share Content */}
            <div className="p-6">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Copy the link below or share via social platforms
              </p>

              {/* article_link Copy */}
              <div className="flex gap-2 mb-6">
                <input 
                  readOnly 
                  value={typeof window !== 'undefined' ? window.location.origin + shareTarget.article_link : shareTarget.article_link} 
                  className="flex-1 rounded-lg border-2 border-slate-200 dark:border-gray-700 px-4 py-3 text-sm bg-slate-50 dark:bg-gray-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-400"
                  onClick={(e) => e.currentTarget.select()}
                />
                <button
                  onClick={() => handleCopy(shareTarget.article_link)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    copied 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <FiCheck className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Share Options */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Share via
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => { 
                      if (navigator.share) {
                        navigator.share({ 
                          title: shareTarget.title, 
                          url: typeof window !== 'undefined' ? window.location.origin + shareTarget.article_link : shareTarget.article_link 
                        });
                      }
                    }} 
                    className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 text-slate-700 dark:text-slate-300 font-medium transition-all text-sm"
                  >
                    Native Share
                  </button>
                  <button 
                    onClick={() => { 
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTarget.title)}&article_link=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin + shareTarget.article_link : shareTarget.article_link)}`, 
                        '_blank'
                      ); 
                    }} 
                    className="px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 text-slate-700 dark:text-slate-300 font-medium transition-all text-sm"
                  >
                    Twitter / X
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}