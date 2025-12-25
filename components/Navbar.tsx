'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code2, Briefcase, Layout, Mail, GraduationCap, MessageSquare } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ThemeSettings from './ThemeSettings';

const navLinks = [
    { name: 'Home', href: '/#home', id: 'home', icon: Home },
    { name: 'About', href: '/#about', id: 'about', icon: User },
    { name: 'Education', href: '/#journey', id: 'education', icon: GraduationCap },
    { name: 'Experience', href: '/#journey', id: 'experience', icon: Briefcase },
    { name: 'Skills', href: '/#skills', id: 'skills', icon: Code2 },
    { name: 'Contact', href: '/#contact', id: 'contact', icon: Mail },
    { name: 'Projects', href: '/projects', id: 'projects', icon: Layout },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('home');
    const pathname = usePathname();

    const handleAction = (id: string) => {
        if (id === 'chat') {
            window.dispatchEvent(new CustomEvent('toggle-chatbot'));
        } else if (id === 'whatsapp') {
            window.open('https://wa.me/923555915756', '_blank');
        }
    };

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
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(sectionId);
                        break;
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
        <>
            {/* Top Desktop Navbar & Mobile Logo Bar */}
            <nav className="fixed top-0 w-full z-50 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <Link href="/" className="group flex items-center hover:scale-105 transition-all duration-300 h-full">
                                <div
                                    className="h-20 md:h-31 w-15 bg-[var(--primary)] transition-colors duration-300"
                                    style={{
                                        WebkitMaskImage: "url('/logo_transparent.png')",
                                        maskImage: "url('/logo_transparent.png')",
                                        WebkitMaskSize: "contain",
                                        maskSize: "contain",
                                        WebkitMaskRepeat: "no-repeat",
                                        maskRepeat: "no-repeat",
                                        WebkitMaskPosition: "center",
                                        maskPosition: "center"
                                    }}
                                />
                            </Link>
                        </div>

                        {/* Desktop Menu */}
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

                        {/* Mobile Actions & Settings */}
                        <div className="flex md:hidden items-center gap-2">
                            <button
                                onClick={() => handleAction('whatsapp')}
                                className="p-2 rounded-full bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"
                            >
                                <FaWhatsapp className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleAction('chat')}
                                className="p-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-colors"
                            >
                                <MessageSquare className="w-5 h-5" />
                            </button>
                            <ThemeSettings />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-[safe-area-inset-bottom]">
                <div className="bg-white/80 dark:bg-black/95 backdrop-blur-2xl border-t border-gray-200/50 dark:border-white/10 rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.2)] px-4 py-3 pb-8 overflow-x-auto scrollbar-hide flex items-center gap-6 justify-start scroll-smooth snap-x snap-mandatory">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.id);

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => {
                                    if (link.id !== 'projects') setActiveSection(link.id);
                                }}
                                className="flex-shrink-0 snap-start"
                            >
                                <div className="relative flex flex-col items-center gap-1.5 group min-w-[50px]">
                                    <motion.div
                                        whileTap={{ scale: 0.9 }}
                                        className={`p-2.5 rounded-2xl transition-all duration-300 ${active
                                            ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20'
                                            : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover:bg-[var(--primary)]/10'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.div>
                                    <span className={`text-[10px] font-bold transition-colors duration-300 ${active ? 'text-[var(--primary)]' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {link.name}
                                    </span>
                                    {active && (
                                        <motion.div
                                            layoutId="bottomNav"
                                            className="absolute -top-3 w-1.5 h-1.5 bg-[var(--primary)] rounded-full shadow-[0_0_10px_var(--primary)]"
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
