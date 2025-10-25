"use client";

import React, { useState, useEffect } from "react";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight, FiStar, FiCode, FiZap } from "react-icons/fi";
import FlowBackground from "@/components/FlowBackground";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);

  const roles = ["AI Enthusiast", "Software Developer", "Problem Solver", "Tech Innovator"];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      tabIndex={-1}
      aria-labelledby="hero-heading"
      className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/40 to-teal-50/30 dark:from-gray-950 dark:via-emerald-950/20 dark:to-teal-950/10">
      <FlowBackground colors={["#34d399", "#a7f3d0", "#99f6e4"]} />
    
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text content */}
          <div className={`w-full lg:w-3/5 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Main heading */}
            <h1
              id="hero-heading"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-slate-900 dark:text-white"
            >
              Hi,I am{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 dark:from-emerald-400 dark:via-teal-400 dark:to-emerald-400">
                Swayam
              </span>{" "}
              👋
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              A software developer specializing in{" "}
              <span className="font-bold text-emerald-700 dark:text-emerald-300">
                AI
              </span>{" "}
              and{" "}
              <span className="font-bold text-emerald-700 dark:text-emerald-300">
                Financial Systems
              </span>
              , with 1 year of experience building intelligent solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href="https://drive.google.com/file/d/1OQ5zN79dqqFaWD64hHvLGlQ57vgLwZ-6/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FiDownload className="w-5 h-5" />
                <span>Download Resume</span>
              </a>

              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-slate-300 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-700 dark:text-slate-300 font-semibold transition-all duration-300"
              >
                <span>View Projects</span>
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Connect with me:</span>
              <div className="flex gap-3">
                <a
                  href="https://github.com/sway-am"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-xl bg-slate-100 hover:bg-slate-900 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <FiGithub className="w-5 h-5 text-slate-800 hover:text-white dark:text-gray-100 transition-colors" />
                </a>

                <a
                  href="https://www.linkedin.com/in/swayam-mohanty-88573b248/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 rounded-xl bg-slate-100 hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <FiLinkedin className="w-5 h-5 text-slate-800 hover:text-white dark:text-gray-100 transition-colors" />
                </a>

                <a
                  href="mailto:mohanty.swayam060404@gmail.com"
                  aria-label="Email"
                  className="p-3 rounded-xl bg-slate-100 hover:bg-emerald-600 dark:bg-gray-800 dark:hover:bg-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <FiMail className="w-5 h-5 text-slate-800 hover:text-white dark:text-gray-100 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`w-full lg:w-2/5 flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative group">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Main image container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <img
                  src="/Swayam_Pic.jpg"
                  alt="Swayam profile photo"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-slate-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <FiCode className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">1+ Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}