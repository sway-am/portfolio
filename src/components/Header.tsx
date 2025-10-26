"use client";

import React, { useState, useEffect } from "react";
import useScrollSpy from "@/lib/useScrollSpy";
import { FiHome, FiBriefcase, FiBook, FiCode, FiAward, FiZap, FiMail, FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";

const SECTION_IDS = ["about", "experience", "blogs", "projects", "achievements", "skills"];

const SECTION_LABELS: Record<string, string> = {
  about: "About",
  experience: "Experience",
  blogs: "Blog",
  projects: "Projects",
  achievements: "Achievements",
  skills: "Skills"
};

const SECTION_ICONS: Record<string, React.ReactNode> = {
  about: <FiHome className="w-5 h-5" />,
  experience: <FiBriefcase className="w-5 h-5" />,
  blogs: <FiBook className="w-5 h-5" />,
  projects: <FiCode className="w-5 h-5" />,
  achievements: <FiAward className="w-5 h-5" />,
  skills: <FiZap className="w-5 h-5" />
};



export default function Header() {
  const activeId = useScrollSpy(SECTION_IDS);
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setExpanded(false);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:flex fixed left-0 top-0 h-screen z-50 transition-all duration-500 ${
          expanded ? "w-64" : "w-20"
        }`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Background with blur */}
        <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-r border-slate-200/50 dark:border-gray-800/50 shadow-2xl"></div>
        
        {/* Gradient accent */}
        <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-teal-500 to-blue-500"></div>

        <div className="relative flex flex-col w-full py-6 px-4">
          {/* Logo */}
          <a 
            href="#about" 
            onClick={(e) => handleNavClick(e, "about")}
            className="group mb-8 flex items-center gap-3"
          >
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            </div>
            
            {expanded && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                  Swayam Mohanty
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Developer
                </span>
              </div>
            )}
          </a>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col gap-2">
            {SECTION_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                  activeId === id 
                    ? "text-white" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {/* Active background */}
                {activeId === id && (
                  <>
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-md opacity-50"></span>
                  </>
                )}
                
                {/* Hover background */}
                {activeId !== id && (
                  <span className="absolute inset-0 bg-slate-100 dark:bg-gray-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                )}
                
                {/* Icon */}
                <span className="relative z-10 flex-shrink-0">
                  {SECTION_ICONS[id]}
                </span>

                {/* Label */}
                {expanded && (
                  <span className="relative z-10 text-sm font-medium whitespace-nowrap">
                    {SECTION_LABELS[id]}
                  </span>
                )}

                {/* Active indicator dot */}
                {activeId === id && !expanded && (
                  <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                )}
              </a>
            ))}
          </nav>

          {/* Contact Section */}
          <div className="mt-auto pt-6 border-t border-slate-200 dark:border-gray-800">
            {expanded ? (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-3">
                  Connect
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://github.com/sway-am"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <FiGithub className="w-5 h-5" />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/swayam-mohanty-88573b248/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <FiLinkedin className="w-5 h-5" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a
                    href="mailto:mohanty.swayam060404@gmail.com"
                    className="group flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <FiMail className="w-5 h-5" />
                    <span className="text-sm">Email</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 items-center">
                <a
                  href="https://github.com/sway-am"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/swayam-mohanty-88573b248/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:mohanty.swayam060404@gmail.com"
                  className="p-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300"
                  aria-label="Email"
                >
                  <FiMail className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-b border-slate-200/50 dark:border-gray-800/50 shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <a 
            href="#about" 
            onClick={(e) => handleNavClick(e, "about")}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Swayam Mohanty
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Developer
              </span>
            </div>
          </a>

          {/* Menu Button */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-3 rounded-xl transition-all duration-300 ${
              mobileOpen 
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white" 
                : "bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`overflow-hidden transition-all duration-500 ${
            mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-6 pb-6 space-y-2">
            {SECTION_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 ease-out ${
                  activeId === id 
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 hover:scale-102"
                }`}
              >
                <span className="transition-transform duration-300 ease-out">
                  {SECTION_ICONS[id]}
                </span>
                <span className="font-medium transition-all duration-300 ease-out">{SECTION_LABELS[id]}</span>
                {activeId === id && (
                  <span className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></span>
                )}
              </a>
            ))}

            
            {/* Mobile Contact */}
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-gray-800">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 mb-3">
                Connect
              </p>
              <div className="flex gap-2">
                <a
                  href="https://github.com/sway-am"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiGithub className="w-5 h-5" />
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/swayam-mohanty-88573b248/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiLinkedin className="w-5 h-5" />
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a
                  href="mailto:mohanty.swayam060404@gmail.com"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiMail className="w-5 h-5" />
                  <span className="text-sm">Email</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Spacer for mobile */}
      <div className="md:hidden h-20"></div>
    </>
  );
}