// src/app/page.tsx
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import BlogSlider from "@/components/BlogSlider";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achivements"; 
import Skills from "@/components/Skills";

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

async function getAchievements(): Promise<Achievement[]> {
  try {
    const res = await fetch(`${baseUrl}/api/achievements`, {
      next: { revalidate: 60 },
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

export default async function Home() {
  const achievements = await getAchievements();

  return (
    <>
      <Hero />

      <Experience />      {/* id="experience" inside component */}
      <BlogSlider />      {/* id="blogs" inside component */}
      <Projects />        {/* id="projects" */}       
      <Achievements data={achievements} />    {/* pass server-fetched data */}
      <Skills />          {/* optional, id="skills" */}
    </>
  );
}
