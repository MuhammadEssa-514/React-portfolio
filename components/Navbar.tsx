'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
    Home, User, Code2, Briefcase, Layout, Mail,
    GraduationCap, MessageSquare, ChevronDown, Star
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ThemeSettings from './ThemeSettings';

interface NavItem {
    name: string;
    href: string;
    id: string;
    icon: any;
}

interface NavGroup {
    name: string;
    id: string;
    items?: NavItem[];
    href?: string;
    icon?: any;
}

const navGroups: NavGroup[] = [
    { name: 'Home', href: '/#home', id: 'home', icon: Home },
    { name: 'About', href: '/#about', id: 'about', icon: User },
    {
        name: 'Journey',
        id: 'journey',
        items: [
            { name: 'Education', href: '/#education', id: 'education', icon: GraduationCap },
            { name: 'Experience', href: '/#experience', id: 'experience', icon: Briefcase },
        ]
    },
    {
        name: 'Portfolio',
        id: 'portfolio',
        items: [
            { name: 'Projects', href: '/projects', id: 'projects', icon: Layout },
            { name: 'Certificates', href: '/certificates', id: 'certificates', icon: GraduationCap },
        ]
    },
    { name: 'Skills', href: '/#skills', id: 'skills', icon: Code2 },
    { name: 'Testimonials', href: '/#testimonials', id: 'testimonials', icon: Star },
    { name: 'Contact', href: '/#contact', id: 'contact', icon: Mail },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

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
        if (pathname === '/certificates') {
            setActiveSection('certificates');
            return;
        }

        const handleScroll = () => {
            const sections = ['home', 'about', 'education', 'experience', 'skills', 'testimonials', 'contact'];

            let bestSection = activeSection;
            let minDistance = Infinity;
            const focalPoint = window.innerHeight * 0.25;
            const isDesktop = window.innerWidth >= 768;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= focalPoint && rect.bottom >= focalPoint) {
                        let topOffset = rect.top;
                        if (isDesktop && sectionId === 'experience') topOffset += 300;

                        const distance = Math.abs(topOffset - focalPoint);
                        if (distance < minDistance) {
                            minDistance = distance;
                            bestSection = sectionId;
                        }
                    }
                }
            }

            if (bestSection !== activeSection) {
                setActiveSection(bestSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname, activeSection]);

    const isActive = (item: NavGroup | NavItem): boolean => {
        if ('items' in item && item.items) {
            return item.items.some(sub => isActive(sub));
        }
        if (pathname === '/projects' && item.id === 'projects') return true;
        if (pathname === '/certificates' && item.id === 'certificates') return true;
        if (pathname !== '/projects' && pathname !== '/certificates' && activeSection === item.id) return true;
        return false;
    };

    return (
        <>
            <nav className="fixed top-0 w-full z-50 border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-300">
                <motion.div className="absolute top-0 left-0 right-0 h-[3px] bg-primary origin-left z-50" style={{ scaleX }} />
 
                <div className="w-full px-4 sm:px-6 lg:px-10">
                    <div className="flex items-center justify-between h-16 md:h-24">
                        <div className="flex-shrink-0">
                            <Link href="/" className="group flex items-center hover:scale-105 transition-all duration-300 h-full">
                                <div className="h-18 md:h-[124px] w-32 md:w-64 bg-primary" style={{
                                    WebkitMaskImage: "url('/logo_transparent.png')", maskImage: "url('/logo_transparent.png')",
                                    WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat",
                                    maskRepeat: "no-repeat", WebkitMaskPosition: "left", maskPosition: "left"
                                }} />
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:block">
                            <div className="ml-10 flex items-center space-x-1">
                                {navGroups.map((group) => (
                                    <div
                                        key={group.id}
                                        className="relative"
                                        onMouseEnter={() => group.items && setOpenDropdown(group.id)}
                                        onMouseLeave={() => setOpenDropdown(null)}
                                    >
                                        {group.items ? (
                                            <button className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all ${isActive(group) ? 'text-primary' : 'text-gray-600 dark:text-gray-400 hover:text-primary'}`}>
                                                {group.name} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === group.id ? 'rotate-180' : ''}`} />
                                            </button>
                                        ) : (
                                            <Link href={group.href!} className={`px-4 py-2 text-sm font-bold transition-all ${isActive(group) ? 'text-primary' : 'text-gray-600 dark:text-gray-400 hover:text-primary'}`}>
                                                {group.name}
                                            </Link>
                                        )}

                                        <AnimatePresence>
                                            {group.items && openDropdown === group.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute top-full left-0 w-48 mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-2xl shadow-2xl p-2 z-[60]"
                                                >
                                                    {group.items.map((item) => (
                                                        <Link
                                                            key={item.id}
                                                            href={item.href}
                                                            onClick={() => setActiveSection(item.id)}
                                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(item) ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-primary'}`}
                                                        >
                                                            <item.icon className="w-4 h-4" />
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                                <div className="pl-4 border-l border-gray-200 dark:border-white/10 ml-2">
                                    <ThemeSettings />
                                </div>
                            </div>
                        </div>

                        {/* Mobile & Small Desktop Actions */}
                        <div className="flex lg:hidden items-center gap-2">
                             <button onClick={() => handleAction('whatsapp')} className="p-2 rounded-full bg-green-500/10 text-green-500 hover:bg-green-500/20"><FaWhatsapp className="w-5 h-5" /></button>
                             <button onClick={() => handleAction('chat')} className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20"><MessageSquare className="w-5 h-5" /></button>
                             <ThemeSettings />
                         </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation (Flattened for ease of use) */}
             <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pb-[safe-area-inset-bottom]">
                 <div className="bg-white/80 dark:bg-black/95 backdrop-blur-2xl border-t border-gray-200/50 dark:border-white/10 rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.2)] px-4 py-3 pb-8 overflow-x-auto scrollbar-hide flex items-center gap-6 justify-start">
                     {navGroups.flatMap((g): (NavItem | NavGroup)[] => g.items ? g.items : [g]).map((item) => {
                         const Icon = item.icon;
                         const active = isActive(item);
                         return (
                             <Link key={item.id} href={item.href!} onClick={() => setActiveSection(item.id)} className="flex-shrink-0">
                                 <div className="relative flex flex-col items-center gap-1.5 group min-w-[50px]">
                                     <motion.div whileTap={{ scale: 0.9 }} className={`p-2.5 rounded-2xl transition-all ${active ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 dark:bg-white/5 text-gray-500'}`}><Icon className="w-5 h-5" /></motion.div>
                                     <span className={`text-[10px] font-bold ${active ? 'text-primary' : 'text-gray-500'}`}>{item.name}</span>
                                     {active && <motion.div layoutId="bottomNav" className="absolute -top-3 w-1.5 h-1.5 bg-primary rounded-full" />}
                                 </div>
                             </Link>
                         );
                     })}
                 </div>
             </nav>
        </>
    );
}
