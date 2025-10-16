// src/lib/data.ts
export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  start: string;
  end?: string;
  location?: string;
  description?: string;
  bullets?: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Software Engineer Intern",
    company: "Goldman Sachs",
    start: "May 2025",
    end: "July 2025",
    location: "Remote",
    description:
      "Built computer-vision pipelines for detecting panel defects at scale and deployed lightweight inference on edge devices.",
    bullets: [
      "Designed augmentation pipeline improving model robustness by 18%",
      "Built a PyTorch training pipeline with mixed precision and logging",
      "Deployed edge model with TensorRT achieving 18 FPS on device",
    ],
  },
  {
    id: "exp-2",
    role: "Machine Learning Intern",
    company: "OnePV",
    start: "November 2024",
    end: "January 2025",
    location: "Remote",
    description:
      "Contributed to backend tooling and CI automation for distributed PV data ingestion.",
    bullets: [
      "Added TypeScript types and unit tests across ingestion service",
      "Improved data validation to reduce pipeline failures by 30%",
    ],
  },
  {
    id: "exp-3",
    role: "Research Intern",
    company: "Texas Tech University",
    start: "Jul 2023",
    end: "Dec 2023",
    location: "Campus",
    description:
      "Collaborated on a publishable paper about ML model interpretability for solar forecasting.",
    bullets: ["Co-authored dataset paper", "Presented results at workshop"],
  },
];
