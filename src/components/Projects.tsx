"use client";
import React, { useMemo, useState, useEffect } from "react";
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Project = {
  id: number;
  title: string;
  description?: string;
  points?: string[];
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Awesome UI Kit",
    description: "A small design system and component library built with Tailwind and accessibility in mind.",
    points: [
      "Accessible primitives and tokens",
      "Ready-made components (Button, Modal, Card)",
      "Themeable with CSS variables and dark mode"
    ],
    tech: ["React", "Tailwind", "TypeScript"],
    github: "https://github.com/yourname/awesome-ui-kit",
    demo: "https://your-demo.com/ui-kit",
    image: "/images/ui-kit.png"
  },
  {
    id: 2,
    title: "Realtime Chat",
    description: "A lightweight realtime chat app using WebSockets and a serverless backend.",
    points: [
      "Low-latency messaging via WebSocket",
      "Optimistic UI for instant feedback",
      "Serverless scaling on Vercel"
    ],
    tech: ["Next.js", "Socket.IO", "Vercel"],
    github: "https://github.com/yourname/realtime-chat",
    image: "/images/realtime-chat.png"
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Analytics dashboards with charts, filters and CSV export for product managers.",
    points: [
      "Interactive charts and filters",
      "CSV export and scheduled reports",
      "Role-based access for teams"
    ],
    tech: ["React", "Recharts", "Node.js"],
    github: "https://github.com/yourname/analytics-dashboard",
    demo: "https://your-demo.com/analytics",
    image: "/images/analytics.png"
  }
];

export default function ProjectsSection() {
  const [query, setQuery] = useState("");
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [showListMobile, setShowListMobile] = useState(false);

  const techList = useMemo(() => {
    const s = new Set<string>();
    PROJECTS.forEach(p => p.tech.forEach(t => s.add(t)));
    return Array.from(s).sort();
  }, []);

  const filtered = PROJECTS.filter(p => {
    const matchesQuery = [p.title, p.description, ...(p.tech || [])].join(" ").toLowerCase().includes(query.toLowerCase());
    const matchesTech = activeTech ? p.tech.includes(activeTech) : true;
    return matchesQuery && matchesTech;
  });

  useEffect(() => {
    if (filtered.length === 0) setIndex(0);
    else setIndex(i => (i >= filtered.length ? filtered.length - 1 : i));
  }, [filtered.length]);

  const current = filtered[index] || null;

  const next = () => setIndex(i => (filtered.length ? (i + 1) % filtered.length : 0));
  const prev = () => setIndex(i => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));

  return (
    <section 
      id ="projects"
      className="min-h-screen w-full bg-gradient-to-b from-emerald-50 to-white dark:from-gray-700 dark:to-gray-900">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">Projects</h2>
          </div>

          <div className="flex gap-3 items-center">
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setIndex(0); }}
              placeholder="Search projects..."
              className="px-4 py-2 rounded-full border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 w-56"
            />

            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => { setActiveTech(null); setIndex(0); }}
                className={`px-3 py-1 rounded-full text-sm ${activeTech === null ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300'}`}>
                All
              </button>
              {techList.map(t => (
                <button
                  key={t}
                  onClick={() => { setActiveTech(prev => prev === t ? null : t); setIndex(0); }}
                  className={`px-3 py-1 rounded-full text-sm ${activeTech === t ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300'}`}>
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowListMobile(v => !v)}
              className="sm:hidden px-3 py-2 rounded-full bg-slate-100 dark:bg-gray-800"
              aria-expanded={showListMobile}
              aria-label="Toggle projects list"
            >
              {showListMobile ? 'Close' : 'List'}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col justify-between min-h-[70vh]">
            <div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">Featured</div>
                <div className="flex items-center gap-3">
                  <button onClick={prev} aria-label="Previous project" className="p-2 rounded-full bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600">
                    <FiChevronLeft />
                  </button>
                  <button onClick={next} aria-label="Next project" className="p-2 rounded-full bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600">
                    <FiChevronRight />
                  </button>
                </div>
              </div>

              {current ? (
                <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  {current.image && (
                    <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-slate-100 dark:bg-gray-700">
                      <img src={current.image} alt={`${current.title} screenshot`} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className={!current.image ? 'lg:col-span-2' : ''}>
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100">{current.title}</h3>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-xl">{current.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {current.tech.map(t => (
                        <span key={t} className="text-xs px-3 py-1 rounded-full bg-emerald-100/60 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">{t}</span>
                      ))}
                    </div>

                    {current.points && (
                      <ul className="mt-6 list-inside list-disc space-y-2 text-sm text-slate-700 dark:text-slate-300">
                        {current.points.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-6 flex items-center gap-3">
                      {current.github && (
                        <a href={current.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700">
                          <FiGithub /> View on GitHub
                        </a>
                      )}

                      {current.demo && (
                        <a href={current.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-2 border">
                          Live demo <FiExternalLink />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8 text-slate-500">No projects match your filters.</div>
              )}
            </div>
          </div>

          <aside className={`${showListMobile ? 'block' : 'hidden'} sm:block lg:col-span-4`}>
            <div className="rounded-2xl bg-white dark:bg-gray-800 p-4 shadow">
              <div className="text-xs text-slate-400">All Projects</div>
              <div className="mt-3 flex flex-col gap-3 max-h-[70vh] overflow-auto pr-2">
                {filtered.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => { setIndex(i); setShowListMobile(false); }}
                    className={`w-full text-left px-3 py-3 rounded-lg transition flex items-center justify-between ${i === index ? 'bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500' : 'hover:bg-slate-50 dark:hover:bg-gray-700'}`}>
                    <div className="flex items-start gap-3">
                      {p.image && (
                        <div className="w-12 h-8 rounded-md overflow-hidden bg-slate-100 dark:bg-gray-700 flex-shrink-0">
                          <img src={p.image} alt={`${p.title} thumb`} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{p.title}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{p.tech.join(' • ')}</div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400">⤴</div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}