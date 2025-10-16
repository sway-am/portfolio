"use client";
import React, { useState } from "react";
import { experience as DATA, ExperienceItem } from "@/lib/data";

export default function Experience() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-heading"
      className={`min-h-screen py-20 bg-gradient-to-b from-emerald-50 to-white dark:from-gray-700 dark:to-gray-900
        ${!expanded ? "flex items-center" : ""}`}
    >
      <div
        className={`max-w-6xl mx-auto px-6 flex flex-col w-full
          ${!expanded ? "justify-center" : ""}`}
      >
        {/* Section heading */}
        <h2
          id="experience-heading"
          className="text-4xl sm:text-5xl font-bold mb-12 text-slate-900 dark:text-slate-100 text-center"
        >
          Experience
        </h2>

        {/* Grid or vertical list */}
        <div
          className={`grid gap-8 transition-all duration-700 ease-in-out
            ${expanded ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}
        >
          {DATA.map((item: ExperienceItem) => (
            <article
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {item.company}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                {item.role}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {item.start} {item.end ? `— ${item.end}` : ""}
              </div>

              {/* Show details only if expanded */}
              {expanded && (
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-300 transition-all duration-500">
                  {item.description && <p className="mb-2">{item.description}</p>}
                  {item.bullets && (
                    <ul className="list-disc ml-5 space-y-1">
                      {item.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {item.location && (
                    <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                      📍 {item.location}
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Common Read More / Show Less button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        </div>
      </div>
    </section>
  );
}
