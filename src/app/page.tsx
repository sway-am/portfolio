// src/app/page.tsx
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="experience" className="h-screen bg-gray-100 flex items-center justify-center">
        <h2 className="text-3xl">Experience Section</h2>
      </section>

      <section id="blogs" className="h-screen bg-gray-200 flex items-center justify-center">
        <h2 className="text-3xl">Blogs Section</h2>
      </section>

      <section id="projects" className="h-screen bg-gray-300 flex items-center justify-center">
        <h2 className="text-3xl">Projects Section</h2>
      </section>

      <section id="timeline" className="h-screen bg-gray-400 flex items-center justify-center">
        <h2 className="text-3xl">Timeline Section</h2>
      </section>

    </>
  );
}
