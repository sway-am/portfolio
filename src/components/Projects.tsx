"use client";
import React, { useMemo, useState, useEffect } from "react";
import { FiGithub, FiExternalLink, FiChevronLeft, FiChevronRight, FiSearch, FiCode, FiLayers, FiX } from "react-icons/fi";

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
    // image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"
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
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop"
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce platform with cart, checkout, and payment integration.",
    points: [
      "Stripe payment integration",
      "Product catalog with filtering",
      "Admin dashboard for inventory"
    ],
    tech: ["Next.js", "Stripe", "PostgreSQL"],
    github: "https://github.com/yourname/ecommerce",
    demo: "https://your-demo.com/shop",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
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
      id="projects"
      className="min-h-screen w-full py-20 px-6 relative overflow-hidden bg-gradient-to-br from-purple-50/30 via-white to-pink-50/40 dark:from-purple-950/10 dark:via-gray-900 dark:to-pink-950/20"
    
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="mx-auto w-full max-w-7xl relative z-10">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
            <FiCode className="w-4 h-4" />
            <span>Portfolio Showcase</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-900 dark:from-slate-100 dark:via-emerald-400 dark:to-slate-100 mb-4">
            Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Explore my work—from design systems to full-stack applications
          </p>

          {/* Controls Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-4xl mx-auto">
            {/* Search */}
            <div className="relative w-full sm:w-80 group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              <input
                value={query}
                onChange={e => { setQuery(e.target.value); setIndex(0); }}
                placeholder="Search projects..."
                className="w-full pl-12 pr-10 py-3 rounded-xl border-2 border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-slate-100 shadow-lg focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500 transition-all duration-300"
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

            {/* Tech Filters - Desktop */}
            <div className="hidden sm:flex items-center gap-2 flex-wrap justify-center">
              <button
                onClick={() => { setActiveTech(null); setIndex(0); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTech === null 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105' 
                    : 'bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-700'
                }`}
              >
                All
              </button>
              {techList.map(t => (
                <button
                  key={t}
                  onClick={() => { setActiveTech(prev => prev === t ? null : t); setIndex(0); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTech === t 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105' 
                      : 'bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Mobile List Toggle */}
            <button
              onClick={() => setShowListMobile(v => !v)}
              className="sm:hidden px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium shadow-lg"
              aria-expanded={showListMobile}
              aria-label="Toggle projects list"
            >
              <FiLayers className="inline w-4 h-4 mr-2" />
              {showListMobile ? 'Close List' : 'View All'}
            </button>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Featured Project Display */}
          <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-gray-700">
            {current ? (
              <>
                {/* Project Image */}
                {current.image && (
                  <div className="relative h-80 bg-gradient-to-br from-emerald-400 to-teal-500 overflow-hidden group">
                    <img 
                      src={current.image} 
                      alt={`${current.title} screenshot`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Navigation Arrows on Image */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between">
                      <button 
                        onClick={prev} 
                        aria-label="Previous project" 
                        className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all shadow-lg"
                      >
                        <FiChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      <button 
                        onClick={next} 
                        aria-label="Next project" 
                        className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all shadow-lg"
                      >
                        <FiChevronRight className="w-6 h-6 text-white" />
                      </button>
                    </div>

                    {/* Project Counter */}
                    <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium">
                      {index + 1} / {filtered.length}
                    </div>
                  </div>
                )}

                {/* Project Details */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3">
                        <FiLayers className="w-3 h-3" />
                        Featured Project
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                        {current.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {current.description}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                      <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {current.tech.map(t => (
                        <span 
                          key={t} 
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium border border-emerald-200 dark:border-emerald-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  {current.points && current.points.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {current.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-6 border-t border-slate-100 dark:border-gray-700">
                    {current.github && (
                      <a 
                        href={current.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <FiGithub className="w-5 h-5" />
                        <span>View Code</span>
                      </a>
                    )}

                    {current.demo && (
                      <a 
                        href={current.demo} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <span>Live Demo</span>
                        <FiExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <FiSearch className="w-16 h-16 mx-auto text-slate-300 dark:text-gray-600 mb-4" />
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  No projects found
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => { setQuery(""); setActiveTech(null); }}
                  className="mt-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Projects Sidebar */}
          <aside className={`lg:col-span-4 ${showListMobile ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-slate-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 text-white">
                <h3 className="font-bold flex items-center gap-2">
                  <FiLayers className="w-5 h-5" />
                  All Projects ({filtered.length})
                </h3>
              </div>
              
              <div className="p-4 max-h-[70vh] overflow-auto space-y-2">
                {filtered.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => { setIndex(i); setShowListMobile(false); }}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                      i === index 
                        ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border-2 border-emerald-400 dark:border-emerald-500 shadow-lg scale-105' 
                        : 'hover:bg-slate-50 dark:hover:bg-gray-700 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {p.image && (
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-gray-700 flex-shrink-0 border border-slate-200 dark:border-gray-600">
                          <img 
                            src={p.image} 
                            alt={`${p.title} thumbnail`} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-semibold mb-1 transition-colors ${
                          i === index 
                            ? 'text-emerald-700 dark:text-emerald-300' 
                            : 'text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                        }`}>
                          {p.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap gap-1">
                          {p.tech.slice(0, 2).map((t, idx) => (
                            <span key={idx}>
                              {t}{idx < Math.min(p.tech.length, 2) - 1 ? ' •' : ''}
                            </span>
                          ))}
                          {p.tech.length > 2 && <span className="text-emerald-600 dark:text-emerald-400">+{p.tech.length - 2}</span>}
                        </div>
                      </div>

                      {i === index && (
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
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