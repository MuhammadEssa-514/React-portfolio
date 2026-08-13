'use client';

import { useState } from 'react';
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronLeft, ChevronRight, Layers, Eye } from 'lucide-react';
import { projects, type Project } from '@/data/projects';

const categories = ['ALL', 'DASHBOARD', 'PAGES', 'FORMS', 'APP'];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const filteredProjects = activeCategory === 'ALL'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const openProject = (project: Project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedProject) return;
        setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedProject) return;
        setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    };

    return (
        <main className="min-h-screen relative bg-black selection:bg-[var(--primary)] selection:text-white">

            {/* Project Modal / Gallery */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-gray-900 border border-white/10 w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image Gallery Section */}
                            <div className="md:w-2/3 bg-black relative flex items-center justify-center p-4 group">
                                <div className="relative w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={selectedProject.images[currentImageIndex]}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Navigation Arrows */}
                                {selectedProject.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
                                        >
                                            <ChevronRight size={24} />
                                        </button>

                                        {/* Dots */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {selectedProject.images.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-[var(--primary)] w-4' : 'bg-white/50'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Details Section */}
                            <div className="md:w-1/3 p-8 overflow-y-auto bg-gray-900">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <span className="text-[var(--primary)] text-xs font-bold tracking-widest uppercase mb-2 block">
                                            {selectedProject.category}
                                        </span>
                                        <h2 className="text-3xl font-bold text-white leading-tight">
                                            {selectedProject.title}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="p-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <p className="text-gray-400 leading-relaxed mb-8">
                                    {selectedProject.fullDescription || selectedProject.description}
                                </p>

                                <div className="mb-8">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Layers size={16} /> Tech Stack
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-auto">
                                    <a
                                        href={selectedProject.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-3 bg-[var(--primary)] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[var(--accent)] hover:-translate-y-1 transition-all shadow-lg shadow-[var(--primary)]/20"
                                    >
                                        <ExternalLink size={18} /> Live Demo
                                    </a>
                                    <a
                                        href={selectedProject.repoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-3 bg-white/10 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 hover:-translate-y-1 transition-all"
                                    >
                                        <Github size={18} /> Source
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                            Selected <span className="text-[var(--primary)]">Works</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-8">
                            A curated selection of my finest web development projects.
                            Click on any project to explore the full gallery.
                        </p>
                    </motion.div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/25 scale-105'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className="group relative bg-gray-900 border border dark:border-[var(--accent)]/30 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[var(--primary)]/5 transition-all duration-500 cursor-pointer"
                                onClick={() => openProject(project)}
                            >
                                {/* Thumbnail Image */}
                                <div className="aspect-[4/3] relative overflow-hidden bg-gray-800">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={project.images[0]}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Overlay Badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white border border-white/10 uppercase tracking-wider">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Hover Action */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-[2px]">
                                        <span className="px-6 py-3 bg-[var(--primary)] text-white rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                                            <Eye size={18} /> View Gallery
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--primary)] transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack Preview */}
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.techStack.slice(0, 3).map((tech) => (
                                            <span key={tech} className="text-[10px] font-bold text-gray-300 bg-gray-800 border border-[var(--accent)]/40 px-2 py-1 rounded-md">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.techStack.length > 3 && (
                                            <span className="text-[10px] font-bold text-gray-300 bg-gray-800 border border-gray-700 px-2 py-1 rounded-md">
                                                +{project.techStack.length - 3}
                                            </span>
                                        )}
                                    </div>
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
