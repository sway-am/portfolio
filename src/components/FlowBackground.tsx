// components/FlowBackground.tsx
"use client";
import React from "react";

export default function FlowBackground({ colors }: { colors: string[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent dark:via-white/5" />

      {colors.map((color, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"
          style={{
            background: color,
            width: `${40 + i * 10}vmax`,
            height: `${40 + i * 10}vmax`,
            top: `${i * 15}%`,
            left: `${i % 2 === 0 ? "-10%" : "60%"}`,
            animationDelay: `${i * 4}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-40px) scale(1.05);
          }
          100% {
            transform: translateY(0px) scale(1);
          }
        }
        .animate-float {
          animation: float 18s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
