"use client";
import React, { useEffect, useState, useRef } from "react";
import { FiX, FiChevronLeft, FiChevronRight, FiAward, FiExternalLink } from "react-icons/fi";


export type Achievement = {
  _id?: string|number;               // MongoDB ObjectId
  title: string;               // required
  organisation?: string;       // optional
  intro?: string;              // optional short intro
  tags?: string[];             // optional array of strings
  image?: string;              // optional image URL
  link?: string;               
  details?: string;
  year?: number;               // optional year for sorting/display
};


type Props = { data?: Achievement[] };
const SAMPLE: Achievement[] = [
  {
    _id: "sample-1",
    title: "Sample Hackathon Winner",
    organisation: "Example University",
    intro: "Won 1st place in the annual hackathon.",
    
    details: "Built an accessible note-taking app.",
    tags: ["hackathon", "web"],
    year: 2023,
  },
  {
    _id: "sample-2",
    title: "Open Source Contributor",
    organisation: "OpenLib",
    intro: "Contributed a major feature to OpenLib.",
    details: "Implemented a pluggable authentication module.",
    tags: ["open-source"],
    year: 2023,
  },

  {
    _id: "sample-3",
    title: "Sample Hackathon Winner",
    organisation: "Example University",
    intro: "Won 1st place in the annual hackathon.",
    
    details: "Built an accessible note-taking app.",
    tags: ["hackathon", "web"],
    year: 2022,
  },
  {
    _id: "sample-4",
    title: "Open Source Contributor",
    organisation: "OpenLib",
    intro: "Contributed a major feature to OpenLib.",
    details: "Implemented a pluggable authentication module.",
    tags: ["open-source"],
    year: 2021,
  },

  
];

export default function AchievementsTimeline({ data }: Props) {
  const items = (data && data.length ? data : SAMPLE).slice().sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0));
  const [selected, setSelected] = useState<Achievement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const computeNearestIndex = () => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return 0;
    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let minDiff = Infinity;
    children.forEach((c, i) => {
      const center = c.offsetLeft + c.clientWidth / 2;
      const diff = Math.abs(center - containerCenter);
      if (diff < minDiff) { minDiff = diff; nearest = i; }
    });
    return nearest;
  };

  const snapTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (!card) return;
    const containerCenter = el.clientWidth / 2;
    const cardRect = card.getBoundingClientRect();
    const containerRect = el.getBoundingClientRect();
    const cardCenter = cardRect.left - containerRect.left + cardRect.width / 2;
    const scrollLeft = cardCenter - containerCenter;
    el.scrollTo({ left: scrollLeft, behavior: "smooth" });
  };

  const scrollNext = () => snapTo(Math.min(items.length - 1, activeIndex + 1));
  const scrollPrev = () => snapTo(Math.max(0, activeIndex - 1));

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActiveIndex(computeNearestIndex()));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(() => setActiveIndex(computeNearestIndex()), 50);
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items.length]);

  return (
    <section id="achievements" 
    className="min-h-screen py-20 bg-gradient-to-br from-pink-50/40 via-slate-50 to-orange-50/30 dark:from-pink-950/20 dark:via-gray-900 dark:to-orange-950/10 relative overflow-hidden"
    
    >
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
            <FiAward className="w-4 h-4" />
            <span>Milestones & Recognition</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-900 dark:from-slate-100 dark:via-emerald-400 dark:to-slate-100 mb-4">
            Achievements
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A collection of proud moments, recognitions, and key milestones in my journey
          </p>
        </header>

        {/* Navigation Controls */}
        <div className="mb-10 flex items-center justify-center gap-4">
          <button 
            onClick={scrollPrev}
            disabled={activeIndex === 0}
            aria-label="Previous achievement"
            className="group p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <FiChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
          </button>
          
          <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600 text-white shadow-lg">
            <span className="text-sm font-medium">Year</span>
            <div className="w-px h-6 bg-white/30"></div>
            <span className="text-xl font-bold">{items[activeIndex]?.year ?? "—"}</span>
          </div>
          
          <button 
            onClick={scrollNext}
            disabled={activeIndex === items.length - 1}
            aria-label="Next achievement"
            className="group p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <FiChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
          </button>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          <div
            ref={scrollerRef}
            tabIndex={0}
            className="flex gap-8 overflow-x-auto py-8 pb-12 snap-x snap-mandatory touch-pan-x scrollbar-hide scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            aria-label="Achievements timeline"
          >
            {items.map((achievement, idx) => (
              <div key={achievement._id} className="snap-center w-full sm:w-[500px] flex-shrink-0">
                <div
                  className={`group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl transition-all duration-500 cursor-pointer h-full ${
                    idx === activeIndex 
                      ? 'ring-4 ring-emerald-400 dark:ring-emerald-500 scale-105 shadow-2xl' 
                      : 'hover:scale-102 hover:shadow-2xl'
                  }`}
                  onClick={() => setSelected(achievement)}
                  onMouseEnter={() => setHoveredCard(achievement._id??null)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image Section with Overlay */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-500">
                    {achievement.image ? (
                      <>
                        <img 
                          src={achievement.image} 
                          alt={achievement.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiAward className="w-20 h-20 text-white/30" />
                      </div>
                    )}
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg">
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{achievement.year}</span>
                    </div>

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-emerald-600/90 dark:bg-emerald-500/90 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredCard === achievement._id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <span className="text-white font-semibold text-lg">Click to view details</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Organization */}
                    {achievement.organisation && (
                      <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                        {achievement.organisation}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 line-clamp-2">
                      {achievement.title}
                    </h3>

                    {/* intro */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                      {achievement.intro}
                    </p>

                    {/* Tags */}
                    {achievement.tags && achievement.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {achievement.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelected(achievement); }}
                      className="w-full mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>View Details</span>
                      <FiExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Active Indicator */}
                  {idx === activeIndex && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => snapTo(i)}
              aria-label={`Go to achievement ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex 
                  ? 'w-8 h-3 bg-gradient-to-r from-emerald-500 to-teal-500' 
                  : 'w-3 h-3 bg-slate-300 dark:bg-gray-600 hover:bg-emerald-400 dark:hover:bg-emerald-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md" 
            onClick={() => setSelected(null)} 
          />

          <div 
            className="relative z-10 max-w-4xl w-full rounded-3xl bg-white dark:bg-gray-900 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header with Image */}
            <div className="relative h-80 bg-gradient-to-br from-emerald-400 to-teal-500">
              {selected.image ? (
                <>
                  <img 
                    src={selected.image} 
                    alt={selected.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FiAward className="w-32 h-32 text-white/30" />
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors shadow-lg"
                aria-label="Close dialog"
              >
                <FiX className="w-6 h-6 text-white" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold mb-3">
                  {selected.organisation} • {selected.year}
                </div>
                <h3 className="text-4xl font-bold text-white drop-shadow-lg">
                  {selected.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                {selected.intro}
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                {selected.details}
              </p>

              {/* Tags */}
              {selected.tags && selected.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Learn More</span>
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => setSelected(null)}
                  className="px-6 py-3 rounded-xl border-2 border-slate-300 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-700 dark:text-slate-300 font-semibold transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}