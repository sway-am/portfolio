// src/components/Hero.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="About Me"
      tabIndex={-1}
      aria-labelledby="hero-heading"
      className="min-h-screen flex items-center 
                 bg-gradient-to-b from-white to-emerald-50 
                 dark:from-gray-900 dark:to-gray-700"
    >
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Text content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1
            id="hero-heading"
            className="text-7xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Hi, I’m Swayam 👋
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8">
            I am a software developer specializing in{" "}
            <span className="font-semibold text-emerald-700 dark:text-emerald-300">
              AI
            </span>{" "}
            and{" "}
            <span className="font-semibold text-emerald-700 dark:text-emerald-300">
              Financial Systems
            </span>{" "}
            — with 1 year of experience.
          </p>

          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            
            <div className="flex gap-5">
              <a
                href="https://github.com/sway-am"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors shadow-md"
              >
                <Github className="w-6 h-6 text-gray-800 dark:text-gray-100" />
              </a>

              <a
                href="https://www.linkedin.com/in/swayam-mohanty-88573b248/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors shadow-md"
              >
                <Linkedin className="w-6 h-6 text-gray-800 dark:text-gray-100" />
              </a>

              <a
                href="mailto:mohanty.swayam060404@gmail.com"
                aria-label="Email"
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors shadow-md"
              >
                <Mail className="w-6 h-6 text-gray-800 dark:text-gray-100" />
              </a>
            </div>

            
            <a
              href="https://drive.google.com/file/d/1OQ5zN79dqqFaWD64hHvLGlQ57vgLwZ-6/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl 
                         hover:bg-emerald-700 transition-colors 
                         focus:outline-none focus-visible:ring-2 
                         focus-visible:ring-emerald-300"
            >
              Download Resume
            </a>
          </div>
        </div>

        
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-60 h-60 lg:w-72 lg:h-72 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/swayam.jpg"
              alt="Swayam profile photo"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
