'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';

const projects = [
    {
        id: 1,
        category: 'DASHBOARD',
        title: 'Selvia Admin',
        description: 'Modern admin dashboard interface.',
        image: 'https://placehold.co/600x400/1f2937/fb923c?text=Dashboard+Project' // Placeholder with dark bg and orange text
    },
    {
        id: 2,
        category: 'PAGES',
        title: 'E-Commerce Home',
        description: 'Responsive shopping landing page.',
        image: 'https://placehold.co/600x400/1f2937/fb923c?text=Page+Project'
    },
    {
        id: 3,
        category: 'FORMS',
        title: 'Login Component',
        description: 'Secure and animated login form.',
        image: 'https://placehold.co/600x400/1f2937/fb923c?text=Form+Project'
    },
    {
        id: 4,
        category: 'DASHBOARD',
        title: 'Analytics Pro',
        description: 'Data visualization dashboard.',
        image: 'https://placehold.co/600x400/1f2937/fb923c?text=Analytics'
    }
];

const tabs = ['ALL', 'DASHBOARD', 'PAGES', 'FORMS'];

export default function Projects() {
    const [activeTab, setActiveTab] = useState('ALL');

    const filteredProjects = activeTab === 'ALL'
        ? projects
        : projects.filter(p => p.category === activeTab);

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold mb-8 tracking-tight"
                    >
                        My <span className="text-[var(--primary)]">Projects</span>
                    </motion.h1>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${activeTab === tab
                                        ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/25 scale-105'
                                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className="group relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-[var(--primary)]/30 transition-colors duration-300 shadow-xl"
                            >
                                {/* Image */}
                                <div className="aspect-[4/3] relative overflow-hidden bg-gray-800">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                                        <button className="p-3 bg-[var(--primary)] rounded-full text-white hover:scale-110 transition-transform shadow-lg">
                                            <Eye size={20} />
                                        </button>
                                        <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-lg">
                                            <ExternalLink size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="text-[var(--primary)] text-[10px] font-bold tracking-wider uppercase mb-2">{project.category}</div>
                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[var(--primary)] transition-colors">{project.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
