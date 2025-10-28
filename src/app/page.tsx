// src/app/page.tsx
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import BlogSlider from "@/components/BlogSlider";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achivements"; 
import Skills from "@/components/Skills";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Swayam Mohanty - Software Developer',
  description: 'Software developer specializing in AI and Financial Systems with 1 year of experience.',
  keywords: ['Software Developer', 'AI', 'Machine Learning', 'Full Stack', 'Swayam Mohanty'],
  openGraph: {
    title: 'Swayam Mohanty - Software Developer',
    description: 'Software developer specializing in AI and Financial Systems',
    type: 'website',
  },
};


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";


// Reuse your Achievement type for typing the fetched data
export type Achievement = {
  _id?: string;
  title: string;
  organisation?: string;
  intro?: string;
  tags?: string[];
  image?: string;
  achievementdate?: string;
  link?: string;
  details?: string;
};

export type Experiences = {
  title: string;             // role
  company: string;
  duration: string;          // start - end
  location: string;
  shortDescription: string;  // description
  fullDescription: string;   // description + bullets
  type?: string;             // new field
  logo?: string;
}

export type Blog = {
  id : string;
  title: string;
  intro: string;
  article_link: string;
  hashtags?: string[];
  publishdate?: string;
  readtime: number;
  tag?: string;
}

export type Projects = {
  title: string;
  intro?: string;
  fullDescription?: string;
  techStack: string[];
  github?: string;
  liveDemo?: string;
  image?: string;
}

export type Skills = {
  title: string;
  skill_type: string;
  proficiency: number;
}

async function getAchievements(): Promise<Achievement[]> {
  try {
    const res = await fetch(`${baseUrl}/api/achievements`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch achievements:", res.statusText);
      return [];
    }

    const data: Achievement[] = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching achievements:", err);
    return [];
  }
}

async function getExperiences(): Promise<Experiences[]> {
  try {
    const res = await fetch(`${baseUrl}/api/experiences`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch Experiences:", res.statusText);
      return [];
    }

    const data: Experiences[] = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching Experiences:", err);
    return [];
  }
}

async function getArticles(): Promise<Blog[]> {
  try {
    const res = await fetch(`${baseUrl}/api/articles`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch Article:", res.statusText);
      return [];
    }

    const data: Blog[] = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching Article:", err);
    return [];
  }
}

async function getProjects(): Promise<Projects[]> {
  try {
    const res = await fetch(`${baseUrl}/api/projects`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch Projects:", res.statusText);
      return [];
    }
    
    const data: Projects[] = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching Projects:", err);
    return [];
  }
}

async function getSkills(): Promise<Skills[]> {
  try {
    const res = await fetch(`${baseUrl}/api/skills`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch Skills:", res.statusText);
      return [];
    }

    const data: Skills[] = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching Skills:", err);
    return [];
  }
}


export default async function Home() {
  // Fetch all data in parallel
  const [achievements, experience, articles, projects, skills] = await Promise.all([
    getAchievements(),
    getExperiences(),
    getArticles(),
    getProjects(),
    getSkills(),
  ]);

  return (
    <main className="md:ml-20 h-screen overflow-y-scroll scroll-smooth">
      <Hero />
      <Experience data={experience} />
      <BlogSlider data={articles} />
      <Projects data={projects} />
      <Achievements data={achievements} />
      <Skills data={skills} />
    </main>
  );
}
