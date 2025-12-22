'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
];

const projectLinks = [
    { name: 'Portfolio Website', href: '/projects/portfolio-demo' },
    { name: 'E-Commerce UI', href: '/projects/ecommerce-demo' },
    { name: 'School Management', href: '/projects/school-dashboard-demo' },
    { name: 'Landing Page', href: '/projects/landing-page-demo' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 glass-nav border-b border-white/10 dark:border-white/5 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                            Muhammad Essa
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            {navLinks.slice(0, 4).map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="hover:text-[var(--primary)] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-700 dark:text-gray-300"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div
                                className="relative"
                                onMouseEnter={() => setDropdownOpen(true)}
                                onMouseLeave={() => setDropdownOpen(false)}
                            >
                                <button className="flex items-center hover:text-[var(--primary)] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none text-gray-700 dark:text-gray-300">
                                    Projects <ChevronDown className="ml-1 w-4 h-4" />
                                </button>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-0 w-56 bg-white dark:bg-black border border-gray-100 dark:border-white/10 shadow-lg rounded-md overflow-hidden z-50"
                                        >
                                            <div className="py-1">
                                                {projectLinks.map((project) => (
                                                    <Link
                                                        key={project.name}
                                                        href={project.href}
                                                        className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[var(--primary)] transition-colors text-gray-700 dark:text-gray-300"
                                                    >
                                                        {project.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <ThemeToggle />

                            <Link
                                href="#contact"
                                className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-[var(--primary)]/30"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md hover:text-[var(--primary)] focus:outline-none transition-colors text-gray-700 dark:text-gray-300"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden bg-white dark:bg-black border-b border-gray-100 dark:border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium hover:text-[var(--primary)] hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-300"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="px-3 py-2 text-base font-medium text-gray-500">Projects</div>
                            <div className="pl-6 space-y-1">
                                {projectLinks.map((project) => (
                                    <Link
                                        key={project.name}
                                        href={project.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-3 py-2 rounded-md text-sm font-medium hover:text-[var(--primary)] hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-300"
                                    >
                                        {project.name}
                                    </Link>
                                ))}
                            </div>

                            <Link
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center mt-4 bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                            >
                                Contact Me
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
