// src/app/page.tsx
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import BlogSlider from "@/components/BlogSlider";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achivements"; // optional
import Skills from "@/components/Skills";             // optional

export default function Home() {
  return (
    <>
      <Hero />

      <Experience />      {/* id="experience" inside component */}
      <BlogSlider />      {/* id="blogs" inside component */}
      <Projects />        {/* id="projects" */}       
      <Achievements />    {/* optional, id="achievements" */}
      <Skills />          {/* optional, id="skills" */}
    </>
  );
}
