"use client";
import React, { useState } from "react";
import { FiCode, FiLayers, FiTool, FiServer, FiDatabase, FiCloud, FiZap } from "react-icons/fi";

type Skill = {
  name: string;
  level: number; // 0-100
  category: string;
  icon?: string;
};

type SkillCategory = {
  name: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Frontend",
    icon: <FiCode className="w-5 h-5" />,
    color: "emerald",
    skills: [
      { name: "React", level: 95, category: "Frontend" },
      { name: "TypeScript", level: 90, category: "Frontend" },
      { name: "Next.js", level: 88, category: "Frontend" },
      { name: "Tailwind CSS", level: 92, category: "Frontend" },
      { name: "JavaScript", level: 93, category: "Frontend" },
      { name: "HTML/CSS", level: 95, category: "Frontend" },
    ]
  },
  {
    name: "Backend",
    icon: <FiServer className="w-5 h-5" />,
    color: "blue",
    skills: [
      { name: "Node.js", level: 85, category: "Backend" },
      { name: "Python", level: 88, category: "Backend" },
      { name: "Express", level: 82, category: "Backend" },
      { name: "REST APIs", level: 90, category: "Backend" },
      { name: "GraphQL", level: 75, category: "Backend" },
    ]
  },
  {
    name: "Database",
    icon: <FiDatabase className="w-5 h-5" />,
    color: "purple",
    skills: [
      { name: "PostgreSQL", level: 85, category: "Database" },
      { name: "MongoDB", level: 80, category: "Database" },
      { name: "Redis", level: 70, category: "Database" },
      { name: "Prisma", level: 78, category: "Database" },
    ]
  },
  {
    name: "DevOps & Cloud",
    icon: <FiCloud className="w-5 h-5" />,
    color: "teal",
    skills: [
      { name: "AWS", level: 75, category: "DevOps" },
      { name: "Docker", level: 82, category: "DevOps" },
      { name: "CI/CD", level: 80, category: "DevOps" },
      { name: "Vercel", level: 90, category: "DevOps" },
      { name: "Git", level: 93, category: "DevOps" },
    ]
  },
  {
    name: "Tools & Others",
    icon: <FiTool className="w-5 h-5" />,
    color: "orange",
    skills: [
      { name: "Figma", level: 85, category: "Tools" },
      { name: "VS Code", level: 95, category: "Tools" },
      { name: "Testing (Jest)", level: 78, category: "Tools" },
      { name: "Agile/Scrum", level: 82, category: "Tools" },
    ]
  }
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const displayedCategories = selectedCategory 
    ? SKILL_CATEGORIES.filter(cat => cat.name === selectedCategory)
    : SKILL_CATEGORIES;

  const getColorClasses = (color: string, variant: 'bg' | 'border' | 'text' | 'from' | 'to') => {
    const colors: Record<string, Record<string, string>> = {
      emerald: {
        bg: 'bg-emerald-500',
        border: 'border-emerald-500',
        text: 'text-emerald-600 dark:text-emerald-400',
        from: 'from-emerald-500',
        to: 'to-emerald-600'
      },
      blue: {
        bg: 'bg-blue-500',
        border: 'border-blue-500',
        text: 'text-blue-600 dark:text-blue-400',
        from: 'from-blue-500',
        to: 'to-blue-600'
      },
      purple: {
        bg: 'bg-purple-500',
        border: 'border-purple-500',
        text: 'text-purple-600 dark:text-purple-400',
        from: 'from-purple-500',
        to: 'to-purple-600'
      },
      teal: {
        bg: 'bg-teal-500',
        border: 'border-teal-500',
        text: 'text-teal-600 dark:text-teal-400',
        from: 'from-teal-500',
        to: 'to-teal-600'
      },
      orange: {
        bg: 'bg-orange-500',
        border: 'border-orange-500',
        text: 'text-orange-600 dark:text-orange-400',
        from: 'from-orange-500',
        to: 'to-orange-600'
      }
    };
    return colors[color]?.[variant] || '';
  };

  return (
    <section
      id="skills"
      className="min-h-screen py-20 bg-gradient-to-br from-orange-50/30 via-white to-emerald-50/40 dark:from-orange-950/10 dark:via-gray-900 dark:to-emerald-950/20 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
            <FiZap className="w-4 h-4" />
            <span>Technical Expertise</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-900 dark:from-slate-100 dark:via-emerald-400 dark:to-slate-100 mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </header>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`group px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-700'
            }`}
          >
            <FiLayers className="inline w-4 h-4 mr-2" />
            All Skills
          </button>
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name === selectedCategory ? null : category.name)}
              className={`group px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category.name
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200 dark:border-gray-700'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayedCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-100 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:shadow-2xl"
              style={{
                animationName: 'fadeInUp',
                animationDuration: '0.6s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
                animationDelay: `${categoryIndex * 100}ms`,
                opacity: 0
              }}
            >
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${getColorClasses(category.color, 'from')} ${getColorClasses(category.color, 'to')} p-6 text-white`}>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="text-sm text-white/80">{category.skills.length} technologies</p>
                  </div>
                </div>
              </div>

              {/* Skills List */}
              <div className="p-6 space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="group"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Skill Name and Level */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-semibold transition-colors ${
                        hoveredSkill === skill.name 
                          ? getColorClasses(category.color, 'text')
                          : 'text-slate-900 dark:text-slate-100'
                      }`}>
                        {skill.name}
                      </span>
                      <span className={`text-sm font-bold transition-all duration-300 ${
                        hoveredSkill === skill.name
                          ? `${getColorClasses(category.color, 'text')} scale-110`
                          : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-3 bg-slate-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      {/* Background gradient */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r ${getColorClasses(category.color, 'from')} ${getColorClasses(category.color, 'to')} opacity-20`}
                      ></div>
                      
                      {/* Animated progress fill */}
                      <div
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getColorClasses(category.color, 'from')} ${getColorClasses(category.color, 'to')} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                        style={{
                          width: `${skill.level}%`,
                          transitionDelay: `${(categoryIndex * 100) + (skillIndex * 50)}ms`
                        }}
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
                      </div>

                      {/* Hover glow effect */}
                      {hoveredSkill === skill.name && (
                        <div
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getColorClasses(category.color, 'from')} ${getColorClasses(category.color, 'to')} blur-sm opacity-50`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Category Footer Stats */}
              <div className="px-6 pb-6">
                <div className="pt-4 border-t border-slate-100 dark:border-gray-700 flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Average Proficiency
                  </span>
                  <span className={`font-bold ${getColorClasses(category.color, 'text')}`}>
                    {Math.round(category.skills.reduce((acc, s) => acc + s.level, 0) / category.skills.length)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <FiCode className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0)}
                </div>
                <div className="text-emerald-100 text-sm">Total Skills</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <FiLayers className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-bold">{SKILL_CATEGORIES.length}</div>
                <div className="text-blue-100 text-sm">Categories</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <FiZap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {Math.round(
                    SKILL_CATEGORIES.reduce(
                      (acc, cat) => acc + cat.skills.reduce((sum, s) => sum + s.level, 0) / cat.skills.length,
                      0
                    ) / SKILL_CATEGORIES.length
                  )}%
                </div>
                <div className="text-orange-100 text-sm">Avg Proficiency</div>
              </div>
            </div>
          </div>
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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}