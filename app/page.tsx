
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <Hero />
      {/* <About /> */}
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
