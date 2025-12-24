'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ParticleBackground from './ParticleBackground';
import { Mail, Phone, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex flex-col md:flex-row md:items-center justify-center overflow-visible bg-gray-50 dark:bg-black px-4 sm:px-6 lg:px-8 transition-colors duration-300">

            {/* Particle Background */}
            <ParticleBackground />

            <div className="z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

                {/* Left Column: Text Content */}
                <div className="flex-1 text-center md:text-left mt-17 md:mt-20">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        {/* Intro Badge */}
                        <div className="inline-block px-3 py-1 mb-6 sm:mb-8 border border-[var(--primary)]/30 bg-[var(--primary)]/10 backdrop-blur-sm">
                            <h2 className="text-[var(--primary)] text-xs sm:text-sm md:text-base font-medium tracking-wider uppercase">
                                Hi, I'm Muhammad Essa
                            </h2>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
                            <span className="text-gray-900 dark:text-white transition-colors duration-300">Frontend</span>{" "}
                            <span className="text-[var(--primary)]">Developer</span>
                        </h1>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-md md:max-w-lg mx-auto md:mx-0 leading-relaxed transition-colors duration-300">
                            I specialize in building exceptional digital experiences. Currently focusing on accessible, human-centered products at <span className="text-gray-900 dark:text-white font-medium transition-colors duration-300">North Aims Technology</span>.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8">
                            <Link href="#contact" className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[var(--primary)] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-[var(--accent)] transition-all duration-300 shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 hover:-translate-y-0.5">
                                Contact Me
                            </Link>
                            <a href="/cv.pdf" target="_blank" className="px-6 sm:px-8 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-semibold rounded-full hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300 hover:-translate-y-0.5">
                                View Resume
                            </a>
                        </div>

                        {/* Social Icons */}
                        <div className="flex justify-center md:justify-start gap-3 sm:gap-4">
                            {[{ Icon: Facebook, href: '#' }, { Icon: Twitter, href: '#' }, { Icon: Linkedin, href: '#' }].map(({ Icon, href }, index) => (
                                <Link
                                    key={index}
                                    href={href}
                                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-300"
                                >
                                    <Icon size={20} className="sm:size-8" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Profile Image */}
                <div className="flex-1 flex justify-center md:justify-end relative mt-6 md:mr-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-56 sm:w-64 md:w-80 lg:w-[400px] h-56 sm:h-64 md:h-80 lg:h-[400px] group"
                    >
                        {/* Concentric Rings */}
                        <div className="absolute inset-0 rounded-full border-4 border-[var(--primary)] shadow-2xl shadow-[var(--primary)]/50"></div>
                        <div className="absolute -inset-2 rounded-full border-2 border-[var(--primary)]/70"></div>
                        <div className="absolute -inset-4 rounded-full border border-[var(--primary)]/50"></div>
                        <div className="absolute -inset-6 rounded-full border border-[var(--primary)]/30"></div>

                        {/* Slow rotating outer ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-8 border-3 border-[var(--primary)]/40 rounded-full"
                        />

                        {/* Main Image with hover effect */}
                        <div className="absolute inset-6 rounded-full overflow-hidden bg-gray-100 dark:bg-black flex items-center justify-center border-2 border-gray-200 dark:border-gray-900 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_var(--primary)]">
                            <Image
                                src="/profile.jpg"
                                alt="Muhammad Essa"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
