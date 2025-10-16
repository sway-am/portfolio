// src/components/Header.tsx
"use client";

import React, { useState } from "react";
import useScrollSpy from "@/lib/useScrollSpy";

const SECTION_IDS = ["About Me", "experience", "blogs", "projects", "timeline", "achievements", "skills"];

export default function Header() {
  const activeId = useScrollSpy(SECTION_IDS);
  const [open, setOpen] = useState(false);

  return (
    // 1. Added a subtle border and background for depth
    <header className="sticky top-0 z-50 border-b border-slate-200/30 bg-white/80 backdrop-blur-md dark:border-slate-500/30 dark:bg-slate-900/80">
      <div className="w-full px-4 py-3 flex items-center justify-between">
        <a 
          href="#About Me" 
          onClick={(e) => { 
            e.preventDefault(); 
            const el = document.getElementById("About Me"); 
            if (el) el.scrollIntoView({ behavior: "smooth" }); 
          }} 
          className="font-bold font-logo text-slate-800 dark:text-slate-200"
        >
          Swayam Mohanty
        </a>

        <nav className="hidden md:flex items-center space-x-2">
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              // 2. Enhanced active link styling with a "pill" shape
              className={`rounded-full px-3 py-1 text-sm transition-colors duration-300 ${
                activeId === id 
                ? "bg-emerald-100 font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400" 
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`block rounded-md px-3 py-2 ${activeId === id ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400" : "text-slate-600 dark:text-slate-300"}`}
            >
              {id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}