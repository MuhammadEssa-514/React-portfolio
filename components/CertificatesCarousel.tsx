'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { certificates } from '@/data/certificates';
import { ChevronLeft, ChevronRight, Award, ArrowRight } from 'lucide-react';

export default function CertificatesCarousel() {
    // Configuration
    const CARDS_TO_SHOW = 4;
    const AUTO_SLIDE_INTERVAL = 4000;

    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-slide logic
    useEffect(() => {
        if (isHovered) return;

        const timer = setInterval(() => {
            handleNext();
        }, AUTO_SLIDE_INTERVAL);

        return () => clearInterval(timer);
    }, [activeIndex, isHovered]);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % certificates.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    };

    const handleDotClick = (index: number) => {
        setActiveIndex(index);
    };

    // Calculate visible certificates with wrap-around
    const getVisibleCertificates = () => {
        const visible = [];
        for (let i = 0; i < CARDS_TO_SHOW; i++) {
            const index = (activeIndex + i) % certificates.length;
            visible.push(certificates[index]);
        }
        return visible;
    };

    return (
        <section className="py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Recent <span className="text-[var(--primary)]">Certifications</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Verified professional credentials.
                        </p>
                    </motion.div>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Navigation Buttons (Desktop) */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-900 dark:text-white hover:scale-110 transition-all hidden md:flex"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-900 dark:text-white hover:scale-110 transition-all hidden md:flex"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AnimatePresence mode='popLayout'>
                            {getVisibleCertificates().map((cert, i) => (
                                <motion.div
                                    key={`${cert.id}-${activeIndex + i}`} // Unique key for animation
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full"
                                >
                                    <div className="h-full bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/10 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                        <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                                            <img
                                                src={cert.image}
                                                alt={cert.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <span className="bg-[var(--primary)] text-white text-[10px] font-bold px-2 py-1 rounded">
                                                    {cert.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 mb-1 group-hover:text-[var(--primary)] transition-colors">
                                                {cert.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                                {cert.issuer}
                                            </p>
                                            <Link
                                                href="/certificates"
                                                className="text-xs font-bold flex items-center gap-1 text-[var(--primary)] hover:gap-2 transition-all"
                                            >
                                                View Details <ArrowRight size={12} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-2 mt-8">
                        {certificates.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleDotClick(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex
                                    ? 'w-6 bg-[var(--primary)]'
                                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-[var(--primary)]/50'
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/certificates"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                    >
                        View Full Collection
                    </Link>
                </div>
            </div>
        </section>
    );
}
