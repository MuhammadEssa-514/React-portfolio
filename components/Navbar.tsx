'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeSettings from './ThemeSettings';

const navLinks = [
    { name: 'Home', href: '/#home', id: 'home' },
    { name: 'About', href: '/#about', id: 'about' },
    { name: 'Skills', href: '/#skills', id: 'skills' },
    { name: 'Experience', href: '/#journey', id: 'journey' },
    { name: 'Education', href: '/#journey', id: 'journey' }, // Both point to same section
    { name: 'Contact', href: '/#contact', id: 'contact' },
    { name: 'Projects', href: '/projects', id: 'projects' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === '/projects') {
            setActiveSection('projects');
            return;
        }

        const handleScroll = () => {
            const sections = navLinks.map(link => link.id).filter((v, i, a) => a.indexOf(v) === i && v !== 'projects');

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if element is primarily in view (e.g. top is near top of viewport)
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(sectionId);
                        break; // Prioritize the first one found from top
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    const isActive = (linkId: string) => {
        if (pathname === '/projects' && linkId === 'projects') return true;
        if (pathname !== '/projects' && activeSection === linkId && linkId !== 'projects') return true;
        return false;
    };

    return (
        <nav className="fixed w-full z-50 glass-nav border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                            Muhammad Essa
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => {
                                        if (link.id !== 'projects') setActiveSection(link.id);
                                    }}
                                    className={`relative group px-1 py-2 text-sm font-medium transition-colors duration-300 ${isActive(link.id) ? 'text-[var(--primary)]' : 'text-gray-700 dark:text-gray-300 hover:text-[var(--primary)]'
                                        }`}
                                >
                                    {link.name}
                                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary)] transform origin-left transition-transform duration-300 ${isActive(link.id) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`} />
                                </Link>
                            ))}

                            <ThemeSettings />
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden items-center gap-2">
                        <ThemeSettings />
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
                        className="md:hidden overflow-hidden bg-white dark:bg-black border-b border-gray-200 dark:border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive(link.id) ? 'text-[var(--primary)] bg-[var(--primary)]/10' : 'text-gray-700 dark:text-gray-300 hover:text-[var(--primary)] hover:bg-[var(--primary)]/5'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
