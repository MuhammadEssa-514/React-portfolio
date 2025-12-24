'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />


      {/* My Journey Section */}
      <section id="journey" className="py-20 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              My <span className="text-[var(--primary)]">Journey</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <Education />
            <Experience />
          </div>
        </div>
      </section>

      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
