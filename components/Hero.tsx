'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ParticleBackground from './ParticleBackground';

export default function Hero() {
    return (
        <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-transparent to-white/5">
            {/* Background Particles */}
            <ParticleBackground />

            <div className="z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-[var(--primary)] font-semibold text-lg md:text-xl tracking-wide uppercase mb-4">
                        Frontend Web Developer
                    </h2>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                >
                    Muhammad <span className="text-[var(--primary)]">Essa</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                    Crafting modern, fast, and interactive web experiences using <span className="font-semibold text-[var(--primary)]">React</span>, <span className="font-semibold text-[var(--primary)]">Next.js</span>, and <span className="font-semibold text-[var(--primary)]">Tailwind CSS</span>.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button className="px-8 py-3 bg-[var(--primary)] text-white rounded-full font-medium hover:bg-[var(--accent)] hover:shadow-lg hover:shadow-[var(--primary)]/40 transition-all duration-300 transform hover:-translate-y-1">
                        View Projects
                    </button>
                    <Link
                        href="#contact"
                        className="px-8 py-3 border-2 border-[var(--primary)] text-[var(--primary)] rounded-full font-medium hover:bg-[var(--primary)] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Contact Me
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-[var(--primary)] rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
