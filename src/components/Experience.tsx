"use client";
import React, { useState } from "react";
import { FiBriefcase, FiMapPin, FiCalendar, FiChevronDown, FiChevronUp, FiArrowUpRight } from "react-icons/fi";

// Sample data - replace with your actual data import
type ExperienceItem = {
  id: string | number;
  company: string;
  role: string;
  start: string;
  end?: string;
  description?: string;
  bullets?: string[];
  location?: string;
  type?: string;
  logo?: string;
};

const SAMPLE_DATA: ExperienceItem[] = [
  {
    id: 1,
    company: "Goldman Sachs",
    role: "Machine Learning Engineer",
    start: "Jan 2024",
    end: "Present",
    location: "New York, NY",
    type: "Full-time",
    description: "Leading ML infrastructure development for trading systems",
    bullets: [
      "Developed real-time inference pipeline processing 1M+ requests/day",
      "Optimized model deployment reducing latency by 40%",
      "Built monitoring dashboard for model performance tracking"
    ]
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Software Engineering Intern",
    start: "Jun 2023",
    end: "Aug 2023",
    location: "Seattle, WA",
    type: "Internship",
    description: "Worked on Azure AI services team",
    bullets: [
      "Implemented new features for Azure Cognitive Services API",
      "Improved API response time by 25%",
      "Collaborated with cross-functional teams on product roadmap"
    ]
  },
  {
    id: 3,
    company: "Tech Startup",
    role: "Full Stack Developer",
    start: "Jan 2022",
    end: "Dec 2023",
    location: "Remote",
    type: "Contract",
    description: "Built customer-facing web applications",
    bullets: [
      "Developed responsive web apps using React and Node.js",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Mentored junior developers on best practices"
    ]
  }
];

export default function Experience() {
  const [expanded, setExpanded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | number | null>(null);
  
  // Use your actual data import here: const DATA = experience;
  const DATA = SAMPLE_DATA;

  return (
    <section
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-heading"
      className="min-h-screen py-20 bg-gradient-to-br from-teal-100/50 via-blue-100/60 via-40% to-cyan-100/50 dark:from-teal-950/30 dark:via-blue-950/40 dark:via-40% dark:to-cyan-950/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-teal-300/30 dark:bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-blue-300/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
            <FiBriefcase className="w-4 h-4" />
            <span>Professional Journey</span>
          </div>
          <h2
            id="experience-heading"
            className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-900 dark:from-slate-100 dark:via-emerald-400 dark:to-slate-100 mb-4"
          >
            Experience
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A timeline of roles, responsibilities, and impact across my professional career
          </p>
        </header>

        {/* Experience Cards */}
        <div
          className={`grid gap-6 transition-all duration-700 ease-in-out mb-12
            ${expanded ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"}`}
        >
          {DATA.map((item: ExperienceItem, index: number) => (
            <article
              key={item.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                expanded ? "hover:scale-[1.02]" : "hover:scale-105"
              }`}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setExpandedCard(expandedCard === item.id ? null : item.id)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
                opacity: 0
              }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" 
                   style={{ padding: '2px' }}>
                <div className="absolute inset-[2px] bg-white dark:bg-gray-800 rounded-2xl"></div>
              </div>

              <div className="relative p-6">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {/* Company Logo Placeholder */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-300">
                      {item.logo ? (
                        <img src={item.logo} alt={`${item.company} logo`} className="w-full h-full object-contain rounded-xl" />
                      ) : (
                        <FiBriefcase className="w-6 h-6 text-white" />
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {item.company}
                    </h3>
                    <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                      {item.role}
                    </p>
                  </div>

                  {/* Type Badge */}
                  {item.type && (
                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                      {item.type}
                    </span>
                  )}
                </div>

                {/* Meta Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <FiCalendar className="w-4 h-4 text-emerald-500" />
                    <span>{item.start}</span>
                    {item.end && (
                      <>
                        <span className="text-slate-400">—</span>
                        <span>{item.end}</span>
                      </>
                    )}
                  </div>

                  {item.location && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <FiMapPin className="w-4 h-4 text-emerald-500" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-gray-700 to-transparent mb-4"></div>

                {/* Description - Always visible */}
                {item.description && (
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}

                {/* Expanded Content */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    expanded || expandedCard === item.id ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {item.bullets && item.bullets.length > 0 && (
                    <div className="space-y-3 mt-4">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {item.bullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                            <span className="flex-1">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Hover Arrow Indicator */}
                <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
                  hoveredCard === item.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                }`}>
                  {expandedCard === item.id ? (
                    <FiChevronUp className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <FiArrowUpRight className="w-5 h-5 text-emerald-500" />
                  )}
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </article>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="text-center">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            
            <span className="relative z-10">
              {expanded ? "Show Less" : "View All Details"}
            </span>
            
            {expanded ? (
              <FiChevronUp className="relative z-10 w-5 h-5 group-hover:transform group-hover:-translate-y-1 transition-transform" />
            ) : (
              <FiChevronDown className="relative z-10 w-5 h-5 group-hover:transform group-hover:translate-y-1 transition-transform" />
            )}
          </button>
          
          {!expanded && (
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Click to see detailed achievements and responsibilities
            </p>
          )}
        </div>
      </div>

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
      `}</style>
    </section>
  );
}