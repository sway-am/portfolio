"use client";

import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const SECTION_IDS = ["about", "experience", "blogs", "projects", "achievements", "skills"];

const SECTION_LABELS: Record<string, string> = {
  about: "About",
  experience: "Experience",
  blogs: "Blog",
  projects: "Projects",
  achievements: "Achievements",
  skills: "Skills"
};

// Custom scroll spy hook
function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -35% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

export default function Header() {
  const activeId = useScrollSpy(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-slate-200/50 dark:border-gray-800/50" 
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-slate-200/30 dark:border-gray-800/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#about" 
            onClick={(e) => handleNavClick(e, "about")} 
            className="group relative text-xl font-bold text-slate-900 dark:text-slate-100 transition-colors"
          >
            <span className="relative z-10">Swayam Mohanty</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {SECTION_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeId === id 
                    ? "text-white" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {/* Active background */}
                {activeId === id && (
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg"></span>
                )}
                
                {/* Hover background */}
                <span className={`absolute inset-0 bg-slate-100 dark:bg-gray-800 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                  activeId === id ? "hidden" : ""
                }`}></span>
                
                {/* Text */}
                <span className="relative z-10">{SECTION_LABELS[id]}</span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors" 
            onClick={() => setOpen(!open)} 
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-2 pb-4">
            {SECTION_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`relative px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeId === id 
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800"
                }`}
              >
                <span className="relative z-10 flex items-center justify-between">
                  {SECTION_LABELS[id]}
                  {activeId === id && (
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                  )}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}