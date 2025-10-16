// src/components/Header.tsx
"use client";

import React, { useState } from "react";
import useScrollSpy from "@/lib/useScrollSpy";

const SECTION_IDS = ["hero", "experience", "blogs", "projects", "timeline"];

export default function Header() {
  
  const activeId = useScrollSpy(SECTION_IDS);

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#hero" onClick={(e) => { e.preventDefault(); const el = document.getElementById("hero"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="font-semibold">Swayam</a>

        <nav className="hidden md:flex space-x-6">
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`text-sm ${activeId === id ? "text-emerald-600 font-medium" : "text-slate-700"}`}
              aria-current={activeId === id ? "true" : undefined}
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
              className={`block py-2 ${activeId === id ? "text-emerald-600" : ""}`}
            >
              {id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
