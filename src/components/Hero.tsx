// src/components/Hero.tsx
"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 
                 bg-gradient-to-b from-white to-emerald-50 
                 dark:from-gray-900 dark:to-gray-800"
    >
      <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
        Hi, I’m Swayam 👋
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-8">
        I build intelligent systems that blend{" "}
        <span className="font-semibold">AI</span> and{" "}
        <span className="font-semibold">Renewable Energy</span> — transforming ideas into impactful projects.
      </p>

      <a
        href="#projects"
        className="bg-emerald-600 text-white px-6 py-3 rounded-xl 
                   hover:bg-emerald-700 transition-colors"
      >
        View My Work
      </a>
    </section>
  );
}
