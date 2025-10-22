"use client";
import React, { useState } from "react";
import { FiArrowUpRight, FiSearch, FiX, FiShare2 } from "react-icons/fi";

type Blog = { id: number; title: string; summary: string; url: string; tags?: string[] };

const BLOGS: Blog[] = [
  { id: 1, title: "React Mastery", summary: "Tips to master React effectively.", url: "/blog/react-master", tags: ["react", "tips"] },
  { id: 2, title: "Tailwind CSS", summary: "Build beautiful UI components fast.", url: "/blog/tailwind-css", tags: ["css", "design"] },
  { id: 3, title: "Framer Motion", summary: "Animate React apps like a pro.", url: "/blog/framer-motion", tags: ["animation"] },
  { id: 4, title: "Accessibility", summary: "Make accessible UI with small steps.", url: "/blog/accessibility", tags: ["a11y"] },
  { id: 5, title: "Performance", summary: "Keep UIs snappy with performance tips.", url: "/blog/performance", tags: ["perf"] },
  { id: 6, title: "Design Systems", summary: "Scale design with systems and tokens.", url: "/blog/design-systems", tags: ["design"] },
];

export default function BlogMosaic() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Blog | null>(null);
  const [shareTarget, setShareTarget] = useState<Blog | null>(null);

  const filtered = BLOGS.filter(
    (b) => b.title.toLowerCase().includes(query.toLowerCase()) || b.summary.toLowerCase().includes(query.toLowerCase()) || (b.tags || []).some(t => t.includes(query.toLowerCase()))
  );

  return (
    <section 
    id = "blogs"
    className="min-h-screen bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-gray-700 py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">Featured Articles</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 max-w-xl">A curated mosaic of posts — explore, filter, or read inline.</p>
          </div>

          <div className="relative w-full sm:w-72">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, summary or tag..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-slate-200 bg-white dark:bg-gray-800 dark:border-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
              aria-label="Search blogs"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((blog) => (
            <article
              key={blog.id}
              className="relative overflow-hidden rounded-3xl p-6 bg-white dark:bg-gray-800 shadow-lg border border-transparent hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
              onClick={() => setSelected(blog)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setSelected(blog); }}
              aria-label={`Open ${blog.title}`}
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100/60 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                    #{(blog.tags || [])[0] || 'post'}
                  </span>
                  <span className="text-xs text-slate-400">Article • {Math.max(3, blog.title.length % 10)} min read</span>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{blog.title}</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{blog.summary}</p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); window.open(blog.url, '_blank'); }}
                    className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-emerald-600 text-white text-sm font-medium shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  >
                    Read
                    <FiArrowUpRight />
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); setShareTarget(blog); }}
                    className="text-sm text-slate-500 dark:text-slate-400 px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-gray-800 transition"
                    aria-label={`Share ${blog.title}`}
                  >
                    Share
                  </button>
                </div>

                <div className="text-xs text-slate-400">{(blog.tags || []).slice(0,2).map(t=>`#${t}`).join(' ')}</div>
              </div>

              <div className="pointer-events-none absolute right-4 bottom-4 -z-10 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-200/60 to-emerald-400/50 blur-3xl" />
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-lg border border-dashed border-slate-200 dark:border-gray-700 p-8 text-center text-sm text-slate-500">No results — try another search.</div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            aria-hidden
          />

          <div
            className="relative z-10 max-w-3xl w-full rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl mx-4"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{selected.title}</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{selected.summary}</p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="ml-4 rounded-full bg-slate-100 dark:bg-gray-800 p-2 shadow hover:bg-slate-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                aria-label="Close"
              >
                <FiX className="text-slate-700 dark:text-slate-200" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">About this post</h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">This is a preview and quick description. You can link out to the full article or copy an excerpt here.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tags</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(selected.tags || []).map(t=> (
                    <span key={t} className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300">#{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <a href={selected.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md px-4 py-2 bg-emerald-600 text-white">Open Article <FiArrowUpRight /></a>
              <button onClick={() => setShareTarget(selected)} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border"><FiShare2 /> Share</button>
            </div>
          </div>
        </div>
      )}

      {shareTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShareTarget(null)}
            aria-hidden
          />

          <div
            className="relative z-10 max-w-md w-full rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl mx-4"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Share &rdquo{shareTarget.title}&rdquo</h3>
              <button
                onClick={() => setShareTarget(null)}
                className="rounded-full bg-slate-100 dark:bg-gray-800 p-2 shadow hover:bg-slate-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                aria-label="Close share dialog"
              >
                <FiX className="text-slate-700 dark:text-slate-200" />
              </button>
            </div>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Copy the link or use the native share dialog if available.</p>

            <div className="mt-4 flex gap-2">
              <input readOnly value={typeof window !== 'undefined' ? window.location.origin + shareTarget.url : shareTarget.url} className="flex-1 rounded-md border px-3 py-2 text-sm bg-slate-50 dark:bg-gray-800" />
              <button
                onClick={() => {
                  const url = typeof window !== 'undefined' ? window.location.origin + shareTarget.url : shareTarget.url;
                  navigator.clipboard?.writeText(url);
                }}
                className="px-3 py-2 rounded-md bg-emerald-600 text-white"
              >
                Copy
              </button>
            </div>

            <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">Or share via:</div>
            <div className="mt-2 flex gap-2">
              <button onClick={() => { navigator.share?.({ title: shareTarget.title, url: typeof window !== 'undefined' ? window.location.origin + shareTarget.url : shareTarget.url }); }} className="px-3 py-2 rounded-md border">Native Share</button>
              <button onClick={() => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTarget.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin + shareTarget.url : shareTarget.url)}`, '_blank'); }} className="px-3 py-2 rounded-md border">Twitter</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
