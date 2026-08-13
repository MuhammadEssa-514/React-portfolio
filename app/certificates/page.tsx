'use client';

import { useState } from 'react';
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye, Award, CheckCircle, X, Download } from 'lucide-react';
import ParticleBackground from "@/components/ParticleBackground";

import { type Certificate, certificates } from "@/data/certificates";

const categories = ['All', 'Frontend', 'CMS', 'Platform'];

export default function Certificates() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    const filteredCerts = selectedCategory === 'All'
        ? certificates
        : certificates.filter(c => c.category === selectedCategory);

    const handlePreview = (cert: Certificate) => {
        setSelectedCert(cert);
    };

    return (
        <main className="min-h-screen relative">

            {/* Modal for Image Viewing */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
                            >
                                <X size={24} />
                            </button>
                            {selectedCert.type === 'image' ? (
                                <img
                                    src={selectedCert.image}
                                    alt={selectedCert.title}
                                    className="w-full h-auto max-h-[80vh] object-contain"
                                />
                            ) : (
                                <div className="w-full h-[80vh] bg-gray-100 dark:bg-gray-800">
                                    <iframe
                                        src={selectedCert.file || selectedCert.image}
                                        className="w-full h-full border-none"
                                        title={selectedCert.title}
                                    />
                                </div>
                            )}
                            <div className="p-6 flex justify-between items-center bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedCert.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400">{selectedCert.issuer} • {selectedCert.date}</p>
                                </div>
                                <a
                                    href={selectedCert.verifyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-[var(--primary)] text-white rounded-full font-bold hover:bg-[var(--accent)] transition-colors flex items-center gap-2"
                                >
                                    Verify <ExternalLink size={16} />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
                            Professional <span className="text-[var(--primary)]">Certifications</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg mb-8">
                            Verified credentials from top platforms demonstrating expertise in Web Development.
                        </p>
                    </motion.div>

                    {/* Categories */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${selectedCategory === cat
                                    ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30 scale-105'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredCerts.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[var(--primary)]/10 transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 pointer-events-none" />

                                {/* Image Area */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer" onClick={() => handlePreview(cert)}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handlePreview(cert); }}
                                            className="px-4 py-2 bg-white/90 text-gray-900 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white hover:scale-105 transition-all shadow-lg"
                                        >
                                            <Eye size={16} /> Preview
                                        </button>
                                        <a
                                            href={cert.verifyLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="px-4 py-2 bg-[var(--primary)] text-white rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[var(--accent)] hover:scale-105 transition-all shadow-lg"
                                        >
                                            <CheckCircle size={16} /> Verify
                                        </a>
                                    </div>

                                    {/* Type Badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full text-white shadow-lg ${cert.type === 'pdf' ? 'bg-red-500' : 'bg-blue-500'}`}>
                                            {cert.type === 'pdf' ? 'PDF' : 'IMG'}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 relative">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-[var(--primary)] transition-colors">
                                                {cert.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cert.issuer}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">
                                                {cert.date}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                                        <span className="text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded">
                                            {cert.category}
                                        </span>
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Award size={12} /> Certified
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            <Footer />
        </main>
    );
}
